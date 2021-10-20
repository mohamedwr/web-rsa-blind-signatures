
const express = require("express");
const app = new express();

const crypto = require("crypto");

keys = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096
});

app.use("/static", express.static("client/static"));

app.get("/key", (req, res) => {
  res.end(keys.publicKey.export({
    type: "pkcs1",
    format: "pem"
  }));
});

app.post("/sign", (req, res) => {

});

app.post("/verify", (req, res) => {

});

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
})

app.listen(8080);