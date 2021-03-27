const User = require('./models/User');
// const assert = require('assert');
// describe("Saving records",function(){
//     // create tests
//     it('Saves a record to the database',function () {
//         var user = new User({
//             name:'User',
//         });
//         user.save().then(function(){
//             assert(user.isNew === false);
//             done();
//         });
//     })
// });


var user = new User({
    user_id: "TEST",
    user_password:"TEST",
    user_name : "TEST",
    user_email:"TEST",
    user_tel:"TEST",
    user_address:"TEST",
});

user.save(function(err,user){
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
});