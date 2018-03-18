<?php
//echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
class MessageController{
    /*
     * 添加留言
     */

    public function sendMessage(){
        $data=$_POST;
        if(is_array($_FILES["photo"]["name"])){
            $target = "../upload/";
            $saveFilename = "";
            for($i=0;$i<count($_FILES["photo"]["name"]);$i++){
                $randNum = rand(100000,999999);
                $photoName = $_FILES["photo"]["name"][$i];
                $filename = $target.$randNum.time().substr($photoName,strpos($photoName,"."));
                $saveFilename .= ";".$filename;
                $tmpName = $_FILES["photo"]["tmp_name"][$i];
                move_uploaded_file($tmpName, $filename);
            }
            $saveFilename = substr($saveFilename,1);
            $data['photoUrl'] = $saveFilename;
            $data["date"] = time();
            $result = M()->add("message",$data);
        }else{
            $files=$_FILES['photo']['name'];
            $target = "../upload/";
            $filename = $target.time().substr($files,strpos($files,"."));
            $data["photoUrl"]=$filename;
            move_uploaded_file($_FILES['photo']['tmp_name'], $filename);
            $data["date"]=time();
            $result=M()->add("grzl",$data);
        }
        if(!$result){
            ajax_return("403","发布失败","");
        }else{
            ajax_return("200","发布成功","");
        }
    }
    /*
     * 返回留言
     */
    public function returnMessage(){
//        if(IS_AJAX){
            //当前分页
            $page= max(0, intval($_GET['page']));
            //数据库存数量,总记录数
            $count=M()->query_sql("SELECT count(*) FROM message");
            //每页数量限制
            $limit=5;
            //总页数
            $pages=ceil(current(current($count))/$limit);
            //开始记录

            $startPage = $page*$limit;

            $result=M()->query_sql("SELECT * FROM message order by id desc limit $startPage,$limit");
            foreach ($result as $k=>$v){
                $result[$k]["date"]=date("Y-m-d H:i:s",$v["date"]);
            }
            $getData=array(
                "data"=>$result,
                "count"=>current(current($count)),
                "pages"=>$pages,
                "limit"=>$limit,
            );
            if(!empty($getData)&&current(current($count))>0){
                ajax_return("200","成功",$getData);
            }else{
                ajax_return("403","还没有留言，去留言吧","");
            }
    }
    /*
     * 删除留言
     */
    public function deleteMessage(){
        if(IS_AJAX){
            $data=$_POST["mid"];
            $result=M()->delete_sql("message",$data);
//        p($result);
//        die;
            if(!$result){
                ajax_return("403","删除失败","");
            }else{
                ajax_return("200","删除成功","");
            }
        }
    }
    /*
     * 编辑留言
     */
    public function getOldData(){
        $data=$_POST["mid"];
        $result=M()->query_sql("SELECT * FROM users WHERE id={$data}");
        $result=current($result);
        if(!empty($result)){
            ajax_return("200","成功",$result);
        }else{
            ajax_return("403","失败","");
        }
    }
    /*
     * 更新留言
     */
    public function updateMessage(){

        $data=$_POST;
        $files=$_FILES['photo']['name'];
        $target = "../upload/";
        $filename = $target.time().substr($files,strpos($files,"."));
        $data["headPic"]=$filename;
        move_uploaded_file($_FILES['photo']['tmp_name'], $filename);
        $id=$data["mid"];
        unset($data["mid"]);
        $result=M()->update("users",$data,$id);
        if(!$result){
            ajax_return("403","没有任何修改","");
        }else{
            ajax_return("200","修改成功","");
        }
    }
    /*
     * 点赞
     */
    public function dzMessage(){
        if(IS_AJAX){
            session_start();
            $mid = $_POST['mid'];
            $uid = $_SESSION['uid'];
            if(empty($mid)){
                ajax_return("400","缺少参数","");
            }
            //获取中间表数据
            $sql = "select userid,messageid from dianzan where userid={$uid} and messageid={$mid}";
            $getData = M()->query_sql($sql);
            $getMessage = M()->query_sql("select id,dz from message where id={$mid}");
            $getMessage =current($getMessage);
            if(empty($getData)){
                $updateData = [
                    'dz'=>$getMessage['dz']+1
                ];
                $mResult=M()->update('message',$updateData,$mid);
                $insertData = [
                    'userid'=>$uid,
                    'messageid'=>$mid,
                    'dzDate'=>time(),
                ];
                $dzResult=M()->add('dianzan',$insertData);
                ajax_return("200","点赞成功","");

            }else{
                $updateData = [
                    'dz'=>max($getMessage['dz']-1,0)
                ];
                $mResult=M()->update('message',$updateData,$mid);
                $sql = "delete from dianzan where userid={$uid} and messageid={$mid}";
                $dzResult=M()->delete_sql1($sql);
                ajax_return("202","取消点赞成功","");
            }
        }
    }

}