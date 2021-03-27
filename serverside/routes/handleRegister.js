var express = require('express')
var app = express.Router();
var User = require('../models/User');
const crypto = require('crypto');
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false})

// respond with "hello world" when a GET request is made to the homepage
app.post('/handleRegister',urlencodedparser, async function (req, res) {
    try{
        var user_id = await req.body.user_id;
        var user_pass = await req.body.user_password;
        var user_name = await req.body.user_name;
        var user_date = await req.body.user_date;
        var user_gender = await req.body.user_gender;
        var user_address = await req.body.user_address;
        var user_tel = await req.body.user_tel;
        var user_email = await req.body.user_email;
        const hash = crypto.createHash('sha256');
        hash.update(String(user_pass));
        var hashed = hash.digest('hex');
        // connect db
        const connection = require('../connection');
        // Save model

        const User = require('../models/User');
        var user = new User({
            user_id: user_id,
            user_password:hashed,
            user_name : user_name,
            user_email:user_email,
            user_tel:user_tel,
            user_address:user_address,
            user_date:user_date,
            user_gender:user_gender,
        });
        user.save(function(err,user) {
            if (err){
                res.json({mess:"Failed"});
                return console.error(err);
            } 
            res.json({mess:"Success"});
        });
        
    }
    catch(err){
        console.log(err);
    }
});
module.exports = app;

