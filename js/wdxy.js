
function  Move(){
    this.init();
}
Move.prototype={
    init:function(){
        this.auto();
        this.form();
        this.delete();
    },
    //限制行数和设置收起与全文
    auto:function(){

        var lis=$("ul li");
        // console.log(lis.length);
        for(var i=0; i<lis.length; i++){
            var tit=$("li .neirong").eq(i).html().length;
            var img=$("li .txtImg").eq(i);
            var imgLength=$("span",img).length;
            // console.log(imgLength);

            if(tit>100){
                $(".neirong").eq(i).addClass("txt");
                $(".slide").eq(i).css("display","block");
            }
            var One=true;
            $(".slide").on("click",function(){
                if(One){
                    $(this).prev().removeClass("txt");
                    $(this).html("收起");
                    One=false;
                }else{
                    $(this).prev().addClass("txt");
                    $(this).html("全文");
                    One=true;
                }
            });
            //图片的数量决定图片的大小
            if(imgLength<=1){
                $("span",img).css({
                    minWidth:"2rem",
                    maxWidth:"100%"
                });
            }else if(imgLength<=2){
                $("span",img).css({
                    width:"44%"
                });
            }else if(imgLength<=3){
                $("span",img).css({
                    width:"28%"
                });
            }else{
                $("span",img).css({
                    maxWidth:"30%",
                    minWidth:"30%",
                    margin:"0.03rem"
                });
            }
        }
    },
    //跳转页面
    form:function(){
        $(".jump").on("click",function(){
            window.location.href="add.html";
        })
    },
    //删除功能
    delete:function(){
        $(".delete").on("click",function(){

            $(this).parent("li").remove();
        })
    }
};
var move=new Move();


