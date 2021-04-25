const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const UserSchema = new Schema({
    Taikhoan_TK: String,
    Matkhau:String,
    Ten_nguoidung:String,
    Ngaysinh_nguoidung:Date,
    Gioitinh_nguoidung:String,
    Sdt_nguoidung:String,
    Email_nguoidung:String,
    Diachi_nguoidung:String,
    Hinhanh_nguoidung:String,
    Ngaytao_TK:Date,
    ID_Loai_TK:ObjectID,
});
const Taikhoan = mongoose.model('user',UserSchema);
module.exports = Taikhoan;
