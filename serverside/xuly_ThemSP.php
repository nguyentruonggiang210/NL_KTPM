<?php
	//lay du lieu ve
	echo '<meta charset="UTF-8">';
	$product_ID = $_POST['product_ID'];
	$product_Name = md5($_POST['product_Name']);
	$product_Price = $_POST['product_Price'];
	$product_Detail = $_POST['product_Detail'];
	$product_Bought = $_POST['product_Bought'];
    $product_Storage = $_POST['product_Storage'];
    $product_Color = $_POST['product_Color'];
    $product_Ram = $_POST['product_Ram'];
    $product_Rom = $_POST['product_Rom'];
	
	//lam viec voi csdl
	//b1
	$con = new mysqli("localhost", "root", "", "db_dngmobile");
	$con->set_charset("utf8");
	//b2  

	$insert_Product = "insert into product values('$product_ID', '$product_Name', '$product_Price', '$product_Detail', '$product_Bought', '$product_Storage', '$product_Color', '$product_Ram', '$product_Rom')";
	//echo $sql;
	//b3
	$con->query($insert_Product);
    //echo "Thêm thành công =>";
    //them hinh anh
    $select_ID = "select max(product_ID) from product";
    $max_ID = $con->query($select_ID);

    $max_img = 4;
    // dùng vòng lặp insert hình vào bảng img
    for($i=0; $i<$max_img; $i++){ 

    }
    

		
	
	//b4
	//b5
	$con->close();
?>