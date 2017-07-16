<?php
    header("Content-Type:application/json;charset=utf-8");
    require_once 'db.php';
    if($conn->connect_error){
        die("Cound noy connect: " . $conn->connect_error);
    }else{
        $newsid=$_POST['newsId'];
        mysqli_query($conn,"set character set 'utf8'");//读库 
        mysqli_query($conn,"set names 'utf8'"); 
        $sql="DELETE FROM `news` WHERE `news`.`id`={$newsid}";
        mysqli_query($conn,$sql);
        echo json_encode(array('delete'=>'ok'));
    }
    $conn->close();
?>