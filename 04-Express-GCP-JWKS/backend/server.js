const express = require("express");
const cors = require("cors");
const axios = require('axios');

const app = express();
const PORT = 7000;
const CLIENT_URL = "http://localhost:3000";

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

const GCP_API_GATEWAY_URL = process.env.GCP_API_GATEWAY_URL;

app.post("/JWKAuth", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwkEndpointResponse = await axios.get(GCP_API_GATEWAY_URL, { headers: { 'Authorization': `Bearer ${token}`}})
    if (jwkEndpointResponse.status === 200) {
      return res.status(200).json({...jwkEndpointResponse.data, GCP_API_GATEWAY_URL});
    }

    return res.status(401).json({message: "Authentication failed"});
  } catch (e) {
    // authentication failed
    res.json({
      authStatus: "failure",
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
