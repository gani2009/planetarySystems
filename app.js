require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {nanoid} = require("nanoid");
const device = require("express-device");

var port = 8080;
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(device.capture());

// Home page
app.get('/', function(req, res){
  res.render("home", {device: req.device.type});
});

app.get('/system', function(req, res){
  const systemId = nanoid()
  res.redirect("/system/"+systemId);
});

app.get('/system/:systemId', function(req, res){
  res.render("system", {id: req.params.systemId, device: req.device.type});
});

//Start Server
app.listen(process.env.PORT || port, function(){
  console.log("Server started on port " + port);
});