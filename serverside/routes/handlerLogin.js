var express = require('express')
var app = express.Router();
var User = require('../models/User');
const crypto = require('crypto');
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false})

// respond with "hello world" when a GET request is made to the homepage
app.post('/handleLogin',urlencodedparser, async function (req, res) {
    try{
        var user_id = await req.body.user_id;
        var user_pass = await req.body.user_password;
        const hash = crypto.createHash('sha256');
        hash.update(String(user_pass));
        var hashed = hash.digest('hex');
        // connect db
        const connection = require('../connection');

        //
        User.findOne({
            user_id:user_id , 
            user_password: hashed,
        }, function(err, result) {
            if(err) return console.error(err);
            if(result){
                res.json({obj:result});
            }
            else{
                res.json({obj:'failed'});
            }
        })
    }
    catch(err){
        console.log(err);
    }
});
module.exports = app;

