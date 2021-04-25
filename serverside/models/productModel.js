var mongoose = require("mongoose");
var schema = mongoose.Schema;
var product = new schema({
    product_name: String,
    product_type: String,
    product_img: [{type: schema.Types.String}],
    product_descript: [{type: schema.Types.String}],
    product_buy: Number,
    product_video: String,
    product_brand: String,
    product_price: Number,
    product_detail_display: String,
    product_detail_os: String,
    product_detail_backcam: String,
    product_detail_frontcam: String,
    product_detail_cpu: String,
    product_detail_ram: String,
    product_detail_rom: String,
    product_detail_sim: String,
    product_detail_pin: String,

})

module.exports = mongoose.model("product", product);