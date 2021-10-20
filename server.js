
const express = require("express");
const app = new express();
const bodyParser = require('body-parser');

const crypto = require("crypto");

keys = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096
});


app.use(bodyParser.json());
app.use("/static", express.static("client/static"));

app.get("/key", (req, res) => {
  res.end(keys.publicKey.export({
    type: "pkcs1",
    format: "pem"
  }));
});


app.post("/sign", (req, res) => {
  res.end(crypto.sign("sha256", Buffer.from(req.body.m), {
    key: keys.privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  }).toString('base64'));
});

app.post("/verify", (req, res) => {

});


app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
})

app.listen(8080);