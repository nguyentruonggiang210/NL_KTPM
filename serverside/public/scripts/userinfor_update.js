var shouldSubmit = false;
function change(obj){
    obj.change(function(){
        shouldSubmit = true;
    });
}
change($('#user_infor_image'));
change($('#user_infor_name'));
change($('#user_infor_tel'));
change($('#user_infor_email'));
change($('#user_infor_address'));
change($('input[type=radio][name=infor_gender]'));
change($('#infor_date'));
change($('#infor_month'));
change($('#infor_year'));

$('#user_infor_form').on('submit',function(e) {
    e.preventDefault();
    if(shouldSubmit){
        var user_name = $('#user_infor_name').val();
        var date = $('#infor_date option:selected').val();
        var month = $('#infor_month option:selected').val();
        var year = $('#infor_year option:selected').val();
        var user_date = year + "-" + month + "-" + date;
        var user_gender = $('input[name="infor_gender"]:checked').val();
        var user_address = $('#user_infor_address').val();
        var user_tel = $('#user_infor_tel').val();
        var user_email = $('#user_infor_email').val();
        var user_image = document.getElementById('user_infor_image').files[0];
        var data = new FormData();
        data.append('user_name',user_name);
        data.append('user_date',user_date);
        data.append('user_gender',user_gender);
        data.append('user_address',user_address);
        data.append('user_tel',user_tel);
        data.append('user_email',user_email);
        data.append('user_image', user_image);

        $.ajax({
            method : 'POST',
            url:'/user/update_infor',
            data:data,
            processData: false,
            contentType: false,
            success: (data)=>{
                if(data.mess == "Success"){
                    window.location.href = "/user/information/user_info";
                }
                else{
                    alert("Cập nhật thất bại");
                }
            },
            error : (err)=>{
                console.log(err);
            }
        });
    }
    else{
        alert("Không có điều gì thay đổi hết cả");
    }
});