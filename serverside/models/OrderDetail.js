const { ObjectID } = require('bson');
const { interfaces } = require('mocha');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const OrderSchema = new Schema({
    Soluongmua_DT:Number,
    Thanhtien:Number,
    ID_DT:ObjectID,
    ID_DH:ObjectID,
});
const Chitietdonhang = mongoose.model('Chitietdonhang',OrderSchema);
module.exports = Chitietdonhang;
