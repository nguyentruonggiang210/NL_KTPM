var mongoose = require("mongoose");
var schema = mongoose.Schema;

var brand = new schema({
    Ten_H: String
});

module.exports = mongoose.model("brands", brand);