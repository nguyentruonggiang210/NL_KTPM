Res_Click_Button = true;

// check account exist
$('#res_user_id').change(function(){
    var user_id = $(this).val();
    $.ajax({
        method : 'POST',
        url:'/user/handleCheckAccount',
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

$('#res_user_password').change(function(){
    var password = $(this).val();
    var cfpassword = $('#res_cf_user_password').val();
    if(cfpassword !== ""){
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
        var user_date = year + "-" + month + "-" + date;
        var user_gender = $('input[name="gender"]:checked').val();
        var user_address = $('#res_user_address').val();
        var user_tel = $('#res_user_tel').val();
        var user_email = $('#res_user_email').val();
        var user_image = document.getElementById('res_user_image').files[0];
        var data = new FormData();
        data.append('user_id',user_id);
        data.append('user_pass',user_pass);
        data.append('user_name',user_name);
        data.append('user_date',user_date);
        data.append('user_gender',user_gender);
        data.append('user_address',user_address);
        data.append('user_tel',user_tel);
        data.append('user_email',user_email);
        data.append('user_image', user_image);

        $.ajax({
            method : 'POST',
            url:'/user/handleRegister',
            data:data,
            processData: false,
            contentType: false,
            success: (data)=>{
                if(data.mess == "Success"){
                    $('#closeRegisterForm').click();
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
    else{
        alert("Hãy điền đúng theo yêu cầu!");
    }
});