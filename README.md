# Passage Example React App

## Installing Dependencies

Navigate to the main folder that contains both the `backend` and `frontend` folders and run the following command to install dependencies for both the `backend` and `frontend`:

```bash
$ cd backend; npm i; cd ../frontend; npm i;
```

## Configure Your Environment Variables

### Backend

You'll need your Passage APP ID and API Key. To get your application's APP ID and API Key, [Visit your Passage console](https://console.passage.id/).

Navigate to the backend folder and add the respective Passage APP ID and API Key to their corresponding values in the `EXAMPLE.env` file. Be sure to rename the file to just `.env` when you are finished.

### Frontend

You'll need to navigate to the frontend folder and set the environment variable equal to your APP ID. Be sure to rename the `EXAMPLE.env` file to just `.env` when you are finished.

## Start the Backend Server

Next we'll need to start the `backend` server. Navigate to the backend folder and run the command `npm run start`.

## Start the Frontend Server

To start the `frontend` server, we'll need to open another shell window, navigate to the backend folder and run: `npm run start`.

## Authenticate Requests With Passage

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React and Express!
