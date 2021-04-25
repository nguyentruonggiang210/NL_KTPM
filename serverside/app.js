var express = require('express')
var app = express();
var router = express.Router()
// tạo server socket

var donhangModel = require('./models/donhangModel');
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message',async function(message) {
      var data =  message.utf8Data;
      if(data === 'new_order'){
          var connect = require('./connection');
          await donhangModel.find({Trangthai_DH:'Chưa xác nhận'},function(err,data){
            if(err) {
              console.log(err);
              connection.send(JSON.stringify(0));
            }
            if(data){
              connection.send(JSON.stringify(data.length));
            }
            else{
              connection.send(JSON.stringify(0));
            }
        });
      }
    });
    connection.on('close', function(reasonCode, description) {
        // console.log('Client has disconnected.');
    });
});

//
var route_user_handler = require('./routes/UseRoute/Userroute');
var route_render = require('./routes/render');
var cookieParser = require('cookie-parser')
var admin_route = require('./routes/adminroute');
var route = require('./routes/route');
app.use(cookieParser())
var session = require('express-session');
app.use(session({
    cookie : {
      maxAge : 3600000
    },
    secret: '0031231231237',
  }));
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.static(__dirname + '/public'));
var cookieParser = require('cookie-parser')
app.use(cookieParser())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views','./views');

route_render(app);
route_user_handler(app);
admin_route(app);
route(app);
app.listen(3000);

