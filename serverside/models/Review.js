const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const ReviewSchema = new Schema({
    Noidung_DG:String,
    Ngay_DG:Date,
    ID_DT:ObjectID,
    ID_TK:ObjectID,
});
const Danhgia = mongoose.model('Danhgia',ReviewSchema);

module.exports = Danhgia;
