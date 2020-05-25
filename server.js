// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/timestamp/:date_string", function(req, res) {
  const date = req.params.date_string
  
  console.log("what is date", date);
  
  const unix = Date.parse(date);
  
  const newDate = new Date(date);
  
  if(unix) {
    res.json({
      unix: unix,
      utc: newDate.toUTCString()
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
});


app.get("/api/timestamp/", function(req, res) {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
