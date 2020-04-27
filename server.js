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

var location = request(options, function(err, res, body) {
  if (err) {
    return console.log(err);
  }
  var xml = body;
  
  parseString(xml,function(err, result) {
      
    var jsoniem = JSON.stringify(result);
    result.kml.Document[0].Placemark.forEach(function (el) {
      
      if (el.name == '124 (MTV-Gamb Evening)') {
        console.log(el.Point[0].coordinates[0]);
      }
      
      if (el.name == '143 (MTV-Gamb Day)') {
        console.log(el.Point[0].coordinates[0]);
      }
      
    });
    
    /*console.log(result.kml.Document[0].Placemark[5].name[0]);
    console.log(result.kml.Document[0].Placemark[5].Point[0].coordinates[0]);
    return result.kml.Document[0].Placemark[10].Point[0].coordinates[0];*/
  });
});

const app = express();

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
