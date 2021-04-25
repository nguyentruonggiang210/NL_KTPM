var express = require("express");
var multer = require("multer");
var router = express.Router();

var productControl = require("../controller/productController");
//hien thi form
router.get("/add", function(req, res){
    productControl.form(req, res);
});



//Lay thong so
router.get("/thongso/:madt", function(req, res){
    productControl.layts(req, res);
});

module.exports = router;