# Getting Started with React and Passage
This example demonstrates how to integrate Passage into a React front-end application.

## Setting Up Environment Variables

1. Get your Passage App ID from the [Passage Console](https://console.passage.id).
1. Copy placeholder values from `EXAMPLE.env` into your own `.env` file.
1. Update REACT_APP_PASSAGE_APP_ID with your Passage App ID.

## Importing and Using the Passage-Auth Custom Element
The easiest way to add authentication to a web frontend is with a Passage Auth custom element. First you'll need to import the passage-web javascript from the Passage CDN. This is done in this example in [public/index.html](https://github.com/passageidentity/example-react/blob/main/frontend/public/index.html):
```html
<script src="https://cdn.passage.id/passage-web.js" defer></script>
```
Importing this script will register the Passage custom element for use in your React components. For more information about custom elements refer to the [online documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Its then just a matter of embedding the passage-auth element into your component that will handle login. This is done in this example in [src/views/Home.js](https://github.com/passageidentity/example-react/blob/main/frontend/src/views/Home.js):
```html
<div className="form-container">
  <passage-auth
    app-id={process.env.REACT_APP_PASSAGE_APP_ID}
  />
</div>
```

## Getting Authentication Status and User Information
After the user has logged in with Passage, all requests to your backend needs to be authenticated using the JWT provided by Passage. In this example, we get the JWT from teh `psg_auth_token` cookie and send it in an Authorization header to our API server. 

This project uses a simple [Express](https://expressjs.com/) backend and the [Passage Node API](https://www.npmjs.com/package/@passageidentity/passage-node) to authenticate requests and retrieve user data for your application. You can see how that runs in the `/backend` folder of this repository.

This example wraps communication with the backend API in a custom hook in [src/models/hooks/useAuthStatus.js](https://github.com/passageidentity/example-react/blob/main/frontend/src/models/hooks/useAuthStatus.js) for re-use in any react component.