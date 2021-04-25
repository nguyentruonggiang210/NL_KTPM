const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const Order = new Schema({
   Tongtien:Number,
   Trangthai_DH:String,
   Ngaylap_DH:Date,
   ID_HTTT:ObjectID,
   Taikhoan_USER:String,
});
const order = mongoose.model('order',Order);

module.exports = order;
