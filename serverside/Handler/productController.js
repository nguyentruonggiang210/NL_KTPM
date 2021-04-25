var mongoose = require("mongoose");

var dienthoaiModel = require("../model/dienthoaiModel");
var thongsoModel = require("../model/thongsoModel");
var chitietModel = require("../model/chitietdtModel");
var hangModel = require("../model/hangModel");
var ramModel = require("../model/ramModel");
var romModel = require("../model/romModel");
var mauModel = require("../model/mauModel");


mongoose.set('useFindAndModify', false);

var thongso = false;

class dienthoaiController{
    //hien thi form add
    form(req, res){
        var hang;
        var ram;
        var rom;
        var mau;
        //find hang
        hangModel.find(function(err, data){
            if(!err){
                hang = data;
                //console.log(hang);
                //find ram
                ramModel.find(function(err, data){
                    if(!err){
                        ram = data;
                        //console.log(ram);
                        //find rom
                        romModel.find(function(err, data){
                            if(!err){
                                rom = data;
                                //console.log(rom);
                                //find mau
                                mauModel.find(function(err, data){
                                    if(!err){
                                        mau = data;
                                        //console.log(mau);
                                        res.render("addPro", {hang: hang, ram: ram, rom: rom, mau: mau});
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
    layts(req, res){
        var madt = req.params.madt;
        dienthoaiModel.findOne({Ma_DT: madt}, function(err, dienthoai){
            if(!err){
                if(dienthoai){
                    hangModel.find(function(err, hang){
                        if(!err){
                            //console.log(dienthoai.ID_H);
                            var idh = dienthoai.ID_H.toString(); 
                            var idthongso = dienthoai.ID_TS;
                            var mota = dienthoai.Mota_DT.join("*");
                            thongsoModel.findOne({_id: idthongso}, function(err, thongso){
                                res.render("thongsoPro", {thongso: thongso, dienthoai: dienthoai, mota: mota, hang:hang, idh: idh});
                            })
                        }
                    })
                    
                }
                 
            }
            else{
               console.log("Co loi");
            }
        })
        
    };

    //add dienthoai
    add(req, res){
        //kiem tra xem da co dien thoai trong DB chua
        dienthoaiModel.findOne({Ma_DT: req.body.madt}, function(err, data){
            if(!err){
                if(!data){//neu chua co dien thoai
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
                                duongdan.push("/images/"+hinh.filename);
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
                                    //res.send(dienthoai);
                                    //console.log(dienthoai);
                                    var soluong = req.body.soluong;
                                    soluong = parseInt(soluong);
                                    var giamua = req.body.giamua;
                                    giamua = parseInt(giamua);
                                    var giaban = req.body.giaban;
                                    giaban = parseInt(giaban);
                                    var hinhmau = req.files.hinhmau;
                                    var duongdan2 = [];
                                    hinhmau.forEach(function(hinh){
                                        duongdan2.push("/images/"+hinh.filename);
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
                                            res.redirect("./list");
                                        }
                                    })
                                }
                            });
                        }
                    })
                }
                else{//neu da co dt
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
                        duongdan2.push("/images/"+hinh.filename);
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
                            res.redirect("./list");
                        }
                    })
                }
            }
        })
        

        
        
    };

    //list
    list(req, res){
        chitietModel.aggregate([
        {
            $lookup:{
                from: "mobiles",
                localField: "ID_DT",
                foreignField: "_id",
                as: "dienthoai"
            }
        },
        {
            $lookup:{
                from: "colors",
                localField: "ID_Mau",
                foreignField: "_id",
                as: "mau"
            }
        }], function(err, thongtin){
            if(!err){
                res.render("listPro", {thongtin: thongtin});
                //res.send(thongtin.Nguoinhap_DT);
            
                
            }
            else{
                res.send("loi roi");
            }
        });
        
    };

    //delete
    delete(req, res){
        var iddt = req.params.id;
        chitietModel.findByIdAndDelete(iddt, function(err){
            if(!err){
                res.redirect("../list");
               //res.redirect("/product/list");
            }
        })
    };

    //edit form
    editform(req, res){
        var idct = req.params.id;
        chitietModel.aggregate([
        {
            $lookup:{
                from: "mobiles",
                localField: "ID_DT",
                foreignField: "_id",
                as: "dienthoai"
            }
        },
        {
            $unwind: "$dienthoai"
        },
        {
            $lookup:{
                from: "specifications",
                localField: "dienthoai.ID_TS",
                foreignField: "_id",
                as: "thongso"
            }
        },
        {
            $lookup:{
                from: "brands",
                localField: "dienthoai.ID_H",
                foreignField: "_id",
                as: "hang"
            }
        },
        {
            $lookup:{
                from: "colors",
                localField: "ID_Mau",
                foreignField: "_id",
                as: "mau"
            }
        },
        {
            $lookup:{
                from: "rams",
                localField: "ID_Ram",
                foreignField: "_id",
                as: "ram"
            }
        },
        {
            $lookup:{
                from: "roms",
                localField: "ID_Rom",
                foreignField: "_id",
                as: "rom"
            }
        }],function(err, chitiet){
            if(!err){
                hangModel.find(function(err, hang){
                    if(!err){
                        mauModel.find(function(err, mau){
                            if(!err){
                                ramModel.find(function(err, ram){
                                    if(!err){
                                        romModel.find(function(err, rom){
                                            if(!err){
                                                var thongtin;
                                                chitiet.forEach(function(chitiet){                                                        
                                                    if(chitiet._id==idct){
                                                        thongtin = chitiet;
                                                    }
                                                })
                                                
                                                //res.send(chitiet);
                                                res.render("editPro", {hang: hang, ram: ram, rom: rom, mau: mau, thongtin: thongtin});
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                });             
            }
            else{
                res.send("loi roi");
            }
        });
    };

    //edit
    edit(req, res){
        //cap nhat thong so
        var pin = req.body.pin;
        pin = parseInt(pin);
        thongsoModel.findByIdAndUpdate(req.body.idts, {
            Manhinh: req.body.manhinh,
            Camtruoc: req.body.camtruoc,
            Camsau: req.body.camsau,
            CPU: req.body.cpu,
            Sim: req.body.sim,
            Pin: pin,
            HDH: req.body.hdh
        }, function(err){
            if(!err){
                //cap nhat thong tin dien thoai
                var hinh = req.files.hinhmota; 
                //neu co chon hinh moi
                if(hinh){
                    var duongdan = [];
                    hinh.forEach(function(hinh){
                        duongdan.push("/images/"+hinh.filename);
                    })
                    var chuoi = req.body.mota;
                    var mota = [];
                    mota = chuoi.split("*");
                    dienthoaiModel.findByIdAndUpdate(req.body.iddt, {
                        Ma_DT: req.body.madt,
                        Ten_DT: req.body.tendt,
                        Hinhanh_DT: duongdan,
                        Mota_DT: mota,
                        ID_TS: req.body.idts,
                        ID_H: req.body.hang,
                    }, function(err){
                        if(!err){
                            //res.send(dienthoai);
                            //console.log(dienthoai);
                            var soluong = req.body.soluong;
                            soluong = parseInt(soluong);
                            var giamua = req.body.giamua;
                            giamua = parseInt(giamua);
                            var giaban = req.body.giaban;
                            giaban = parseInt(giaban);
                            var hinhmau = req.files.hinhmau;
                            if(hinhmau){//co hinh mau
                                var duongdan2 = [];
                                hinhmau.forEach(function(hinh){
                                    duongdan2.push("/images/"+hinh.filename);
                                });
                                chitietModel.findByIdAndUpdate(req.body.idct, {
                                    Soluong_DT: soluong,
                                    Giamua_DT: giamua,
                                    Giaban_DT: giaban,
                                    Ngaynhap_DT: req.body.ngaynhap,
                                    Nguoinhap_DT: req.body.nguoinhap,
                                    ID_Ram: req.body.ram,
                                    ID_Rom: req.body.rom,
                                    ID_Mau: req.body.mau,
                                    Hinh_M: duongdan2,
                                    ID_DT: req.body.iddt
                                }, function(err){
                                    if(!err){
                                        res.redirect("./list");
                                    }
                                })
                            }
                            else{//neu khong co hinh mau
                                var soluong = req.body.soluong;
                                soluong = parseInt(soluong);
                                var giamua = req.body.giamua;
                                giamua = parseInt(giamua);
                                var giaban = req.body.giaban;
                                giaban = parseInt(giaban);
                                chitietModel.findByIdAndUpdate(req.body.idct, {
                                    Soluong_DT: soluong,
                                    Giamua_DT: giamua,
                                    Giaban_DT: giaban,
                                    Ngaynhap_DT: req.body.ngaynhap,
                                    Nguoinhap_DT: req.body.nguoinhap,
                                    ID_Ram: req.body.ram,
                                    ID_Rom: req.body.rom,
                                    ID_Mau: req.body.mau,
                                    //khong cap nhat hinh
                                    ID_DT: req.body.iddt
                                }, function(err){
                                    if(!err){
                                        res.redirect("./list");
                                    }
                                })
                            }
                            
                            
                        }
                    });
                }
                else{//neu khong cho hinh moi
                    var chuoi = req.body.mota;
                    var mota = [];
                    mota = chuoi.split("*");
                    dienthoaiModel.findByIdAndUpdate(req.body.iddt, {
                        Ma_DT: req.body.madt,
                        Ten_DT: req.body.tendt,
                        //khong cap nhat hinh mo ta
                        Mota_DT: mota,
                        ID_TS: req.body.idts,
                        ID_H: req.body.hang,
                    }, function(err){
                        if(!err){
                            //res.send(dienthoai);
                            //console.log(dienthoai);
                            var soluong = req.body.soluong;
                            soluong = parseInt(soluong);
                            var giamua = req.body.giamua;
                            giamua = parseInt(giamua);
                            var giaban = req.body.giaban;
                            giaban = parseInt(giaban);
                            var hinhmau = req.files.hinhmau;
                            if(hinhmau){//co hinh mau
                                var duongdan2 = [];
                                hinhmau.forEach(function(hinh){
                                    duongdan2.push("/images/"+hinh.filename);
                                });
                                chitietModel.findByIdAndUpdate(req.body.idct, {
                                    Soluong_DT: soluong,
                                    Giamua_DT: giamua,
                                    Giaban_DT: giaban,
                                    Ngaynhap_DT: req.body.ngaynhap,
                                    Nguoinhap_DT: req.body.nguoinhap,
                                    ID_Ram: req.body.ram,
                                    ID_Rom: req.body.rom,
                                    ID_Mau: req.body.mau,
                                    Hinh_M: duongdan2,
                                    ID_DT: req.body.iddt
                                }, function(err){
                                    if(!err){
                                        res.redirect("./list");
                                    }
                                })
                            }
                            else{//neu khong co hinh mau
                                var soluong = req.body.soluong;
                                soluong = parseInt(soluong);
                                var giamua = req.body.giamua;
                                giamua = parseInt(giamua);
                                var giaban = req.body.giaban;
                                giaban = parseInt(giaban);
                                chitietModel.findByIdAndUpdate(req.body.idct, {
                                    Soluong_DT: soluong,
                                    Giamua_DT: giamua,
                                    Giaban_DT: giaban,
                                    Ngaynhap_DT: req.body.ngaynhap,
                                    Nguoinhap_DT: req.body.nguoinhap,
                                    ID_Ram: req.body.ram,
                                    ID_Rom: req.body.rom,
                                    ID_Mau: req.body.mau,
                                    //khong cap nhat hinh mau
                                    ID_DT: req.body.iddt
                                }, function(err){
                                    if(!err){
                                        res.redirect("./list");
                                    }
                                })
                            }
                        }
                    });
                }
            }
        })
    };

    //detail
    detail(req, res){
        var iddt = req.body.ID_DT; //sua lai thanh req.body.iddt
        var idct = req.body.ID_CT;
        console.log(iddt + " " + idct);
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
                //res.send(thongtin);
                res.render("chitietsp", {truotmau: truotmau, thongtin: thongtin});
            }
        })

        
    };

    // //test
    // test(req, res){
    //     chitietModel.aggregate([
    //         {
    //             $lookup:{
    //                 from: "mobiles",
    //                 localField: "ID_DT",
    //                 foreignField: "_id",
    //                 as: "dienthoai"
    //             },
    //         },
    //         {
    //             $unwind: "$dienthoai"
    //         },
    //         {
    //             $lookup:{
    //                 from: "specifications",
    //                 localField: "dienthoai.ID_TS",
    //                 foreignField: "_id",
    //                 as: "thongso"
    //             }
    //         },
    //         {
    //             $lookup:{
    //                 from: "colors",
    //                 localField: "ID_Mau",
    //                 foreignField: "_id",
    //                 as: "mau"
    //             },
    //         }], function(err, thongtin){
    //             if(!err){
    //                 //res.render("list", {thongtin: thongtin});
    //                 res.send(thongtin);
                
                    
    //             }
    //             else{
    //                 res.send("loi roi");
    //             }
    //         });
    // }
    


}

module.exports = new dienthoaiController;