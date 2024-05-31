#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define SS_PIN 5     // SPI Slave Select Pin
#define RST_PIN 0    // Reset Pin
#define SERVO_PIN 17 // PWM Pin for Servo Motor

MFRC522 rfid(SS_PIN, RST_PIN);
Servo servo;

bool doorLocked = true; // Variable to track door lock state
String lastAuthorizedTag = ""; // Variable to store the last authorized tag
String lastAuthorizedUser = ""; // Variable to store the last authorized user

// Wi-Fi credentials
const char ssid[] = "HUAWEI-2.4G-u5Ve";
const char password[] = "RqqDP8sf";

// Server details
const char serverAddress[] = "192.168.100.46"; // Your server's IP address
const int serverPort = 8000;

// Assign a unique ID to this scanner
const char* scannerID = "LAB-A";

// Master key tag ID
const String masterKey = "F9327614";

void setup() {
  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();
  servo.attach(SERVO_PIN);
  lockDoor(); // Ensure the door starts in a locked state

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  // Wait until connected to Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // Print connected message and IP address
  Serial.println("\nConnected to WiFi network");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Scanner ID: " + String(scannerID)); // Print scanner ID at startup
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String tagID = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      tagID.concat(String(rfid.uid.uidByte[i] < 0x10 ? "0" : ""));
      tagID.concat(String(rfid.uid.uidByte[i], HEX));
    }
    tagID.toUpperCase();
    Serial.println("RFID Tag: " + tagID);
    Serial.println("Scanner ID: " + String(scannerID)); // Print scanner ID with tag

    DynamicJsonDocument doc = fetchDataFromServer();

    if (!doc.isNull()) {
      String userName = getUserName(tagID, doc);

      if (isAuthorized(tagID, doc)) {
        handleAccess(tagID, userName);
      } else {
        Serial.println("Access denied.");
      }
    }

    delay(1000); // Delay to avoid reading the same card multiple times
  }
}

void handleAccess(String tagID, String userName) {
  if (doorLocked) {
    unlockDoor();
    lastAuthorizedTag = tagID;
    lastAuthorizedUser = userName;
    Serial.println("User: " + userName); // Print user name
    // Unlocking the door sets card status to Online
    updateCardStatus(tagID, userName, false); // Pass false for doorLocked
  } else {
    // Check if the same tag is trying to close the door or if it's the master key
    if (tagID == lastAuthorizedTag || tagID == masterKey) {
      lockDoor();
      lastAuthorizedTag = ""; // Reset last authorized tag
      lastAuthorizedUser = ""; // Reset last authorized user
      Serial.println("User: " + userName); // Print user name
      // Locking the door sets card status to Offline
      updateCardStatus(tagID, userName, true); // Pass true for doorLocked
    } else {
      Serial.println("You are not authorized to close the door.");
    }
  }
}

bool isAuthorized(String tagID, DynamicJsonDocument& doc) {
  // Check if the tagID is in the list of authorized users from the fetched data
  for (JsonObject card : doc.as<JsonArray>()) {
    if (card["card_id"] == tagID) {
      return true;
    }
  }
  return false;
}

String getUserName(String tagID, DynamicJsonDocument& doc) {
  // Retrieve the user name based on the tagID from the fetched data
  for (JsonObject card : doc.as<JsonArray>()) {
    if (card["card_id"] == tagID) {
      return card["card_user"].as<String>();
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

DynamicJsonDocument fetchDataFromServer() {
  DynamicJsonDocument doc(2048); // Increased the size of the document buffer

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient client;
    String url = "https://rest-api-jiei.onrender.com/rfid-ispsc/card/getCard";
    Serial.println("Requesting URL: " + url);
    client.begin(url);

    int httpCode = client.GET();
    Serial.print("HTTP GET Request: ");
    Serial.println(httpCode);

    if (httpCode == HTTP_CODE_OK) {
      String payload = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println("Payload: " + payload);

      // Parse the JSON payload
      DeserializationError error = deserializeJson(doc, payload);
      if (error) {
        Serial.println("Failed to parse JSON payload");
        doc.clear();
      }
    } else {
      Serial.println("Error on HTTP request");
      Serial.println("HTTP code: " + String(httpCode));
      Serial.println("Error message: " + client.errorToString(httpCode));
      doc.clear();
    }

    client.end();
  } else {
    Serial.println("Connection Lost");
    doc.clear();
  }

  return doc;
}

void updateCardStatus(String cardID, String cardUser, bool doorLocked) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient client;
    String url = "https://rest-api-jiei.onrender.com/rfid-ispsc/card/updateCardArduino/" + cardID;
    client.begin(url);
    client.addHeader("Content-Type", "application/json");

    // Determine the card status based on the door lock status
    String cardStatus = doorLocked ? "Offline" : "Online";

    DynamicJsonDocument doc(1024);
    doc["card_id"] = cardID;
    doc["card_user"] = cardUser;
    doc["card_status"] = cardStatus; // Set the card status

    String requestBody;
    serializeJson(doc, requestBody);

    int httpCode = client.PUT(requestBody);
    Serial.print("HTTP PUT Request: ");
    Serial.println(httpCode);

    if (httpCode == HTTP_CODE_OK) {
      String response = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error on HTTP request");
      Serial.println("HTTP code: " + String(httpCode));
      Serial.println("Error message: " + client.errorToString(httpCode));
    }

    client.end();
  } else {
    Serial.println("Connection Lost");
  }
}
