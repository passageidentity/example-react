const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");

app = express();
PORT = 7000;
CLIENT_URL = "http://localhost:3000";

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

let passage = new Passage({
  appID: process.env.REACT_APP_PASSAGE_APP_ID,
  apiKey: process.env.REACT_APP_PASSAGE_APP_API_KEY,
  authStrategy: "HEADER",
});

app.post("/auth", async (req, res) => {
  try {
    let userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      let { email } = await passage.user.get(userID);
      res.json({
        authStatus: "success",
        email,
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
