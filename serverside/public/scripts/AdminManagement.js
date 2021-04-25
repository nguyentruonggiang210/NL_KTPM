function DeleteAccount(){
    var user_id = $('#admin_change_user_id').val();
    if(user_id !== ""){
        if(confirm("Có chắc bạn muốn xóa tài khoản này")){
            $.ajax({
                method:"post",
                data:{
                    user_id:user_id,
                },
                url:"/admin/deleteaccount",
                success: (data) =>{
                    if(data.mess === "success"){
                        alert("Xóa thành công");
                        window.location.reload();
                    }
                    else{
                        alert("Xóa không thành công");
                    }
                },
                error: (err) => {
                    console.log(err);
                    alert("Xóa không thành công");
                }
            });
        }
    }
}