function AddCart(obj){
    var p_id = $(obj).attr("key");
    function checkID(product) {
        return product === p_id;
    }
    var arr_product = JSON.parse($.cookie('products'));
    var arr_quantity =  JSON.parse($.cookie('quantity'));
    var index = arr_product.findIndex(checkID);
    if(index === -1){
        arr_product.push(p_id);
        arr_quantity.push(1);
        $.cookie('products', JSON.stringify(arr_product),{ expires: 7, path: '/'});
        $.cookie('quantity', JSON.stringify(arr_quantity),{ expires: 7, path: '/'});
    }
    else{
        arr_quantity[index] += 1;
        $.cookie('quantity', JSON.stringify(arr_quantity))
    }
    $('.cart_icon span').html(arr_quantity.length);
    alert("Thêm thành công");
}