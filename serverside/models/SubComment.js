const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const CommentSchema = new Schema({
    Noidung_BLC:String,
    Ngay_BLC:Date,
    ID_BL:ObjectID,
    ID_TK:ObjectID,
});
const Binhluancon = mongoose.model('Binhluancon',CommentSchema);

module.exports = Binhluancon;
