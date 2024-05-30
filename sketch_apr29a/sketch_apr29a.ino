#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#define USE_SERIAL Serial

WiFiMulti wifiMulti;

#define SS_PIN 5     // SPI Slave Select Pin
#define RST_PIN 0    // Reset Pin
#define SERVO_PIN 17 // PWM Pin for Servo Motor

MFRC522 rfid(SS_PIN, RST_PIN);
Servo servo;

bool doorLocked = true; // Variable to track door lock state
String lastAuthorizedTag = ""; // Variable to store the last authorized tag

// Assign a unique ID to this scanner
const char* scannerID = "LAB-A";

// Define a struct to hold UID and user name mappings
struct User {
  String uid;
  String name;
};

// Initialize an array of authorized users
User authorizedUsers[] = {
  {"92979DD3", "OJAS"},
  {"9192271D", "VENTURA"},
  {"A93D9D6D", "PILOTIN"},
  {"71038508", "GENITA"},
  {"F9327614", "MasterKey"}
};

void setup() {
 
  SPI.begin();
  rfid.PCD_Init();
  servo.attach(SERVO_PIN);
  lockDoor(); // Ensure the door starts in a locked state
  Serial.println("Scanner ID: " + String(scannerID)); // Print scanner ID at startup

  USE_SERIAL.begin(115200);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for(uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  wifiMulti.addAP("Megabot", "RqqDP8sf");
}

void loop() {
  if (wifiMulti.run() == WL_CONNECTED) {
    HTTPClient http;

    USE_SERIAL.print("[HTTP] begin...\n");
    // configure target server and url
    http.begin("http://example.com/index.html"); //HTTP

    USE_SERIAL.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        USE_SERIAL.println(payload);
      }
    } else {
      USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    USE_SERIAL.println("[WiFi] Not connected!");
  }



  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String tagID = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      tagID.concat(String(rfid.uid.uidByte[i] < 0x10 ? "0" : ""));
      tagID.concat(String(rfid.uid.uidByte[i], HEX));
    }
    tagID.toUpperCase();
    Serial.println("RFID Tag: " + tagID);
    Serial.println("Scanner ID: " + String(scannerID)); // Print scanner ID with tag

    String userName = getUserName(tagID);

    if (isAuthorized(tagID)) {
      if (doorLocked) {
        unlockDoor();
        lastAuthorizedTag = tagID;
        Serial.println("User: " + userName); // Print user name
      } else {
        // Check if the same tag is trying to close the door or if it's the master key
        if (tagID == lastAuthorizedTag || tagID == "F9327614") {
          lockDoor();
          lastAuthorizedTag = ""; // Reset last authorized tag
          Serial.println("User: " + userName); // Print user name
        } else {
          Serial.println("You are not authorized to close the door.");
        }
      }
    } else {
      Serial.println("Access denied.");
    }

    delay(1000); // Delay to avoid reading the same card multiple times
  }
}

bool isAuthorized(String tagID) {
  // Check if the tagID is in the list of authorized users
  for (User user : authorizedUsers) {
    if (tagID == user.uid) {
      return true;
    }
  }
  return false;
}

String getUserName(String tagID) {
  // Retrieve the user name based on the tagID
  for (User user : authorizedUsers) {
    if (tagID == user.uid) {
      return user.name;
    }
  }
  return "Unknown";
}

void unlockDoor() {
  servo.write(90); // Rotate servo to unlock position
  doorLocked = false;
  Serial.println("Door unlocked.");
}

void lockDoor() {
  servo.write(0); // Rotate servo to locked position
  doorLocked = true;
  Serial.println("Door locked.");
}
