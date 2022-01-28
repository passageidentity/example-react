# Passage Example React App

This example application uses the Passage Element in a React application to authenticate users using biometrics or magic links. To run this example application, follow the instructions below to install and start the 
application.

## Configure Your Environment Variables

1. Copy the EXAMPLE.env file to your own .env file.
2. Replace the example variable with your own Passage App ID. You can get these from the [Passage Console](https://console.passage.id).

## Building the Client

Run the following commands:

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

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React!

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

It's then just a matter of embedding the passage-auth element into your component that will handle login. This is done in this example in [frontend/src/views/Home.js](https://github.com/passageidentity/example-react/blob/main/frontend/src/views/Home.js):
```html
<div className={styles.authContainer}>
  <passage-auth app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-auth>
</div>
```

## Getting Authentication Status and User Information
After the user has logged in with Passage, you can retrieve basic user information from Passage using the PassageUser class exported from `@passageidentity/passage-auth/passage-user`. This example wraps this functionality into a reusable react hook in [useAuthStatus](https://github.com/passageidentity/example-react/blob/main/src/models/hooks/useAuthStatus.js):
```
import { PassageUser } from '@passageidentity/passage-auth/passage-user';
...
useEffect(() => {
    let cancelRequest = false;
    new PassageUser().userInfo().then(userInfo=> {
...
```
Any additional requests to your backend server that require user authorization can use one of the Passage backend [libraries](https://docs.passage.id/backend-libraries/overview) to safely authenticate user tokens.