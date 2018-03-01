function  Move(){
    this.init();
}
Move.prototype={
    init:function(){
        this.auto();
    },
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

    }
};
var move=new Move();
