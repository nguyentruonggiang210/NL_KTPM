
var User = require('../models/User');
var UserType = require('../models/UserType');

function checkAdmin(Taikhoan_TK,callback){

    User.findOne({
        Taikhoan_TK:Taikhoan_TK,
    },function(err,result){
        if(err){
            callback(err,null);
        }
        if(result){
            callback(null,result);
        }
        else{
            callback(err,null);
        }
    });
    return;
}

function getUserType(Taikhoan_TK,callback){
    checkAdmin(Taikhoan_TK,function(err,result){
        if(err){
            callback(err,null);
        }
        if(result){
            UserType.findById(result.ID_Loai_TK,function(err,data){
                if(err){
                    callback(err,null);
                }
                if(data){
                    callback(null,data);
                }
                else{
                    callback(err,null);
                }
            });
        }
    });
}

function getUserTypeMain(req,res,Taikhoan_TK){
    getUserType(Taikhoan_TK,function(err,data){
        if(err) return err;
        if(data){
            if(data.Tenloai_TK == "Admin"){
                req.session.admin = 0;
            }
            else if(data.Tenloai_TK == "Nhân viên"){
                req.session.admin = 1;
            }
            else{
                req.session.admin = 2;
            }
        }
        else{
            req.session.admin = 2;
        }
        req.session.save();
    });
}
module.exports = getUserTypeMain;