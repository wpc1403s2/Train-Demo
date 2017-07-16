<?php
    header("Content-Type:application/json;charset=utf-8");
    require_once 'db.php';
    if($conn->connect_error){
        die("Cound noy connect: " . $conn->connect_error);
    }else{
        mysqli_query($conn,"set character set 'utf8'");//读库 
        mysqli_query($conn,"set names 'utf8'"); 
        $newsid=$_GET['newsId'];
        mysqli_set_charset($conn,"utf8");
        $sql="SELECT * FROM `news` WHERE `id`={$newsid}";
        $result=mysqli_query($conn,$sql);
        $senddata=array();
        while($row=mysqli_fetch_assoc($result)){
            array_push($senddata,array(
                'id'=>$row['id'],
                'newsType'=>$row['newsType'],
                'newsImg'=>$row['newsImg'],
                'newsSrc'=>$row['newsSrc'],
                'newsTitle'=>$row['newsTitle'],
                'newsTime'=>$row['newsTime'],
            ));
        }
        echo json_encode($senddata);
    }

?>