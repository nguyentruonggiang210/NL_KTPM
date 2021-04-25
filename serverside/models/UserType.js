const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const UserSchema = new Schema({
    Tenloai_TK:String,
});
const Loaitaikhoan = mongoose.model('usertype',UserSchema);

module.exports = Loaitaikhoan;
