    <?php
        header("Content-Type:application/json;charset=utf-8");
        require_once 'db.php';
        if($conn->connect_error){
            die("Cound noy connect: " . $conn->connect_error);
        }else{
            mysqli_query($conn,"set character set 'utf8'");//读库 
            mysqli_query($conn,"set names 'utf8'"); //写库
            $newsid=$_POST['newsId'];
            $newstitle=$_POST['newsTitle'];
            $newstype=$_POST['newsType'];
            $newsimg=$_POST['newsImg'];
            $newssrc=$_POST['newsSrc'];
            $newstime=$_POST['newsTime'];
            $sql="UPDATE `news` SET `newsTitle`='{$newstitle}',`newsType`='{$newstype}',`newsImg`='{$newsimg}',`newsSrc`='{$newssrc}',`newsTime`='{$newstime}'
            WHERE `id`='{$newsid}'";
            $result=mysqli_query($conn,$sql);
            echo json_encode(array('update'=>'ok'));
        }

    ?>