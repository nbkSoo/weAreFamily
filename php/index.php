<?php
include_once "function.php";
header("content-type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");//允许所有域名访问
header("Access-Control-Allow-Methods:GET,POST");
$obj = isset($_GET["c"])?$_GET["c"]:"Index";
$obj.="Controller";
$c = new $obj;
$func = isset($_GET["a"])?$_GET["a"]:"index";
$c->$func();