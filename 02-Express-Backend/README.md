# Passage Example React App with Express.js Backend

This example application uses the Passage Element in a React application with an Express.js backend to authenticate users using biometrics or magic links. To run this example application, follow the instructions below to install and start the application.

## Configure Your Environment Variables

1. Rename the EXAMPLE.env file to .env for both the frontend and backend directories
2. Replace the example variables for each .env file with your own Passage App ID and API Key. You can get these from the [Passage Console](https://console.passage.id).

## Install Dependencies & Run Backend/Frontend

Backend dependencies
```bash
cd backend/
npm i
node server.js
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

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React and an Express.js backend!

<br/><br/>

# Using Passage with Express.js
Import passage from npm:
```javascript
const Passage = require("@passageidentity/passage-node");
```

Instantiate the Passage class:
```javascript
const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});
```

Declare an Express route and use the instantiated Passage class to authenticate users!
```javascript
app.post("/auth", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifier = email ? email : phone;

      res.json({
        authStatus: "success",
        identifier,
      });
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.json({
      authStatus: "failure",
    });
  }
});
```


<br/><br/>

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

After the user has logged in with Passage, you can retrieve basic user information from Passage using the PassageUser class exported from `@passageidentity/passage-auth/passage-user`. This example wraps this functionality into a reusable vue composable in `useAuthStatus`:

```js
import { PassageUser } from '@passageidentity/passage-auth/passage-user'

export function useAuthStatus(){
...
  new PassageUser().userInfo().then(userInfo => {
...
```

The PassageUser class can be used as a route guard in your application, but it should NOT be make authorization decisions when fetching data from an API server. Route guards provide a better user experience, but less security than using one of Passage's backend libraries. For applications using an API server, you must use one of the Passage [backend SDKs](https://docs.passage.id/backend-libraries/overview) to safely verify user authentication tokens.