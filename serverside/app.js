var express = require('express')
var app = express();
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.static(__dirname + '/public'));

// route
homeroute = require('./routes/home');
testhandleroute = require('./routes/handletest');
loginhandleroute = require('./routes/handlerLogin');
rescheckhandleroute = require('./routes/handleRes_Check');
registerhandleroute = require('./routes/handleRegister');
//
app.set('view engine','ejs');
app.set('views','./views');

// use
app.use('/',homeroute);
app.use('/',testhandleroute);
app.use('/',loginhandleroute);
app.use('/',rescheckhandleroute);
app.use('/',registerhandleroute);

app.listen(3000);