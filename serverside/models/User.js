const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const UserSchema = new Schema({
    user_id: String,
    user_password:String,
    user_name : String,
    user_email:String,
    user_tel:String,
    user_address:String,
});
const User = mongoose.model('user',UserSchema);

module.exports = User;
