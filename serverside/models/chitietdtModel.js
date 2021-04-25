var mongoose = require("mongoose");
var schema = mongoose.Schema;
var chitiet = new schema({
    Soluong_DT: Number,
    Giamua_DT: Number,
    Giaban_DT: Number,
    Ngaynhap_DT: String,
    Nguoinhap_DT: String,
    ID_Ram: {type: schema.Types.ObjectId},
    ID_Rom: {type: schema.Types.ObjectId}, 
    ID_Mau: {type: schema.Types.ObjectId},
    Hinh_M: [{type: schema.Types.String}],
    ID_DT: {type: schema.Types.ObjectId}
})

module.exports = mongoose.model("mobiledetails", chitiet);