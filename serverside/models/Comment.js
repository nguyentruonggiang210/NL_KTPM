const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const CommentSchema = new Schema({
    Noidung_BL:String,
    Ngay_BL:Date,
    ID_TK:ObjectID,
    ID_TK:ObjectID,
});
const Binhluan = mongoose.model('Binhluan',CommentSchema);

module.exports = Binhluan;
