var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ram = new schema({
    Ram: Number
});

module.exports = mongoose.model("rams", ram);