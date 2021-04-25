const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const Payment = new Schema({
   Hinhthuc_TT:String,
});
const PaymentType = mongoose.model('paymenttype',Payment);

module.exports = PaymentType;
