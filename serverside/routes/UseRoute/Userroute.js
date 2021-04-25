var express = require('express')
var app = express.Router();
var Classhandler = require('../../Handler/UserHandler');
var bodyParser = require('body-parser');
function route(app){
    // Login
    app.post("/user/handleLogin",Classhandler.HandlerLogin);

    // Logout
    app.get("/user/handleLogout",Classhandler.HandlerLogout);

    // Check account exist
    app.post('/user/handleCheckAccount',Classhandler.HandlerCheckAccount);

    // Register
    app.post('/user/handleRegister', bodyParser.urlencoded() ,Classhandler.HandlerRegister);

    // Update User Infor
    app.post('/user/update_infor/', bodyParser.urlencoded() ,Classhandler.UpdateUserInfor);

    // Check password
    app.post('/user/checkpassword/',bodyParser.urlencoded(),Classhandler.CheckPassword);

    // change password
    app.post('/user/changepassword/',bodyParser.urlencoded(),Classhandler.ChangePassword);

    
}
module.exports = route;