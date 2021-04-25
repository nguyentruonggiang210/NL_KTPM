var express = require('express')
var app = express.Router();
var ProductHandler = require('../Handler/ProductHandler');
var multer = require("multer");

function product_router(app){
    // Hiển thị form
    app.get('/admin/productmanagement',ProductHandler.DisplayForm);
    //xu ly them dienthoai
    var storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "./public/images/mobiles/");
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
    var upload = multer({storage: storage});
    app.post("/admin/addproduct", upload.fields([{name: "hinhmota", maxCount: 10}, {name: "hinhmau", maxCount: 10}]), function(req, res){
        ProductHandler.AddProduct(req, res);
    });
    // Lâý thông số
    app.get("/admin/getdetail/:madt", function(req, res){
        ProductHandler.GetProductDetail(req, res);
    });
    // Tìm kiếm
    app.post("/handler/search",ProductHandler.SearchProduct);
    // Load cart
    app.post('/handler/load_cart',ProductHandler.LoadCart);
    // check quantity
    app.post('/handler/checkquantity',function(req,res){
        ProductHandler.Checkquantity(req,res);
    });
    // get total
    app.post('/handler/gettotal',ProductHandler.Gettotal);
    // save order
    app.post('/handler/saveorder',ProductHandler.Saveorder);
}
module.exports = product_router;