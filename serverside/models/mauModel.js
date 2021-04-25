var mongoose = require("mongoose");
var schema = mongoose.Schema;

var mau = new schema({
    Mau: String
});

module.exports = mongoose.model("colors", mau);