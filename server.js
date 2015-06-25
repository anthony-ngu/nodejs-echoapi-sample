var express = require('express')
, app = express()
, server = require('http').createServer(app)
, port = process.env.PORT || 3000
, fs = require('fs')
, util = require('util');

// Creates the website server on the port #
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Express Routing
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

// Helper function to format the strings so that they don't include spaces and are all lowercase 
var FormatString = function(string)
{
  var lowercaseString = string.toLowerCase();
  var formattedString = lowercaseString.replace(/\s/g,'');
  return formattedString;
};

// Handles the route for echo apis
app.post('/api/echo', function(req, res){
  console.log("received echo request");
  var requestBody = "";

  // Will accumulate the data
  req.on('data', function(data){
    requestBody+=data;
  });

  // Called when all data has been accumulated
  req.on('end', function(){
    var responseBody = {};
    console.log(requestBody);
    console.log(JSON.stringify(requestBody));

    // parsing the requestBody for information
    var jsonData = JSON.parse(requestBody);
    if(jsonData.request.type == "LaunchRequest")
    {
      // crafting a response
      responseBody = {
        "version": "0.1",
        "response": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "Welcome to Echo Sample! Please say a command"
          },
          "card": {
            "type": "Simple",
            "title": "Opened",
            "content": "You started the Node.js Echo API Sample"
          },
          "reprompt": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Say a command"
            }
          },
          "shouldEndSession": false
        }
      };
    }
    else if(jsonData.request.type == "IntentRequest")
    {
      var outputSpeechText = "";
      var cardContent = "";
      if (jsonData.request.intent.name == "TurnOn")
      {
        // The Intent "TurnOn" was successfully called
        outputSpeechText = "Congrats! You asked to turn on " + jsonData.request.intent.slots.Device.value + " but it was not implemented";
        cardContent = "Successfully called " + jsonData.request.intent.name + ", but it's not implemented!";
      }
      else if (jsonData.request.intent.name == "TurnOff")
      {
        // The Intent "TurnOff" was successfully called
        outputSpeechText = "Congrats! You asked to turn off " + jsonData.request.intent.slots.Device.value + " but it was not implemented";
        cardContent = "Successfully called " + jsonData.request.intent.name + ", but it's not implemented!";
      }else{
        outputSpeechText = jsonData.request.intent.name + " not implemented";
        cardContent = "Successfully called " + jsonData.request.intent.name + ", but it's not implemented!";
      }
      responseBody = {
          "version": "0.1",
          "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": outputSpeechText
            },
            "card": {
              "type": "Simple",
              "title": "Open Smart Hub",
              "content": cardContent
            },
            "shouldEndSession": false
          }
        };
    }else{
      // Not a recognized type
      responseBody = {
        "version": "0.1",
        "response": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "Could not parse data"
          },
          "card": {
            "type": "Simple",
            "title": "Error Parsing",
            "content": JSON.stringify(requestBody)
          },
          "reprompt": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Say a command"
            }
          },
          "shouldEndSession": false
        }
      };
    }

    res.statusCode = 200;
    res.contentType('application/json');
    res.send(responseBody);
  });
});