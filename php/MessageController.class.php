<?php
class MessageController{
    /*
     * 添加留言
     */
    public function sendMessage(){
        if(IS_AJAX){
            $data=$_POST;
            $data["date"]=time();
            $result=M()->add("message",$data);
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
            $result=M()->query_sql("SELECT * FROM message");
            foreach ($result as $k=>$v){
                $result[$k]["date"]=date("Y-m-d H:i:s",$v["date"]);
            }
            if(!empty($result)){
                ajax_return("200","成功",$result);
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
            $id=array_pop($data);
            $result=M()->update("message",$data,$id);
            if(!$result){
                ajax_return("403","没有任何修改","");
            }else{
                ajax_return("200","修改成功","");
            }
        }
    }
}