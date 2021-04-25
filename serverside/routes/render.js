var express = require('express')
var app = express.Router();
var Classhandler = require('../Handler/UserHandler');
var User = require('../models/User');
var History = require('../models/HistoryUpdateRole');
var request = require('request');
var dienthoaiModel = require("../models/dienthoaiModel");
var thongsoModel = require("../models/thongsoModel");
var chitietModel = require("../models/chitietdtModel");
var hangModel = require("../models/hangModel");
var ObjectId = require('mongodb').ObjectID;
const ProductHandler = require('../Handler/ProductHandler');
var donhangModel = require('../models/donhangModel');
var chititetdonhangModel = require('../models/chitietdonhangModel');
function route(app){
    // render home page
    app.get('/', function (req, res) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        var val = req.cookies.user;
        if(val != null){
            res.render('home',{cookie:val,admin:req.session.admin});
            return;
        }
        else{
            res.render('home',{cookie:null,admin:req.session.admin});
            return;
        }
        
    });
    // render category page

    app.get('/category', function (req, res) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        var connection = require('../connection');
        var val = req.cookies.user;
       
        dienthoaiModel.aggregate([{
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
                $lookup: {
                    "from": "specifications",
                    "localField": "ID_TS",
                    "foreignField": "_id",
                    "as": "result_array_detail"
                }
            },
            {
                "$unwind": "$result_array_detail"
            },
            {
                $project:{
                    _id:1,
                    Ten_DT:1,
                    "result_array":{
                        Giaban_DT: 1,
                        Hinh_M: 1,
                        _id:1,
                    },
                    "result_array_detail":{
                        Camtruoc:1,
                        Camsau:1,
                        CPU:1,
                        Pin:1,
                        _id:1,
                    },
                }
            }
        ]).exec(function(err,data){
            if(err) return console.log(err);
            if(data){
                var temp_data = []
                for(var i = 0;i < data.length;i++){
                    data[i].result_array.Giaban_DT = data[i].result_array.Giaban_DT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    if(i == 0){
                        temp_data.push(data[i]);
                    }
                    else{
                        var p_name = data[i].Ten_DT;
                        var stt = true;
                        for(var j = 0;j < temp_data.length;j++){
                            if(p_name === temp_data[j].Ten_DT) stt = false;
                        }
                        if(stt){
                            temp_data.push(data[i]);
                        }
                    }
                }
                res.render('category',{
                    cookie:req.cookies.user,
                    admin:req.session.admin,
                    obj:temp_data});
                return;
            }
            else{
                res.render('category',{cookie:req.cookies.user,
                    admin:req.session.admin,
                    obj:null})
                return;
            }
        });
        
    });

    // render category with filter 
    app.get('/category/:brand/:price/:pin',function(req,res){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        var connection = require('../connection');
        var brand = req.params.brand;
        var price = req.params.price;
        var pin = req.params.pin;
        var query_price = {};
        var query_pin = {};
        if(brand === "brand_all"){
            var main_query = [
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
                $lookup: {
                    "from": "specifications",
                    "localField": "ID_TS",
                    "foreignField": "_id",
                    "as": "result_array_detail",
                    
                }
            },
            {
                "$unwind": "$result_array_detail"
            },
            {
                $project:{
                    _id:1,
                    Ten_DT:1,
                    "result_array":{
                        Giaban_DT: 1,
                        Hinh_M: 1,
                        _id:1,
                    },
                    "result_array_detail":{
                        Camtruoc:1,
                        Camsau:1,
                        CPU:1,
                        Pin:1,
                        _id:1,
                    },
                }
            }]
            if(price === "price_under"){
                query_price = {
                    $match:{
                        "result_array.Giaban_DT":{$lt:5000000},
                    }
                }
                main_query.push(query_price);
            }
            else if(price === "price_average"){
                query_price = {
                    $match:{
                        $and:[
                            {
                                "result_array.Giaban_DT":{$gte:5000000}
                            },
                            {
                                "result_array.Giaban_DT":{$lte:10000000}
                            }
                        ]
                    }
                }
                main_query.push(query_price);
            }
            else if(price === "price_above"){
                query_price = {
                    $match:{
                        "result_array.Giaban_DT":{$gt:10000000},
                    }
                }
                main_query.push(query_price);
            }
            if(pin === "pin_under"){
                query_pin = {
                    $match:{
                        "result_array_detail.Pin":{$lt:3000},
                    }
                }
                main_query.push(query_pin);
            }
            else if(pin === "pin_average"){
                query_pin = {
                    $match:{
                        $and:[
                            {
                                "result_array_detail.Pin":{$gte:3000}
                            },
                            {
                                "result_array_detail.Pin":{$lte:4000}
                            }
                        ]
                    }
                }
                main_query.push(query_pin);
            }
            else if(pin === "pin_above"){
                query_pin = {
                    $match:{
                        "result_array_detail.Pin":{$gt:4000},
                    }
                }
                main_query.push(query_pin);
            }
            dienthoaiModel.aggregate(main_query).exec(function(err,data){
                if(err) return console.log(err);
                if(data){
                    var temp_data = []
                    for(var i = 0;i < data.length;i++){
                        data[i].result_array.Giaban_DT = data[i].result_array.Giaban_DT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        if(i == 0){
                            temp_data.push(data[i]);
                        }
                        else{
                            var p_name = data[i].Ten_DT;
                            var stt = true;
                            for(var j = 0;j < temp_data.length;j++){
                                if(p_name === temp_data[j].Ten_DT) stt = false;
                            }
                            if(stt){
                                temp_data.push(data[i]);
                            }
                        }
                    }
                    res.render('category',{
                        cookie:req.cookies.user,
                        admin:req.session.admin,
                        obj:temp_data});
                    return;
                }
                else{
                    res.render('category',{cookie:req.cookies.user,
                        admin:req.session.admin,
                        obj:[]})
                    return;
                }
            });
            return;
        }
        hangModel.findOne({Ten_H:brand},function(err,data){
            if(err) return console.log(err);
            if(data){
                var ID_H = data._id;
                var main_query = [{
                    $match:{
                        ID_H:ObjectId(ID_H),
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
                    $lookup: {
                        "from": "specifications",
                        "localField": "ID_TS",
                        "foreignField": "_id",
                        "as": "result_array_detail",
                        
                    }
                },
                {
                    "$unwind": "$result_array_detail"
                },
                {
                    $project:{
                        _id:1,
                        Ten_DT:1,
                        "result_array":{
                            Giaban_DT: 1,
                            Hinh_M: 1,
                            _id:1,
                        },
                        "result_array_detail":{
                            Camtruoc:1,
                            Camsau:1,
                            CPU:1,
                            Pin:1,
                            _id:1,
                        },
                    }
                }]
                if(price === "price_under"){
                    query_price = {
                        $match:{
                            "result_array.Giaban_DT":{$lt:5000000},
                        }
                    }
                    main_query.push(query_price);
                }
                else if(price === "price_average"){
                    query_price = {
                        $match:{
                            $and:[
                                {
                                    "result_array.Giaban_DT":{$gte:5000000}
                                },
                                {
                                    "result_array.Giaban_DT":{$lte:10000000}
                                }
                            ]
                        }
                    }
                    main_query.push(query_price);
                }
                else if(price === "price_above"){
                    query_price = {
                        $match:{
                            "result_array.Giaban_DT":{$gt:10000000},
                        }
                    }
                    main_query.push(query_price);
                }
                if(pin === "pin_under"){
                    query_pin = {
                        $match:{
                            "result_array_detail.Pin":{$lt:3000},
                        }
                    }
                    main_query.push(query_pin);
                }
                else if(pin === "pin_average"){
                    query_pin = {
                        $match:{
                            $and:[
                                {
                                    "result_array_detail.Pin":{$gte:3000}
                                },
                                {
                                    "result_array_detail.Pin":{$lte:4000}
                                }
                            ]
                        }
                    }
                    main_query.push(query_pin);
                }
                else if(pin === "pin_above"){
                    query_pin = {
                        $match:{
                            "result_array_detail.Pin":{$gt:4000},
                        }
                    }
                    main_query.push(query_pin);
                }
                dienthoaiModel.aggregate(main_query).exec(function(err,data){
                    if(err) return console.log(err);
                    if(data){
                        var temp_data = []
                        for(var i = 0;i < data.length;i++){
                            data[i].result_array.Giaban_DT = data[i].result_array.Giaban_DT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                            if(i == 0){
                                temp_data.push(data[i]);
                            }
                            else{
                                var p_name = data[i].Ten_DT;
                                var stt = true;
                                for(var j = 0;j < temp_data.length;j++){
                                    if(p_name === temp_data[j].Ten_DT) stt = false;
                                }
                                if(stt){
                                    temp_data.push(data[i]);
                                }
                            }
                        }
                        res.render('category',{
                            cookie:req.cookies.user,
                            admin:req.session.admin,
                            obj:temp_data});
                        return;
                    }
                    else{
                        res.render('category',{cookie:req.cookies.user,
                            admin:req.session.admin,
                            obj:[]})
                        return;
                    }
                });
            }
            else{
                res.render('category',{cookie:req.cookies.user,
                    admin:req.session.admin,
                    obj:[]})
                return;
            }
        });
    });

    //  render user information page
    app.get('/user/information/:display_infor',function(req,res){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        var val = req.cookies.user;
        if(val == null){
            res.redirect('http://localhost:3000/');
            return;
        }
        const connect = require('../connection');
        User.findOne({
            Taikhoan_TK : req.session.user,
        },function(err,result){
            if(err) return console.log(err);
            if(result){
                var date = result.Ngaysinh_nguoidung;
                var display_infor = req.params.display_infor;
                if(display_infor == "user_info"){
                    res.render("information",{
                        cookie:req.cookies.user,
                        admin:req.session.admin,
                        obj:result,
                        date:date.getDate(),
                        month:date.getMonth() + 1,
                        year:date.getFullYear(),
                        type:0,
                    });
                    return;
                }
                else if(display_infor=="change_password"){
                    res.render("information",{
                        cookie:req.cookies.user,
                        admin:req.session.admin,
                        obj:result,
                        date:date.getDate(),
                        month:date.getMonth() + 1,
                        year:date.getFullYear(),
                        type:1,
                    });
                    return;
                }
                else if(display_infor == "history"){
                    donhangModel.find({
                        Taikhoan_USER: req.session.user,
                    }).exec(function(err,data){
                        if(err){
                            console.log(err);
                            return res.render("information",{
                                cookie:req.cookies.user,
                                admin:req.session.admin,
                                obj:result,
                                date:date.getDate(),
                                month:date.getMonth() + 1,
                                year:date.getFullYear(),
                                type:2,
                                data: [],
                            });
                        }
                        if(data){
                            return res.render("information",{
                                cookie:req.cookies.user,
                                admin:req.session.admin,
                                obj:result,
                                date:date.getDate(),
                                month:date.getMonth() + 1,
                                year:date.getFullYear(),
                                type:2,
                                data: data,
                            });
                        }
                        else{
                            return res.render("information",{
                                cookie:req.cookies.user,
                                admin:req.session.admin,
                                obj:result,
                                date:date.getDate(),
                                month:date.getMonth() + 1,
                                year:date.getFullYear(),
                                type:2,
                                data: [],
                            });
                        }
                    });
                }
            }
            else{
                res.redirect('http://127.0.0.1:3000/');
            }
        });
      
    });

    // cart page
    app.get('/cart',function(req,res){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('cart',{
            cookie:req.cookies.user,
            admin:req.session.admin,
        });
    });
    //
    app.get("/product/detail/:tendt", function(req,res){
        ProductHandler.detail(req,res);
    });
}
module.exports = route;