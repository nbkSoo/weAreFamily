<?php
$name = isset($_POST['name'])? $_POST['name'] : '';
$gender = isset($_POST['gender'])? $_POST['gender'] : '';
$target = "../img/";
$filename = $target.$_FILES['photo']['name'];

$response = array();

if(move_uploaded_file($_FILES['photo']['tmp_name'], $filename)){
    $response['isSuccess'] = true;
    $response['name'] = $name;
    $response['gender'] = $gender;
    $response['photo'] = $filename;
}else{
    $response['isSuccess'] = false;
}

echo json_encode($response);