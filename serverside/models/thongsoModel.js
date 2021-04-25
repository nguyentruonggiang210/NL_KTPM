var mongoose = require("mongoose");
var schema = mongoose.Schema;

var thongso = new schema({
    Manhinh: String,
    Camtruoc: String,
    Camsau: String,
    CPU: String,
    Sim: String,
    Pin: Number,
    HDH: String,
});

module.exports = mongoose.model("specifications", thongso);