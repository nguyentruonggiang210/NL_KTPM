var express = require('express')
var app = express.Router();

// respond with "hello world" when a GET request is made to the homepage
app.post('/handletest', function (req, res) {
    var input = req.body.testinput;
    res.send(input);
})
module.exports = app;

