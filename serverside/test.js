const connect = require('./connection');
const payment = require('./models/HinhthucthanhtoanModel');

var Payment = new payment({
    Hinhthuc_TT : 'Thanh toán bằng ví điện tử',
});
Payment.save(function(err,user){
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
}); 