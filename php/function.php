<?php
header("content-type:text/html;charset=utf-8");
function p($a){
    echo "<pre/>";
    var_dump($a);
}
define("IS_POST",$_SERVER["REQUEST_METHOD"]=="POST"?true:false,true);
define("IS_AJAX",isset($_SERVER["HTTP_X_REQUESTED_WITH"])&&$_SERVER["HTTP_X_REQUESTED_WITH"]=="XMLHttpRequest"?true:false,true);
function __autoload($classname){
    $classPath = "./{$classname}.class.php";
    if(file_exists($classPath)){
        include_once "$classPath";
    }else{
        die("{$classname}不存在");
    }
}

function success($msg,$url){
    $str = <<<str
    <script>
    alert("$msg");
    location.href = "$url";
</script>
str;
    die($str);
}
function error($msg,$url){
    $str = <<<str
    <script>
    alert("$msg");
    location.href = "$url";
</script>
str;
    die($str);
}

function M(){
    $model = new ModelController;
    return $model;
}
function ajax_return($code,$message,$data){
    if(!is_numeric($code)){
        return "";
    }
    $result = array(
        "code"=>$code,
        "message"=>$message,
        "data"=>$data
    );
    die(json_encode($result));
}