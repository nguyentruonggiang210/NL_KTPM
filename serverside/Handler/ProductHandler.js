var mongoose = require("mongoose");
var chitietdonhangModel = require('../models/chitietdonhangModel');
var donhangModel = require('../models/donhangModel');
var dienthoaiModel = require("../models/dienthoaiModel");
var thongsoModel = require("../models/thongsoModel");
var chitietModel = require("../models/chitietdtModel");
var hangModel = require("../models/hangModel");
var ramModel = require("../models/ramModel");
var romModel = require("../models/romModel");
var mauModel = require("../models/mauModel");
var ObjectId = require('mongodb').ObjectID;
const { truncate } = require("fs");
const { ObjectID } = require('bson');

mongoose.set('useFindAndModify', false);

class ProductController{
    //hien thi form add
    DisplayForm(req, res){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        var connection = require('../connection');
        var hang;
        var ram;
        var rom;
        var mau;
        //find hang
        hangModel.find(function(err, data){
            if(!err){
                hang = data;
                //find ram
                ramModel.find(function(err, data){
                    if(!err){
                        ram = data;
                        //find rom
                        romModel.find(function(err, data){
                            if(!err){
                                rom = data;
                                //find mau
                                mauModel.find(function(err, data){
                                    if(!err){
                                        mau = data;
                                        res.render("Admin/addPro", {hang: hang, ram: ram, rom: rom, mau: mau});
                                    } 
                                })
                            } 
                        })
                    } 
                })
            } 
        })
    };

    //Lay thong so
    GetProductDetail(req, res){
        var connection = require('../connection');
        var madt = req.params.madt;
        dienthoaiModel.findOne({Ma_DT: madt}, function(err, dienthoai){
            if(!err){
                if(dienthoai){
                    var idthongso = dienthoai.ID_TS;
                    thongsoModel.findOne({_id: idthongso}, function(err, thongso){
                        
                        res.render("Admin/thongso", {thongso: thongso});
                    })
                }
                 
            }
            else{
               console.log("Co loi");
            }
        })
        
    };

    //add dienthoai
    AddProduct(req, res){
        var connection = require('../connection');
        //kiem tra xem da co dien thoai trong DB chua
        dienthoaiModel.findOne({Ma_DT: req.body.madt}, function(err, data){
            if(!err){
                if(!data){
                    //them thong so
                    var pin = req.body.pin;
                    pin = parseInt(pin);
                    var thongso = new thongsoModel({
                        Manhinh: req.body.manhinh,
                        Camtruoc: req.body.camtruoc,
                        Camsau: req.body.camsau,
                        CPU: req.body.cpu,
                        Sim: req.body.sim,
                        Pin: pin,
                        HDH: req.body.hdh
                    })
                    thongso.save(function(err){
                        if(!err){
                            //them thong tin dien thoai
                            var hinh = req.files.hinhmota; 
                            var duongdan = [];
                            hinh.forEach(function(hinh){
                                duongdan.push("/images/mobiles/"+hinh.filename);
                            })
                            var chuoi = req.body.mota;
                            var mota = [];
                            mota = chuoi.split("*");
                            var dienthoai = new dienthoaiModel({
                                Ma_DT: req.body.madt,
                                Ten_DT: req.body.tendt,
                                Hinhanh_DT: duongdan,
                                Mota_DT: mota,
                                ID_TS: thongso._id,
                                ID_H: req.body.hang,
                            })
                            dienthoai.save(function(err){
                                if(!err){
                                    
                                    var soluong = req.body.soluong;
                                    soluong = parseInt(soluong);
                                    var giamua = req.body.giamua;
                                    giamua = parseInt(giamua);
                                    var giaban = req.body.giaban;
                                    giaban = parseInt(giaban);
                                    var hinhmau = req.files.hinhmau;
                                    var duongdan2 = [];
                                    hinhmau.forEach(function(hinh){
                                        duongdan2.push("/images/mobiles/"+hinh.filename);
                                    });
                                    var chitiet = new chitietModel({
                                        Soluong_DT: soluong,
                                        Giamua_DT: giamua,
                                        Giaban_DT: giaban,
                                        Ngaynhap_DT: req.body.ngaynhap,
                                        Nguoinhap_DT: req.body.nguoinhap,
                                        ID_Ram: req.body.ram,
                                        ID_Rom: req.body.rom,
                                        ID_Mau: req.body.mau,
                                        Hinh_M: duongdan2,
                                        ID_DT: dienthoai._id
                                    })
                                    chitiet.save(function(err){
                                        if(!err){
                                            res.send(chitiet);
                                        }
                                    })
                                }
                            });
                        }
                    })
                }
                else{
                    // chi them chi tiet vao DB
                    var soluong = req.body.soluong;
                    soluong = parseInt(soluong);
                    var giamua = req.body.giamua;
                    giamua = parseInt(giamua);
                    var giaban = req.body.giaban;
                    giaban = parseInt(giaban);
                    var hinhmau = req.files.hinhmau;
                    var duongdan2 = [];
                    hinhmau.forEach(function(hinh){
                        duongdan2.push("/images/mobiles/"+hinh.filename);
                    });
                    var chitiet = new chitietModel({
                        Soluong_DT: soluong,
                        Giamua_DT: giamua,
                        Giaban_DT: giaban,
                        Ngaynhap_DT: req.body.ngaynhap,
                        Nguoinhap_DT: req.body.nguoinhap,
                        ID_Ram: req.body.ram,
                        ID_Rom: req.body.rom,
                        ID_Mau: req.body.mau,
                        Hinh_M: duongdan2,
                        ID_DT: data._id
                    })
                    chitiet.save(function(err){
                        if(!err){
                            res.send(chitiet);
                        }
                    })
                }
            }
        })
    };

    // Tìm kiếm
    SearchProduct(req,res){
        var product_name = req.body.data;
        var connection = require('../connection');
        dienthoaiModel.aggregate([
        {
            $match:{
                Ten_DT: {$regex: '^' + product_name, $options: 'i'}
            }
        },
        {
            $lookup: {
                "from": "mobiledetails",
                "localField": "_id",
                "foreignField": "ID_DT",
                "as": "result_array"
            }
        },
        {
            "$unwind": "$result_array"
        },
        {
            $project:{
                _id:1,
                Ten_DT:1,
                "result_array":{
                    Giaban_DT: 1,
                    Hinh_M: 1,
                },
            }
        }
        ]).exec(function(err,data){
                if(err) return console.log(err);
                if(data){
                    let temp_data = [];
                    for(var i = 0;i<data.length;i++){
                        if(i == 0){
                            temp_data.push(data[i]);
                            console.log(temp_data);
                        }
                        else{
                            var p_name = data[i].Ten_DT;
                            var stt = true;
                            for(var j = 0; j<temp_data.length;j++){
                                if(p_name === temp_data[j].Ten_DT) stt = false; 
                            }
                            if(stt){
                                temp_data.push(data[i]);
                            }
                        }
                    }
                    res.json({data:temp_data});
                }
            });
    }

    //detail
    detail(req, res){
        var connection = require('../connection');
        var iddt = req.query.ID_DT; 
        var idct = req.query.ID_CT;

        dienthoaiModel.aggregate([
        {
            $lookup: {
                from: "specifications",
                localField: "ID_TS",
                foreignField: "_id",
                as: "thongso"
            }
        },
        {
            $lookup: {
                from: "brands",
                localField: "ID_H",
                foreignField: "_id",
                as: "hang"
            }
        },
        {
            $lookup: {
                from: "mobiledetails",
                localField: "_id",
                foreignField: "ID_DT",
                as: "chitiet"
            }
        },
        {
            $unwind: "$chitiet"
        },
        {
            $lookup: {
                from: "rams",
                localField: "chitiet.ID_Ram",
                foreignField: "_id",
                as: "ram"
            }
        },
        {
            $lookup: {
                from: "roms",
                localField: "chitiet.ID_Rom",
                foreignField: "_id",
                as: "rom"
            }
        },
        {
            $lookup: {
                from: "colors",
                localField: "chitiet.ID_Mau",
                foreignField: "_id",
                as: "mau"
            }
        }], function(err, dienthoai){
            if(!err){
                var thongtin;
                var truotmau = [];
                dienthoai.forEach(function(dienthoai){
                    if(dienthoai._id==iddt && dienthoai.chitiet._id==idct){
                        thongtin = dienthoai;
                    }
                    if(dienthoai._id==iddt){
                        truotmau.push(dienthoai);
                    }
                });
                res.render("Product/chitietsp", 
                {   truotmau: truotmau, 
                    thongtin: thongtin,
                    cookie:req.cookies.user,
                    admin:req.session.admin,});
            }
        })
    }

    // Load giỏ hàng
    LoadCart(req,res){
        var connection = require('../connection');
        var detail_id = req.body.data;
        chitietModel.aggregate([
            {
                $lookup:{
                    "from": "mobiles",
                    "localField": "ID_DT",
                    "foreignField": "_id",
                    "as": "result",
                }
            },
            {
                "$unwind": "$result"
            },
            {
                $lookup:{
                    "from": "rams",
                    "localField": "ID_Ram",
                    "foreignField": "_id",
                    "as": "result_ram",
                }
            },
            {
                "$unwind": "$result_ram"
            },
            {
                $lookup:{
                    "from": "roms",
                    "localField": "ID_Rom",
                    "foreignField": "_id",
                    "as": "result_rom",
                }
            },
            {
                "$unwind": "$result_rom"
            },
            {
                $lookup:{
                    "from": "colors",
                    "localField": "ID_Mau",
                    "foreignField": "_id",
                    "as": "result_color",
                }
            },
            {
                "$unwind": "$result_color"
            },
            {
                $project:{
                    _id:1,
                    Hinh_M:1,
                    Giaban_DT:1,
                    "result":{
                        Ten_DT:1,
                    },
                    "result_ram":{
                        Ram:1,
                    },
                    "result_rom":{
                        Rom:1,
                    },
                    "result_color":{
                        Mau:1,
                    }
                }
            },
            {
                $match : {
                    _id : ObjectID(detail_id),
                }
            }]).exec(function(err,data){
                if(err) return console.log(err);
                if(data){
                    return res.json({data:data[0]});
                }
                else{
                    return res.json({data:""});
                }
            });
    }
    // Kiểm tra số lượng
    Checkquantity(req,res){
        var p_id = req.body.p_id;
        var p_quantity = req.body.p_quantity;
        chitietModel.findOne({_id:p_id},function(err,data){
            if(err){
                return res.json({mess:"failed"});
            } 
            if(!data){
                return res.json({mess:"failed"});
            } 
            else{
                var storage_quantity = data.Soluong_DT;
                if(storage_quantity < p_quantity){
                    return res.json({mess:"out-"+storage_quantity});
                }
                return res.json({mess:'success'});
            }
        });
    }
    // Lấy tổng giá đơn hàng
    Gettotal(req,res){
        var p_id = req.body.p_id;
        var p_quantity = req.body.p_quantity;
        chitietModel.findOne({_id:ObjectId(p_id)},function(err,data){
            if(err) return res.json({mess:'failed'});
            if(data){
                var price = p_quantity * data.Giaban_DT;
                return res.json({mess:price});
            }
            else{
                return res.json({mess:'failed'});
            }
        });
    }
    Saveorder(req,res){
        var id_product = req.body.id_product;
        var quantity = req.body.quantity;
        var total = req.body.total;
        var payment_type = req.body.payment_type;
        var index = req.body.index;
        var id_order = req.body.id_order;
        var paymentID = ObjectId('607c26c43cce6d3b10c4ec32');
        if(payment_type == 0){
            paymentID = ObjectId('607c26c43cce6d3b10c4ec32');
        }
        else{
            paymentID = ObjectId('607c26d6f3a59e355c9d8202');
        }
        if(index == 0){
            var Donhang = new donhangModel({
                Tongtien:total,
                Trangthai_DH : 'Chưa xác nhận',
                Ngaylap_DH: Date.now(),
                ID_HTTT: paymentID,
                Taikhoan_USER: req.session.user,
            });
            Donhang.save(function(err,data){
                if(err) return res.json({mess:'failed'});
                if(data){
                        chitietModel.findOne({_id:id_product},function(err1,result){
                            if(err1) return  res.json({mess:'failed'});
                            if(result){
                                result.Soluong_DT = result.Soluong_DT - quantity;
                                result.save(function(error,content){
                                    if(error) return  res.json({mess:'failed'});
                                    var price = quantity * result.Giaban_DT;
                                    var chitietDH = new chitietdonhangModel({
                                        Soluong : quantity,
                                        Thanhtien : price,
                                        ID_DH:ObjectId(data._id),
                                        ID_CTDT: ObjectId(id_product),
                                    });
                                    chitietDH.save(function(err2,final){
                                        if(err2) return res.json({mess:'failed'});
                                        if(final){
                                            return res.json({mess:'success',id_order:data._id}); 
                                        }
                                    });
                                });
                            }
                        });
                }
                
            });
        }
        else{
            chitietModel.findOne({_id:id_product},function(err1,result){
                if(err1) return  res.json({mess:'failed'});
                if(result){
                    result.Soluong_DT = result.Soluong_DT - quantity;
                    result.save(function(error,content){
                        if(error) return  res.json({mess:'failed'});
                        var price = quantity * result.Giaban_DT;
                        var chitietDH = new chitietdonhangModel({
                            Soluong : quantity,
                            Thanhtien : price,
                            ID_DH:ObjectId(id_order),
                            ID_CTDT: ObjectId(id_product),
                        });
                        chitietDH.save(function(err2,final){
                            if(err2) return res.json({mess:'failed'});
                            if(final){
                                return res.json({mess:'success'}); 
                            }
                        });
                    });
                }
            });
        }
    }
}

module.exports = new ProductController;