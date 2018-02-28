<?php
$name = isset($_POST['name'])? $_POST['name'] : '';
$title = isset($_POST['title'])? $_POST['title'] : '';
$tel = isset($_POST['tel'])? $_POST['tel'] : '';
$target = "../upload/";
$filename = $target.$_FILES['photo']['name'];

$response = array();

if(move_uploaded_file($_FILES['photo']['tmp_name'],$filename)){
    $response['isSuccess'] = true;
    $response['name'] = $name;
    $response['title'] = $title;
    $response['photo'] = $filename;
    $response['tel'] = $tel;
}else{
    $response['isSuccess'] = false;
}
echo json_encode($response);