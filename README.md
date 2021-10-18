# Passage Example React App

This example application uses the Passage Element in a React application to authenticate users using biometrics or magic links. The server uses the 
[Passage Node.js SDK](https://www.npmjs.com/package/@passageidentity/passage-node) to verify users on authenticated endpoints. To run this example application, follow the instructions below to install and start the 
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

# Using Passage with React

## Importing and Using the Passage-Auth Custom Element
The easiest way to add authentication to a web frontend is with a Passage Auth custom element. First you'll need to install the [passage-auth](https://www.npmjs.com/package/@passageidentity/passage-auth) package from npm:
```
npm i --save @passageidentity/passage-auth
```
Then import the package in the module where you intend to use the custom element
```
import '@passageidentity/passage-auth'
```
Importing this script will register the Passage custom element for use in your React components. For more information about custom elements refer to the [online documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Its then just a matter of embedding the passage-auth element into your component that will handle login. This is done in this example in [frontend/src/views/Home.js](https://github.com/passageidentity/example-react/blob/main/frontend/src/views/Home.js):
```html
<div className="form-container">
  <passage-auth
    app-id={process.env.REACT_APP_PASSAGE_APP_ID}
  />
</div>
```

## Getting Authentication Status and User Information
After the user has logged in with Passage, all requests to your backend needs to be authenticated using the JWT provided by Passage. In this example, we set the JWT in an Authorization header to our API server. 

This project uses a simple [Express](https://expressjs.com/) backend and the [Passage Node.js SDK](https://www.npmjs.com/package/@passageidentity/passage-node) to authenticate requests and retrieve user data for your application. You can see how that runs in the [/backend](https://github.com/passageidentity/example-react/tree/main/backend) folder of this repository.

This example wraps communication with the backend API in a custom hook in [src/models/hooks/useAuthStatus.js](https://github.com/passageidentity/example-react/blob/main/frontend/src/models/hooks/useAuthStatus.js) for re-use in any react component.