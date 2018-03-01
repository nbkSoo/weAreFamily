function  Move(){
    this.init();
}
Move.prototype={
    init:function(){
        this.auto();
        this.form();
    },
    //限制行数和设置收起与全文
    auto:function(){
        var One=true;
        var lis=$("ul li");
        console.log(lis.length);
        for(var i=0; i<lis.length; i++){
            var tit=$("li .neirong").eq(i).html().length;
            if(tit>100){
                $(".neirong").eq(i).addClass("txt");
                $(".slide").eq(i).css("display","block");
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

                })
            }

        }

    },
    form:function(){
        $(".jump").on("click",function(){
            window.location.href="add.html";
        })

    }
};
var move=new Move();
