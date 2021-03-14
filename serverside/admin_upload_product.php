<?php 
    try{
        $productName = $_POST['productName'];
        $productPrice = $_POST['productPrice'];
        $productDetail = $_POST['productDetail'];
        $productStorage = $_POST['productStorage'];
        $productColor = $_POST['productColor'];
        $productStorage = $_POST['productRam'];
        $productColor = $_POST['productRom'];
        // upload image
        $total =  count($_FILES['productImage']['name']);
        for($i = 0; $i < $total ; $i++){
            $tmp = $_FILES['productImage']['tmp_name'][$i];
            $filename = $_FILES['productImage']['name'][$i];
            if ($tmp != ""){
                move_uploaded_file($tmp,"../img/".$filename);
            }
        }
        echo "Thành công!";
    }
    catch(Exception $e)
    {
        echo $e;
    }
?>