var mongoose = require("mongoose");
var schema = mongoose.Schema;
var dienthoai = new schema({
    Ma_DT: String,
    Ten_DT: String,
    Hinhanh_DT: [{type: schema.Types.String}],
    Mota_DT: [{type: schema.Types.String}],
    ID_TS: {type: schema.Types.ObjectId},
    ID_H: {type: schema.Types.ObjectId}
    
})

module.exports = mongoose.model("mobiles", dienthoai);