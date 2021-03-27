$('#loginForm').on('submit',function(e) {
    e.preventDefault();
    var id = $('#txtID').val();
    var pass = $('#txtPass').val()
    if(id == "" || pass == ""){
        alert("Vui lòng điền tên đăng nhập và mật khẩu!!!");
        return;
    }
    $.ajax({
        method : 'POST',
        url:'/handleLogin',
        data:{
            user_id:id,
            user_password:pass,
        },
        success: (data)=>{
            if(data.obj == 'failed'){
                alert("Tên đăng nhập hoặc tài khoản không chính xác");
                return;
            }
            console.log(data);
            $('.btn-close').click();
        },
        error : (err)=>{
            console.log(err);
        }
    });
});