// ngày
for(var i = 1; i <= 31;i++){
    var option = document.createElement("option");
    option.text  = "Ngày "+String(i);
    option.value = String(i);
    var date_select = document.getElementById("select_date");
    date_select.appendChild(option);
}
// tháng
for(var i = 1; i <= 12;i++){
    var option = document.createElement("option");
    option.text  = "Tháng "+String(i);
    option.value = String(i);
    var date_select = document.getElementById("select_month");
    date_select.appendChild(option);
}
// năm
var today = new Date(); 
for(var i = today.getFullYear(); i >= 1940;i--){
    var option = document.createElement("option");
    option.text  = "Năm "+String(i);
    option.value = String(i);
    var date_select = document.getElementById("select_year");
    date_select.appendChild(option);
}

// Handler list detail and logout

function DisplayInforLogout(){
    var display = $('#infor_logout_list').css('display');
    if(display == "none"){
        $('#infor_logout_list').css('display','block');
    }
    else{
        $('#infor_logout_list').css('display','none');
    }
   
}