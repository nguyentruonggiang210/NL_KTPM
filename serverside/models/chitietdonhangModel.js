const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const OrderDetail = new Schema({
   Soluong:Number,
   Thanhtien:Number,
   ID_DH:ObjectID,
   ID_CTDT:ObjectID,
});
const orderdetail = mongoose.model('orderdetail',OrderDetail);

module.exports = orderdetail;
