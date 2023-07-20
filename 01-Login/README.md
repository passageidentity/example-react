# Passage Example React App

<img alt="npm" src="https://img.shields.io/npm/v/@passageidentity/passage-elements?color=43BD15&label=@passageidentity/passage-elements">
<br/><br/>

This example application uses the Passage Element in a React application to authenticate users using biometrics or magic links. To run this example application, follow the instructions below to install and start the application.

## Configure Your Environment Variables

1. Copy the EXAMPLE.env file to your own .env file.
2. Replace the example variables with your own Passage App ID and API Key. You can get these from the [Passage Console](https://console.passage.id).

## Building the Client

Install dependencies
```bash
npm install
```

Start the app in development mode
```bash
npm run start
```

The application will run on http://localhost:3000, which you can navigate to in your browser.

## Authenticate Requests With Passage

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React!

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

## Getting Authentication Status and User Information

After the user has logged in with Passage, you can retrieve basic user information from Passage using the PassageUser class exported from `@passageidentity/passage-elements/passage-user`. This example wraps this functionality into a reusable vue composable in `useAuthStatus`:

```js
import { PassageUser } from '@passageidentity/passage-elements/passage-user'

export function useAuthStatus(){
...
  new PassageUser().userInfo().then(userInfo => {
...
```

The PassageUser class can be used as a route guard in your application, but it should NOT be make authorization decisions when fetching data from an API server. Route guards provide a better user experience, but less security than using one of Passage's backend libraries. For applications using an API server, you must use one of the Passage [backend SDKs](https://docs.passage.id/backend-libraries/overview) to safely verify user authentication tokens.
