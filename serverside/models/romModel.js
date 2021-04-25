var mongoose = require("mongoose");
var schema = mongoose.Schema;

var rom = new schema({
    Rom: Number
});

module.exports = mongoose.model("roms", rom);