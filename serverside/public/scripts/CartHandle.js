// Hiển thị tiền
function DisplayPrice(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Bỏ dấu chấm
function RemoveDot(x){
    let temp = x.split(".");
    let result = "";
    for(var i = 0;i < temp.length;i++){
        result += String(temp[i]);
    }
    return result;
}

// Display total price

function DisplayTotalPrice(){
    var total = 0;
    var quantity_arr = document.getElementsByClassName("item_quantity");
    var price_arr = document.getElementsByClassName("item_price");
    for(var i = 0;i < price_arr.length ; i++){
        var original_price = RemoveDot(price_arr[i].innerHTML);
        total += Number(quantity_arr[i].innerHTML) * Number(original_price);
    }
    $('.total_item_price').html(DisplayPrice(total));
}

function RemoveAllChild(id_obj){
    const myNode = document.getElementById(id_obj);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}



