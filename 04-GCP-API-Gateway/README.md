# Passage Example React App Using Google Cloud API Gateway

This example application uses the Passage Element in a React application to authenticate users using biometrics or magic links via Google's API Gateway.

## Configure Your Environment Variables

1. Copy the EXAMPLE.env file to your own .env file.
2. Replace the example variables with your own Passage App ID (from the [Passage Console](https://console.passage.id)) and your GCP API Gateway URL. To configure an example GCP API Gateway, follow the steps below:


### (1) Create A Google Cloud Function
This Google Cloud Function will act as our 'server' that will process authenticated requests brokered from GCP's API Gateway which we will set up in the next step.
Below is an example of a Google Cloud Function you can use:
```javascript
const Passage = require("@passageidentity/passage-node");

/**
 * Responds with a user's information.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 exports.user = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  
  // satisfy CORS preflight request
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }

  // extract JWT from original request forwarded by API Gateway
  const userInfo = req.headers['x-apigateway-api-userinfo'];
  const jwtPayload = JSON.parse(new Buffer(userInfo, 'base64').toString('ascii'));
  const userID = jwtPayload.sub;

  const passage = new Passage({
    appID: jwtPayload.iss,
    apiKey: process.env.PASSAGE_API_KEY,
  });

  const user = await passage.user.get(userID);
  
  return res.status(200).json(user);
};
```

Next, we need to make sure that the Passage Node SDK is accessible from within the Cloud Function:
```json
{
  "name": "user",
  "version": "0.0.1",
  "dependencies": {
    "@passageidentity/passage-node": "^1.8.0"
  }
}
```
Once the Cloud Function has been created, be sure to copy its Trigger URL for use in the API Gateway config YML file in the net step.

### (2) Create A GCP API Gateway
```yml
swagger: '2.0'
info:
  title: user-gateway
  description: Sample API Gateway with a Google Cloud Functions backend
  version: 1.0.0
paths:
  /user:
    get:
      operationId: getUser
      x-google-backend:
        address: TRIGGER_URL_FROM_PREVIOUS_STEP
      security:
        - passage: []
      responses:
        '200':
          description: A successful response
    options:
      operationId: cors
      x-google-backend:
        address: TRIGGER_URL_FROM_PREVIOUS_STEP
      responses:
        '200':
          description: A successful response

securityDefinitions:
  passage:
    authorizationUrl: ""
    flow: "implicit"
    type: "oauth2"
    # The value below should be unique
    x-google-issuer: "YOUR_PASSAGE_APP_ID"
    x-google-jwks_uri: "https://auth.passage.id/v1/apps/YOUR_PASSAGE_APP_ID/.well-known/jwks.json"
    x-google-audiences: "YOUR_SERVER_URL" # i.e. "http://localhost:3000", etc.

```

Now that you've configured a GCP API Gateway to work with a Cloud Function, add the endpoint URL of the API Gateway to your .env file variable REACT_APP_GCP_GATEWAY_URL.


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

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React via via Google's API Gateway!

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

In this example we digest the JSON response of the user data returned from the API Gateway endpoint. This gateway specifies a x-google-jwks_uri (Passage's JWKS endpoint) that are used to authenticate [JSON Web Tokens (JWTs)](https://jwt.io/) sent from the client.

This flow can be described as follows:
1. The JWT from the client is sent to the API Gateway
2. API Gateway fetches or uses cached JWKS provided from Passage's JWKS endpoint to grab the corresponding public key for this JWT by matching the `kid` value in the JWT header to the `kid` value in the corresponding JWK
3. If a corresponding JWK is found, it is converted into the public key that is then used to verify the JWT
4. If the JWT can be verified, the request is authenticated and is then sent to hit the Cloud Function
5. The Cloud Function then uses [Passage's Node SDK](https://www.npmjs.com/package/@passageidentity/passage-node) to fetch and return the user
6. The client consumes the returned user data
