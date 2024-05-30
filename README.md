# Rfid: Radio Frequency Identification System for ISPSC Sta. Maria Campus

> [!WARNING]
> The project is still in beta phase and currently undergoing on development.

## Project Description
Implementing an RFID (Radio Frequency Identification) system in schools can significantly **enhance classroom security and optimize space utilization.** This technology **allows only authorized teachers to access specific rooms**, thereby preventing students from using these areas as hangout spots when they do not have a scheduled class. By embedding RFID tags in teacher ID cards and installing RFID readers at the entrances of classrooms and other sensitive areas, the **school can ensure that only designated staff can unlock and enter these rooms.** This not only helps in **maintaining discipline but also ensures that school facilities are used appropriately, fostering a more organized and secure learning environment.**

## Project Prerequisites
The web interface of the system was made in **_MERN STACK_**. And the **_Arduino_** was coded in **_Arduino IDE_**. 
### Arduino Tools
- ESP32
- Micro Servo SG90
- RFID Scanner RC522
- S50 White card
- RFID Tags
- Jumper Wires

## Project Folders
- Frontend
  > contains all the web designs and different UI components.
- Backend
  > contains all the configurations, controllers, models, routes and etc.
- sketch_apr29a
  > contains all the **arduino project**

### Installation
Run `npm install` to install all the packages/libraries used in the project. Make sure to download all the packages/libraries in all folder directory `frontend` and `backend`

To install/include all the libraries used in **_Arduino_**. Go to `Library Manager` and install the following packages/libraries:
- Arduino Uno WiFi Dev Ed Library
  > by Arduino
- ArduinoHttpClient
  > by Arduino
- ArduinoJson
  > by Benoit Blanchon
- Arduino_Portenta_OTA
  > by Arduino
- MFRC522
  > by GitHubCommunity


### Run
To run the website, change the directory to **_frontend_** first, then run the command `npm run dev`.

To run the server, change the directory to **_backend_** first, then run the command `npm run server`.

To run your scanner, first `select your board and port`, choose the `**_ESP32 Dev Module_**`, the port will be automatically selected. If you dont have a port, [watch this youtube video](https://www.youtube.com/watch?v=LpohiGf8GiU). After selecting the necessary ports and boards. Upload your code, and in the upper right corner select the Serial Monitor to check the output.

### Deployment
The backend of my application is deployed on [Render](https://dashboard.render.com/), providing a REST API for my frontend web page. This [Rest-Api](https://rest-api-jiei.onrender.com/) consists of various endpoints,
each designed to ensure an organized and clean structure. These endpoints have specific functions to handle requests and responses between the client and server efficiently.

### Author
**Mark Jeriel Cabalbag (2024)**







