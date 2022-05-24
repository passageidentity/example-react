# Using Passage with Express.js and the GCP API Gateway

This example application uses the Passage Element in a React application with an Express.js backend. Once a user has authenticated, you are able to click a button to interact with an example GCP API Gateway that verifies thhe JWT using Passage's JWKS endpoint to authenticate a request.
Be sure to read (this guide)[#TODO] first to implement authentication via Google Cloud Functions and the Google Cloud API Gateway.

## Configure Your Environment Variables

1. Rename the EXAMPLE.env file to .env for both the frontend and backend directories
2. Replace the example variables for each .env file with your own Passage App ID, and the corresponding GCP_API_GATEWAY_URL. You can get your Passage App ID from the [Passage Console](https://console.passage.id), and can get your GCP_API_GATEWAY_URL by (following these instructions)[#TODO].

## Install Dependencies & Run Backend/Frontend

Backend dependencies
```bash
cd backend/
npm i
npm run start
cd ..
```

Frontend dependencies
```bash
cd frontend/
npm i
npm run start
cd ..
```

The application will run on http://localhost:3000, which you can navigate to in your browser.

## Authenticate Requests With Passage

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React, Express.js and a GCP API Gateway authorizing JWTs!

<br/><br/>


<br/><br/>

# Using Passage with React

## Importing and Using the Passage-Auth Custom Element
The easiest way to add authentication to a web frontend is with a Passage Auth custom element. First you'll need to install the [passage-elements](https://www.npmjs.com/package/@passageidentity/passage-elements) package from npm:
```
npm i --save @passageidentity/passage-elements
```
Then import the package in the module where you intend to use the custom element
```
import '@passageidentity/passage-elements/passage-auth'
```
Importing this script will register the Passage custom element for use in your React components. For more information about custom elements refer to the [online documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Its then just a matter of embedding the passage-auth element into your component that will handle login. This is done in this example in the home component:
```html
<div className="form-container">
  <passage-auth
    app-id={process.env.REACT_APP_PASSAGE_APP_ID}
  />
</div>
```
