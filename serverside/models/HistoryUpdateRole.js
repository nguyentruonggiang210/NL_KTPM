const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const History = new Schema({
    Taikhoan_User:String,
    Noidung_thaydoi:String,
    Thoigian_thaydoi:Date,
});
const HistoryUpdate = mongoose.model('historyaccountmanagement',History);

module.exports = HistoryUpdate;
