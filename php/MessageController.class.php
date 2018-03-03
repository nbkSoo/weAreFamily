<?php
header('Access-Control-Allow-Origin:*');
class MessageController{
    /*
     * 添加留言
     */
    public function sendMessage(){
        if(IS_AJAX){
            $data=$_POST;
//            print_r($_FILES["photo"]);die;
            if(is_array($_FILES)){

                $target = "../upload/";
                $saveFilename = "";
//                print_r($_FILES["photo"]);
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
    }
    /*
     * 返回留言
     */
    public function returnMessage(){
        if(IS_AJAX){
            //当前分页
            $page= max(0, intval($_GET['page']));
            //数据库存数量,总记录数
            $count=M()->query_sql("SELECT count(*) FROM message");
            //每页数量限制
            $limit=2;
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
//           print_r($getData);
//           die;
            if(!empty($getData)&&current(current($count))>0){
                ajax_return("200","成功",$getData);
            }else{
                ajax_return("403","还没有留言，去留言吧","");
            }
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
        if(IS_AJAX){
            $data=$_POST["mid"];
            $result=M()->query_sql("SELECT * FROM message WHERE id={$data}");
//            p($result);
//            die;
            $result=current($result);
            if(!empty($result)){
                ajax_return("200","成功",$result);
            }else{
                ajax_return("403","失败","");
            }
        }
    }
    /*
     * 更新留言
     */
    public function updateMessage(){
        if(IS_AJAX){
            $data=$_POST;
            $files=$_FILES['photo']['name'];
            $target = "../upload/";
            $filename = $target.time().substr($files,strpos($files,"."));
            $data["photoUrl"]=$filename;
            move_uploaded_file($_FILES['photo']['tmp_name'], $filename);
            $id=$data["mid"];
//            p($id);die;
            unset($data["mid"]);
//            print_r($id);
//            die;
            $result=M()->update("message",$data,$id);
            if(!$result){
                ajax_return("403","没有任何修改","");
            }else{
                ajax_return("200","修改成功","");
            }
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
//            p($uid);die;
            if(empty($mid)){
                ajax_return("400","缺少参数","");
            }
            //获取中间表数据
            $sql = "select userid,messageid from dianzan where userid={$uid} and messageid={$mid}";
            $getData = M()->query_sql($sql);
//            p($getData);die;
            //获取文章表信息
            $getMessage = M()->query_sql("select id,dz from message where id={$mid}");
            $getMessage =current($getMessage);
//            p($getMessage);die;
            if(empty($getData)){
                $updateData = [
                    'dz'=>$getMessage['dz']+1
                ];
//                p($updateData);die;
                $mResult=M()->update('message',$updateData,$mid);
//                p($mResult);die;
                $insertData = [
                    'userid'=>$uid,
                    'messageid'=>$mid,
                    'dzDate'=>time(),
                ];
                $dzResult=M()->add('dianzan',$insertData);
//                p($dzResult);die;
                ajax_return("200","点赞成功","");

            }else{
                $updateData = [
                    'dz'=>max($getMessage['dz']-1,0)
                ];
                $mResult=M()->update('message',$updateData,$mid);
//                p($mResult);die;
                $sql = "delete from dianzan where userid={$uid} and messageid={$mid}";
                $dzResult=M()->delete_sql1($sql);
//                p($dzResult);die;
                ajax_return("202","取消点赞成功","");
            }
        }
    }
}