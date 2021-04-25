// check password
var correctPass = false;
$('#change_old_password').change(function(){
    $.ajax({
        method:'POST',
        data:{
            user_password:$(this).val(),
        },
        url:'/user/checkpassword',
        success: (data)=>{
            if(data.mess == "Success"){
                correctPass = true;
                $('#checkpassword').css('color','green');
                $('#checkpassword').html("Hợp lệ");
            }
            else{
                correctPass = false;
                $('#checkpassword').css('color','red');
                $('#checkpassword').html("Mật khẩu không chính xác");
            }
        },
        error : (err)=>{
            console.log(err);
        }
    });
});
var correctcfpass = false;
$('#change_cf_new_password').change(function(){
    if($(this).val() == $('#change_new_password').val()){
        correctcfpass = true;
        $('#checkcfpassword').css('color','green');
        $('#checkcfpassword').html("Hợp lệ");
    }
    else{
        correctcfpass = false;
        $('#checkcfpassword').css('color','red');
        $('#checkcfpassword').html("Mật khẩu không khớp");
    }
});

$('#change_new_password').change(function(){
    if($(this).val() == $('#change_cf_new_password').val()){
        correctcfpass = true;
        $('#checkcfpassword').css('color','green');
        $('#checkcfpassword').html("Hợp lệ");
    }
    else{
        correctcfpass = false;
        $('#checkcfpassword').css('color','red');
        $('#checkcfpassword').html("Mật khẩu không khớp");
    }
});

// submit
$('#user_changepass_form').on('submit',function(e){
    e.preventDefault();
    if(correctPass && correctcfpass){
        $.ajax({
            method : 'POST',
            url : '/user/changepassword/',
            data:{
                user_password: $('#change_new_password').val(),
            },
            success: (data)=>{
                if(data.mess == "Success"){
                    alert("Thành công");
                    window.location.href = "/user/information/user_info";
                }
                else{
                    alert("Thất bại");
                }
            },
            error : (err)=>{
                alert("Thất bại");
                console.log(err);
            }
        });
    }
    else{
        alert("Chắc chắn bạn đã đáp ứng đủ các điều kiện");
    }
    
})