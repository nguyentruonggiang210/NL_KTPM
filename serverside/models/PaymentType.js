const { interfaces } = require('mocha');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const PaymentType = new Schema({
    Hinhthuc_TT:String,
});
const Hinhthucthanhtoan = mongoose.model('Hinhthucthanhtoan',PaymentType);
module.exports = Hinhthucthanhtoan;
