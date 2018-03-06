<?php
setcookie("rand",rand(100000,999999),time()+300,"/");
print_r($_COOKIE["rand"]);