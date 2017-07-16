<?php
    header("Content-type:application/json;charset=utf-8");
    require_once 'db.php';
    if($conn->connect_error){
        die("Cound noy connect: " . $conn->connect_error);
    }else{
        mysqli_query($conn,"set character set 'utf8'");//读库 
        mysqli_query($conn,"set names 'utf8'"); 
        $newstitle=$_POST['newsTitle'];
        $newstype=$_POST['newsType'];
        $newsimg=$_POST['newsImg'];
        $newssrc=$_POST['newsSrc'];
        $newstime=$_POST['newsTime'];
        $sql="INSERT INTO `news` (`newsTitle`,`newsType`,`newsImg`,`newsSrc`,`newsTime`)
        VALUES ('{$newstitle}','{$newstype}','{$newsimg}','{$newssrc}','{$newstime}')";
        $result=mysqli_query($conn,$sql);
        echo json_encode(array('success'=>'ok'));
    }

?>