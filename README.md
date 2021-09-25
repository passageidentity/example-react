# Passage Example React App

This example application uses the Passage Element in a React application to authenticate users using biometrics or magic links. The server uses the 
Passage Node.js SDK to verify users on authenticated endpoints. To run this example application, follow the instructions below to install and start the 
frontend and backend server.

## Configure Your Environment Variables

1. For both the frontend and backend folders, copy the EXAMPLE.env file to your own .env file.
2. Replace the example variables with your own Passage App ID and API Key. You can get these from the [Passage Console](https://console.passage.id).

## Building the Server

Navigate to the backend folder and do the following:

Install dependencies
```bash
npm install
```

Start the server in development mode
```bash
npm run start
```

The server will run on http://localhost:7000.


## Building the Client

Navigate to the frontend folder and do the following:

Install dependencies
```bash
npm install
```

Start the client in development mode
```bash
npm run start
```

The client will run on http://localhost:3000, which you can navigate to in your browser.

## Authenticate Requests With Passage

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React and Express.js!
