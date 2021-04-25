const mongoose = require('mongoose');

// ES6 Promises

// mongoose.Promise = global.Promise;

// Connect to db before tests run

// connent mongobd

function connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/DNGMobile');
    mongoose.connection.on("error", console.error.bind(console, "connection error:"));
    mongoose.connection.once('open',function(){
        console.log('Connection successfully!');
    }).on('error',function(err){
        console.log('Connection error:'+err);
    });
}
module.exports = connect();


//
// const User = require('./models/User');
// var user = new User({
//     user_id: "TEST",
//     user_password:"TEST",
//     user_name : "TEST",
//     user_email:"TEST",
//     user_tel:"TEST",
//     user_address:"TEST",
// });

// user.save(function(err,user){
//     if (err) return console.error(err);
//     console.log("Document inserted succussfully!");
// });