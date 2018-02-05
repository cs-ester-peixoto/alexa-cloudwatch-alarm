'use strict';
const Alexa = require('alexa-sdk');
var qs = require("querystring");
var https = require("https");

var APP_ID = "amzn1.ask.skill.76107099-8786-4dda-9449-f6a634354caa";

const handlers = {
  "LaunchRequest": function() {
    this.response.speak("Welcome to your central of notifications!");
    this.emit(":responseReady");
  },
  "GetNotificationIntent": function() {
    this.response.speak("Threre isn't new notifications");
    this.emit(":responseReady");
  },
  "IssueTreatedIntent": function() {
    var iftttMakerUrl = "https://maker.ifttt.com/trigger/treating_issue/with/key/b4VF6bauqGL5luhzOqfQkP";

    https.get(encodeURI(iftttMakerUrl), function(res) {
      console.log("Got response: " + res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function(d) {
        console.log('Body: ' + d);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
    this.response.speak("Let's do it! I'm changing the color to yellow.");
    this.emit(":responseReady");
  },
  "IssueClosedIntent": function() {
    var iftttMakerUrl = "https://maker.ifttt.com/trigger/closed_issue/with/key/b4VF6bauqGL5luhzOqfQkP";

    https.get(encodeURI(iftttMakerUrl), function(res) {
      console.log("Got response: " + res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function(d) {
        console.log('Body: ' + d);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
    this.response.speak("Good job! Now the color is blue.");
    this.emit(":responseReady");
  },
  "Unhandled": function() {
    this.emit("LaunchRequest");
  }
};

exports.handler = function(event, context, callback) {
  console.log(event);
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
  context.succeed();
};
