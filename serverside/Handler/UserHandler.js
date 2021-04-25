var User = require('../models/User');
var UserType = require('../models/UserType');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;
var formidable = require('formidable');
const multer = require('multer');
const helpers = require('./ImageFilter');
const fs = require('fs');
const path = require('path')
var getUserTypeMain = require('./check_admin');

class UserHandler{
    constructor(){
        this.user_id = "";
        this.user_password = "";
        this.user_name = "";
        this.user_email = "";
        this.user_tel = "";
        this.user_address = "";
        this.user_gender = "";
    }
    
    // Login
    HandlerLogin(req, res){
        try{
            
            var user_id =  req.body.user_id;
            var user_pass =  req.body.user_password;
            const hash = crypto.createHash('sha256');
            hash.update(String(user_pass));
            var hashed = hash.digest('hex');
            // connect db
            const connection = require('../connection');
            // set cookie admin
            getUserTypeMain(req,res,user_id);
            //
            User.findOne({
                Taikhoan_TK:user_id , 
                Matkhau: hashed,
            }, function(err, result) {
                if(err) return console.error(err);
                if(result){
                    res.cookie("user",result.Ten_nguoidung,{expires: new Date(Date.now()+17280000000)});
                    req.session.user = result.Taikhoan_TK;
                    req.session.save();
                    res.json({obj:result});
                }
                else{
                    res.json({obj:'failed'});
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
    
    // Logout
    HandlerLogout(req,res){
        res.clearCookie("user");
        res.clearCookie("admin");
        req.session.destroy();
        res.redirect("/");
    }

    // Check account exist
    HandlerCheckAccount(req,res){
        try{
            var user_id = req.body.user_id;
            const connection = require('../connection');
            User.findOne({
                Taikhoan_TK:user_id , 
            }, function(err, result) {
                if(err) return console.error(err);
                if(result){
                    res.json({mess:"Exist"});
                }
                else{
                    res.json({mess:"OK"});
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }

    // Register
    HandlerRegister(req,res){
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
            return;
            }
            // connect db
            const connection = require('../connection');

            var taikhoan =  fields.user_id;
            var matkhau = fields.user_pass;
            //hash password
            const hash = crypto.createHash('sha256');
            hash.update(String(matkhau));
            var hashed = hash.digest('hex');
            //
            var ten = fields.user_name;
            var parts = fields.user_date.split('-');
            var ngaysinh = new Date(parts[0],parts[1]-1,parts[2]);
            var gioitinh = fields.user_gender;
            var diachi = fields.user_address;
            var sdt =  fields.user_tel;
            var email =  fields.user_email;
            var ngaytao = Date.now();
            try{
                var temp =  files.user_image.name.split('.');
                var extend_name = temp[temp.length-1];
                var oldpath = files.user_image.path;
                var newpath = path.join(__dirname, '..','public','images','accounts')+"\\"+taikhoan+'.'+extend_name;
                var rawData = fs.readFileSync(oldpath);
                var avatar = "/images/accounts/" + taikhoan + '.' + extend_name;
                fs.writeFile(newpath, rawData, function (err) {
                    if (err) throw err;
                    try{        
                        // Save model
                        var user = new User({
                            Taikhoan_TK: taikhoan,
                            Matkhau:hashed,
                            Ten_nguoidung:ten,
                            Ngaysinh_nguoidung:ngaysinh,
                            Gioitinh_nguoidung:gioitinh,
                            Sdt_nguoidung:sdt,
                            Email_nguoidung:email,
                            Diachi_nguoidung:diachi,
                            Hinhanh_nguoidung:avatar,
                            Ngaytao_TK:ngaytao,
                            ID_Loai_TK:ObjectId("606d13c4b66f9e4e4815af98"),
                        });
                        user.save(function(err,user) {
                            if (err){
                                res.json({mess:"Failed"});
                                return console.error(err);
                            } 
                            res.json({mess:"Success"});
                        });
                    }
                    catch(err){
                        console.log(err);
                    }
                });
            }
            catch(err){
                // Save model
                var user = new User({
                    Taikhoan_TK: taikhoan,
                    Matkhau:hashed,
                    Ten_nguoidung:ten,
                    Ngaysinh_nguoidung:ngaysinh,
                    Gioitinh_nguoidung:gioitinh,
                    Sdt_nguoidung:sdt,
                    Email_nguoidung:email,
                    Diachi_nguoidung:diachi,
                    Hinhanh_nguoidung:"",
                    Ngaytao_TK:ngaytao,
                    ID_Loai_TK:ObjectId("606d13c4b66f9e4e4815af98"),
                });
                user.save(function(err,user) {
                    if (err){
                        res.json({mess:"Failed"});
                        return console.error(err);
                    } 
                    res.json({mess:"Success"});
                });
            }
        });
    }
    
    // Update user infor
    UpdateUserInfor(req,res){
        console.log(req.session.user);
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
            return;
            }
            // connect db
            const connection = require('../connection');
            //
            var ten = fields.user_name;
            var parts = fields.user_date.split('-');
            var ngaysinh = new Date(parts[0],parts[1]-1,parts[2]);
            var gioitinh = fields.user_gender;
            var diachi = fields.user_address;
            var sdt =  fields.user_tel;
            var email =  fields.user_email;
            User.findOne({Taikhoan_TK:req.session.user},function(error,result){
                if(error){
                    res.redirect('http://127.0.0.1:3000/');
                    return console.log(error);
                } 
                if(result){
                    var hinhanh = result.Hinhanh_nguoidung;
                    var manghinhanh = hinhanh.split('/');
                    var tenhinhanh = manghinhanh[manghinhanh.length - 1];
                    try{
                        var temp =  files.user_image.name.split('.');
                        var extend_name = temp[temp.length-1];
                        var oldpath = files.user_image.path;
                        var newpath = path.join(__dirname, '..','public','images','accounts')+"\\"+req.session.user+'.'+extend_name;
                        var rawData = fs.readFileSync(oldpath);
                        var avatar = "/images/accounts/" + req.session.user + '.' + extend_name;
                        
                        // xoa hinh anh cu
                        try{
                            var hinhanhxoa = path.join(__dirname, '..','public','images','accounts')+"\\"+tenhinhanh;
                            fs.unlinkSync(hinhanhxoa);
                        }
                        catch{
                            
                        }
                        // chen hinh anh moi
                        fs.writeFile(newpath, rawData, function (err) {
                            if(err){
                                res.json({mess:"Failed"});
                                return;
                            }
                            else{
                                result.Ten_nguoidung = ten;
                                result.Ngaysinh_nguoidung = ngaysinh;
                                result.Diachi_nguoidung = diachi;
                                result.Email_nguoidung = email;
                                result.Gioitinh_nguoidung = gioitinh;
                                result.Sdt_nguoidung = sdt;
                                result.Hinhanh_nguoidung = avatar;
                                result.save(function(error){
                                    if(error){
                                        res.json({mess:"Failed"});
                                    }
                                    else{
                                        res.cookie("user",result.Ten_nguoidung,{expires: new Date(Date.now()+17280000000)});
                                        res.json({mess:"Success"});
                                    }
                                });
                            }
                        });
                    }
                    catch(except){
                        console.log(except);
                        result.Ten_nguoidung = ten;
                        result.Ngaysinh_nguoidung = ngaysinh;
                        result.Diachi_nguoidung = diachi;
                        result.Email_nguoidung = email;
                        result.Gioitinh_nguoidung = gioitinh;
                        result.Sdt_nguoidung = sdt;
                        result.save(function(saveerr){
                            if(saveerr){
                                res.json({mess:"Failed"});
                            }
                            else{
                                res.cookie("user",result.Ten_nguoidung,{expires: new Date(Date.now()+17280000000)});
                                res.json({mess:"Success"});
                            }
                        });
                    }

                }
            });
        });
    }

    // Check password
    CheckPassword(req,res){
        const connect = require('../connection');
        var pass = req.body.user_password;
        const hash = crypto.createHash('sha256');
        hash.update(String(pass));
        var hashed = hash.digest('hex');
        User.findOne({
            Taikhoan_TK:req.session.user,
            Matkhau: hashed,
        },function(err,result){
            if(err){
                res.json({mess:'Failed'});
                return console.log(err);
            }
            if(result){
                res.json({mess:'Success'});
            }
            else{
                res.json({mess:'Failed'});
            }
        });

    }

    //ChangePassword
    ChangePassword(req,res){
        const connect = require('../connection');
        var pass = req.body.user_password;
        const hash = crypto.createHash('sha256');
        hash.update(String(pass));
        var hashed = hash.digest('hex');
        User.findOne({
            Taikhoan_TK:req.session.user,
        },function(err,result){
            if(err){
                res.json({mess:"Failed"});
            }
            if(result){
                result.Matkhau = hashed;
                result.save(function(e){
                    if(e) {
                        res.json({mess:"Failed"});
                    }
                    else{
                        res.json({mess:"Success"});
                    }
                });
            }
            else{
                res.json({mess:"Failed"});
            }
        });
        
    }
}
module.exports = new UserHandler;