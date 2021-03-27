Res_Click_Button = true;

// check account exist
$('#res_user_id').change(function(){
    var user_id = $(this).val();
    $.ajax({
        method : 'POST',
        url:'/handleCheckAccount',
        data:{
            user_id:user_id,
        },
        success: (data)=>{
            if(data.mess == 'Exist'){
                $("#res_note_user_id").css("display","block");
                $("#res_note_user_id").css("color","red");
                $("#res_note_user_id").text("Tên đăng nhập đã tồn tại!");
                Res_Click_Button = false;
            }
            else if(data.mess == 'OK'){
                $("#res_note_user_id").css("display","block");
                $("#res_note_user_id").css("color","green");
                $("#res_note_user_id").text("Có thể sử dụng tên đăng nhập này!");
                Res_Click_Button = true;
            }
        },
        error : (err)=>{
            console.log(err);
        }
    });
});

$('#res_cf_user_password').change(function(){
    var password = $('#res_user_password').val();
    var cfpassword = $(this).val();
    if(password == cfpassword){
        $('#res_note_user_password').css("display","block");
        $('#res_note_user_password').css("color","green");
        $('#res_note_user_password').text("Hợp lệ!");
        Res_Click_Button = true;
    }
    else{
        $('#res_note_user_password').css("display","block");
        $('#res_note_user_password').css("color","red");
        $('#res_note_user_password').text("Mật khẩu không trùng khớp!");
        Res_Click_Button = false;
    }
});

// Register Handle

$('#res_form').on('submit',function(e) {
    e.preventDefault();
    if(Res_Click_Button){
        var user_id = $('#res_user_id').val();
        var user_pass = $('#res_user_password').val();
        var user_name = $('#res_user_name').val();
        var date = $('#select_date option:selected').val();
        var month = $('#select_month option:selected').val();
        var year = $('#select_year option:selected').val();
        var user_date = date+"-"+month+"-"+year;
        var user_gender = $('input[name="gender"]:checked').val();
        var user_address = $('#res_user_address').val();
        var user_tel = $('#res_user_tel').val();
        var user_email = $('#res_user_email').val();
        $.ajax({
            method : 'POST',
            url:'/handleRegister',
            data:{
                user_id:user_id,
                user_password:user_pass,
                user_date:user_date,
                user_name:user_name,
                user_gender:user_gender,
                user_address:user_address,
                user_tel:user_tel,
                user_email:user_email,
            },
            success: (data)=>{
                if(data.mess == "Success"){
                    alert("Đăng ký thành công");
                }
                else{
                    alert("Đăng ký thất bại");
                }
            },
            error : (err)=>{
                console.log(err);
            }
        });
    }
});