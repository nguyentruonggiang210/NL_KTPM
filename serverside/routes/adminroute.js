var AdminHandler = require('../Handler/AdminHandler');
var bodyParser = require('body-parser');
var User = require('../models/User');
var History = require('../models/HistoryUpdateRole');
var Order = require('../models/donhangModel');
var OrderDetail = require('../models/chitietdonhangModel');
function adminroute(app){
    // change role
    app.post('/admin/changerole', bodyParser.urlencoded(), AdminHandler.AdminChangeRole);
    // delete account
    app.post('/admin/deleteaccount',bodyParser.urlencoded(),AdminHandler.DeleteAccount);
     // account management
    app.get('/admin/accountmanagement',function(req,res){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if(req.session.admin != '0'){
            res.redirect('http://127.0.0.1:3000/');
        }
        else{
            User.find({},function(err,data){
                if(err) return console.log(err);
                if(data){
                    // find admin
                    admin_arr = [];
                    for(var i = 0 ; i < data.length;i++){
                        if(data[i].ID_Loai_TK.toString() == "606d13b624b4e921544f7d61"){
                            admin_arr.push(true);
                        }
                        else{
                            admin_arr.push(false);
                        }
                    }

                    // render history
                    History.find({}).sort({Thoigian_thaydoi:'desc'}).exec((err,docs)=>{
                        if(err) return console.log(err);
                        if(docs){
                            res.render('Admin/admin_permission',{
                                cookie:req.cookies.user,
                                admin:req.session.admin,
                                object:data,
                                admin_arr:admin_arr,
                                current_user:req.session.user,
                                history:docs,
                            });
                        }
                    });
                }
            });
        }
    });
    // admin order management
    app.get('/admin/displayorder',function(req,res){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if(req.session.admin != '0' && req.session.admin != '1'){
            return res.redirect('http://127.0.0.1:3000/');
        }
        else{
            Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "Taikhoan_USER",
                    foreignField: "Taikhoan_TK",
                    as: "user"
                },
            },
            {
                $unwind: "$user"
            },
            {
                $lookup: {
                    from: "paymenttypes",
                    localField: "ID_HTTT",
                    foreignField: "_id",
                    as: "paymenttype"
                },
            },
            {
                $unwind: "$paymenttype"
            },
            {
                $sort: { Ngaylap_DH: -1 }
            }
            ]).exec(function(err,data){
                if(err){
                    console.log(err);
                    return res.render('Admin/order_management',{
                        cookie:req.cookies.user,
                        admin:req.session.admin,
                        order:[],
                    });
                }
                if(data){
                    return res.render('Admin/order_management',{
                        cookie:req.cookies.user,
                        admin:req.session.admin,
                        order:data,
                    });
                }
                else{
                    return res.render('Admin/order_management',{
                        cookie:req.cookies.user,
                        admin:req.session.admin,
                        order:[],
                    });
                }
            });
          
        }
    });
    // admin get order detail
    app.post('/admin/handler/getorderdetail',function(req,res){
        AdminHandler.GetOrderDetail(req,res);
    });
    // admin get mobile detail from order detail
    app.post('/admin/handler/getmobiledetail',function(req,res){
        AdminHandler.GetMobileDetail(req,res);
    });
    // valid order
    app.put('/admin/handler/checkorder',function(req,res){
        AdminHandler.ValidOrder(req,res);
    })
    // delete order
    app.delete('/admin/handler/deleteorder',function(req,res){
        AdminHandler.DeleteOrder(req,res);
    });
    // delete order detail
    app.delete('/admin/handler/deleteorderdetail',function(req,res){
        AdminHandler.DeleteOrderDetail(req,res);
    });

}
module.exports = adminroute;