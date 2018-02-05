'use strict';

var qs = require("querystring");
var http = require("https");

var options_authorization = {
  "method": "POST",
  "hostname": "api.amazon.com",
  "port": null,
  "path": "/auth/O2/token",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "472d5f96-c925-18af-794e-1c7a8bb0dbbd"
  }
};

var req_authorization = http.request(options_authorization, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var bodyJson = JSON.parse(body);
    console.log(bodyJson.access_token);

    var userId = "amzn1.ask.account.AHT2JRPZSUOZXF7ZTEO2HWFE4II2J7ZO3CA4PQWJMVU23TT3GF45WQSTPSW5BZSIHN76TUFVV765DN6VIBN5PSCKXGNBYZX43UW3CCDQPUHZJFWMK7E5HIVDXE7V7PF4RYLW2PX5PGSFXUZ2QSY2O5W24GF35D7OJEHI2XNX6RPP3OOTGTXGSYFN3Y4APMLXSZJ3KRRWYXRLUQA";
    var options_skill_messaging = {
      "method": "POST",
      "hostname": "api.amazonalexa.com",
      "port": null,
      "path": "/v1/skillmessages/users/" + userId,
      "headers": {
        "content-type": "application/json",
        "authorization": "Bearer " + bodyJson.access_token,
        "cache-control": "no-cache",
        "postman-token": "4359aea7-9b1e-f871-014e-7b2e46b7b6b6"
      }
    };

    var req_skill_messaging = http.request(options_skill_messaging, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
      //var headerJson = JSON.stringify(res.headers);
      console.log(res.headers["x-amzn-requestid"]);
    });

    req_skill_messaging.write(JSON.stringify({ data: { notificationTitle: 'New Message from Backend', spokenOutput: 'Hi, This is the message sent from Backend.' }, expiresAfterSeconds: 60 }));
    req_skill_messaging.end();
  });
});

req_authorization.write(qs.stringify({ grant_type: 'client_credentials',
  client_id: 'amzn1.application-oa2-client.fffb8bdd9e5f44b6b9873e74baab74d5',
  client_secret: '1a10958b09b7078c74c456fb3d2ed513c1c7329a0440c4a043bbaac1375d05e5',
  scope: 'alexa:skill_messaging' }));
req_authorization.end();
//context.succeed();
