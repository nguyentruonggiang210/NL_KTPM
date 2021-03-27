var express = require('express')
var app = express.Router();
var User = require('../models/User');
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false})

// respond with "hello world" when a GET request is made to the homepage
app.post('/handleCheckAccount',urlencodedparser, async function (req, res) {
    try{
        var user_id = await req.body.user_id;
        const connection = require('../connection');
        User.findOne({
            user_id:user_id , 
        }, function(err, result) {
            if(err) return console.error(err);
            if(result){
                res.json({mess:"Exist"});
            }
            else{
                res.json({mess:"OK"});
            }
        })
    }
    catch(err){
        console.log(err);
    }
});
module.exports = app;

