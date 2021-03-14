<?php
	//lay du lieu ve
	echo '<meta charset="UTF-8">';
	$user_ID = $_POST['user_ID'];
	$user_Password = md5($_POST['user_Password']);
	$user_Name = $_POST['user_Name'];
	$user_Email = $_POST['user_Email'];
	$user_Tel = $_POST['user_Tel'];
	$user_Address = $_POST['user_Address'];
	
	//lam viec voi csdl
	//b1
	$con = new mysqli("localhost", "root", "", "db_dngmobile");
	$con->set_charset("utf8");
	//b2  

	$sql = "insert into user values('$user_ID', '$user_Password', '$user_Name', '$user_Email', '$user_Tel', '$user_Address')";
	//echo $sql;
	//b3
	
	$con->query($sql);
	echo "Đăng ký thành công =>";

		
	
	//b4
	//b5
	$con->close();
?>