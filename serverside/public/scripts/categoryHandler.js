
function handlerMouseOver(obj){
    $(obj).find($("button")).css("visibility","visible");
    
}
function handlerMouseOut(obj){
    $(obj).find($("button")).css("visibility","hidden");
}

var brand = "brand_all";
var price = "price_all";
var pin = "pin_all";

var url_string = window.location.href;
url_arr = url_string.split("/");
if(url_arr.length==7){
    brand = url_arr[4];
    price = url_arr[5];
    pin = url_arr[6];
    $('input[value="'+price+'"]').attr('checked','checked');
    $('input[value="'+pin+'"]').attr('checked','checked');
}
else{
    $('input[value="price_all"]').attr('checked','checked');
    $('input[value="pin_all"]').attr('checked','checked');
}

$( document ).ready(function(event) {
    $(".checkbox_price").click(function() {
        if($(this).is(":checked")){ 
            price = $(this).val();
            window.location.href = "/category/"+brand+"/"+price+"/"+pin;
        }
        else{
           price = "price_all";
           window.location.href = "/category/"+brand+"/"+price+"/"+pin;
        }
    }); 

    $(".checkbox_pin").click(function() {
        if($(this).is(":checked")){ 
            pin = $(this).val();
            window.location.href = "/category/"+brand+"/"+price+"/"+pin;
        }
        else{
           pin = "pin_all";
           window.location.href = "/category/"+brand+"/"+price+"/"+pin;
        }
    }); 
});