var shouldChange = false;
$('#user_role').change(function(){
    shouldChange = true;
});
$('#admin_change_role').submit(function(e){
    e.preventDefault();
    if(shouldChange){
        var user_id = $('#admin_change_user_id').val();
        var user_role = $('#user_role option:selected').val();
        $.ajax({
            method:"post",
            url:"/admin/changerole",
            data:{
                user_id:user_id,
                user_role:user_role,
            },
            success:(data)=>{
                if(data.mess == "Success"){
                    alert("Cập nhật thành công");
                    window.location.href = "http://127.0.0.1:3000/admin/accountmanagement";
                }
                else{
                    alert("Cập nhật thất bại");
                }
            },
            error:(err)=>{
                console.log(err);
            }
        });
    }
});