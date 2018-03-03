<?php
header('Access-Control-Allow-Origin:*');
class LoginController{
    /*
     * 注册方法
     */
    public function register(){
        if(IS_AJAX){
            $data=$_POST;
            $password=$data["password"];
            $tel = $data["tel"];
            print_r($data);
            $oldData=M()->query_sql("SELECT * FROM users WHERE tel='{$tel}'");
            if(!empty($oldData)){
                ajax_return("505","该手机号已经注册！","");
            }else{
                $newPass=$this->verify($password);
                $data["password"]=$newPass;
                $result=M()->add("users",$data);
                if($result){
                    ajax_return("200","注册成功","");
                }else{
                    ajax_return("400","注册失败","");
                }
            }
        }
    }

    /*
     * 登录方法
     */
    public function login(){
        if(IS_AJAX){
            $data=$_POST;
            $username=$data["username"];
            $password=$data["password"];
            $oldData=M()->query_sql("SELECT * FROM users WHERE username='{$username}'");
            $oldData=current($oldData);
            $username = $oldData["username"];
            if(empty($oldData)){
                ajax_return("500","用户名不存在","");
            }else{
                $newPass=$this->verify($password);
                if($newPass!=$oldData["password"]){
                    ajax_return("403","密码不正确","");
                }else{
                    session_start();
                    $_SESSION["username"]=$username;
                    ajax_return("200","登录成功","$username");
                }

            }
        }
    }
    /*
     * 登录方法二
     */
    public function login2(){
        session_start();
        ajax_return("200","成功",$_SESSION);
    }
    /*
     * 退出登录方法
     */
    public function logout(){
        if(IS_AJAX){
            session_start();
            session_unset();
            session_destroy();
            ajax_return("200","退出成功","");
        }
    }

    /*
     * 加密方法
     */
    public function verify($str){
        $md=md5(md5($str)."beijing");
        return $md;
    }
}