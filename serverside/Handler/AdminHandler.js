var User = require('../models/User');
var HistoryUpdateRole = require('../models/HistoryUpdateRole');
var donhangModel = require('../models/donhangModel');
var ObjectId = require('mongodb').ObjectID;
var chitietdonhangModel = require('../models/chitietdonhangModel');
var chitietdienthoai = require('../models/chitietdtModel');
var dienthoai = require('../models/dienthoaiModel');
class AdminHandler{
    AdminChangeRole(req,res){
        var user_changed = req.body.user_id;
        var user_role = req.body.user_role;
        
        User.findOne({Taikhoan_TK:user_changed},function(error,result){
            if(error) return console.log(err);
            if(result){
                var ID_Loai_TK = null;
                if(user_role == "Nhân viên"){
                    ID_Loai_TK = ObjectId("606d13b624b4e921544f7d61");
                }
                else{
                    ID_Loai_TK = ObjectId("606d13c4b66f9e4e4815af98");
                }
                result.ID_Loai_TK = ID_Loai_TK;
                result.save(function(err){
                    if(err) return console.log(err);
                    else{
                        // Luu lich su
                        var change_content = "";
                        if(user_role == "Nhân viên"){
                            change_content = "Cấp quyền nhân viên";
                        }
                        else{
                            change_content = "Xóa quyền nhân viên";
                        }
                        var history = new HistoryUpdateRole({
                            Taikhoan_User:user_changed,
                            Noidung_thaydoi:change_content,
                            Thoigian_thaydoi:Date.now(),
                        });
                        history.save(function(err1,data){
                            if(err1){
                                res.json({mess:"Failed"});
                                return console.log(err1);
                            } 
                            res.json({mess:"Success"});
                        });
                    }
                });
            }
        });
    }

    DeleteAccount(req,res){
        var user_id = req.body.user_id;
        User.deleteOne({Taikhoan_TK:user_id},function(err){
            if(err){
                res.json({mess:"failed"});
                return console.log(err);
            }
            
            var history = new HistoryUpdateRole({
                Taikhoan_User:user_id,
                Noidung_thaydoi:"Xóa tài khoản",
                Thoigian_thaydoi:Date.now(),
            });
            history.save(function(err,data){
                if(err) return console.log(err);
                res.json({mess:"success"});
                return;
            });
            
        });
    }

    GetOrderDetail(req,res){
        var id_order = req.body.id_order;
        chitietdonhangModel.aggregate([
            {
                $match:{ ID_DH: ObjectId(id_order) }
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "ID_DH",
                    foreignField: "_id",
                    as: "order"
                },
            },
            {
                $unwind: "$order"
            },
            {
                $lookup: {
                    from: "mobiledetails",
                    localField: "ID_CTDT",
                    foreignField: "_id",
                    as: "mobiledetail"
                },
            },
            {
                $unwind: "$mobiledetail"
            }
        ]).exec(function(err,data){
            if(err){
                console.log(err);
                return res.json({
                    data:[],
                });
            }
            if(data){
                return res.json({
                    data:data,
                });
            }
            else{
                return res.json({
                    data:[],
                });
            }
        });
    }

    GetMobileDetail(req,res){
        var ID_DT = req.body.ID_DT;
        dienthoai.findOne({
            _id:ID_DT
        }).exec(function(err,data){
            if(err){
                console.log(err);
                return res.json({data:{}});
            }
            if(data){
                return res.json({data:data});
            }
            else{
                return res.json({data:{}});
            }
        });
    }

    ValidOrder(req,res){
        var id_order = req.body.id_order;
        var status = req.body.status;
        if(status == 'true' || status == true){
            donhangModel.findOne({
                _id:ObjectId(id_order),
            }).exec(function(err,data){
                if(err){
                    console.log(err);
                    return res.json({mess:'failed'});
                }
                if(data){
                    data.Trangthai_DH = 'Đã xác nhận';
                    data.save(function(err1){
                        if(err1){
                            console.log(err);
                            return res.json({mess:'failed'});
                        }
                        return res.json({mess:'success'});
                    });
                }
                else{
                    return res.json({mess:'failed'});
                }
            });
        }
        else{
            donhangModel.findOne({
                _id:ObjectId(id_order),
            }).exec(function(err,data){
                if(err){
                    console.log(err);
                    return res.json({mess:'failed'});
                }
                if(data){
                    data.Trangthai_DH = 'Chưa xác nhận';
                    data.save(function(err1){
                        if(err1){
                            console.log(err);
                            return res.json({mess:'failed'});
                        }
                        return res.json({mess:'success'});
                    });
                }
                else{
                    return res.json({mess:'failed'});
                }
            });
        }
        
    }

    DeleteOrder(req,res){
        var id_order = req.body.id_order;
        donhangModel.remove({
            _id: ObjectId(id_order)
        },function(err){
            if(err) return res.json({mess:'failed'});
            else{
                return res.json({mess:'success'});
            }
        });
    }

    DeleteOrderDetail(req,res){
        var id_order = req.body.id_order;
        chitietdonhangModel.remove({
            ID_DH: ObjectId(id_order)
        },function(err){
            if(err) return res.json({mess:'failed'});
            else{
                return res.json({mess:'success'});
            }
        });
    }
}
module.exports = new AdminHandler;