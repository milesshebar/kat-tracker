// init project
const express = require("express");
var parseString = require("xml2js").parseString;
const request = require("request");
const tj = require("@tmcw/togeojson");
const fs = require("fs");
const util = require('util')
const DOMParser = require("xmldom").DOMParser;

const options = {
  method: "GET",
  uri: "http://knox.ecolane.com/mde.php?q=vehicle_live"
};



function KATkml() {
  request(options, function(err, res, body) {
    if (err) throw err;
    var xml = body;

    parseString(xml,function(err, result) {
      var jsoniem = JSON.stringify(result);
      result.kml.Document[0].Placemark.forEach(function (el) {
      
        if (el.name == '124 (MTV-Gamb Evening)' || el.name == '143 (MTV-Gamb Day)') {
          console.log(el.Point[0].coordinates[0]);
          io.emit("shuttle", el.Point[0].coordinates[0]);
        }      
      });
    });
  })};

setInterval(KATkml, 10000);

const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});