<?php
	//lay dl ve 
	$user_ID = $_POST['user_ID'];
	$user_Password = md5($_POST['user_Password']);
	
	//lam viec vs csdl
	//b1
	$con = new mysqli("localhost", "root", "", "db_dngmobile");
	$con->set_charset("utf8");
	
	//b2
	$sql = "select * from user where user_id='$user_ID'and user_password='$user_Password'";
	//b3
	//echo $sql;
	$result = $con->query($sql);
	if($result->num_rows > 0){
		session_start();
		$_SESSION['user']=$user_ID;
		header("Location:./aaaaaaaa");
	}
	else echo "khong thanh cong";
	//b4
	//b5 dong noi ket
	$con->close();
?>