
$(function(){
    function Move(){
        this.tf=true;
        this.init();
    }
    Move.prototype={
        init:function(){
            this.auto();
            this.href();
        },
        auto:function(){
            $(".tc").on("click",function(){
                if(this.tf){
                    $(".box_left").css("left","0px");
                    $(".box_right").css("left","4.4rem");
                    this.tf = false;
                }else{
                    $(".box_left").css("left","-4.4rem");
                    $(".box_right").css("left","0px");
                    this.tf = true;
                }
            }.bind(this));
        },
        //点击个人头像和名字跳转页面
        href:function(){
            $("#uname").on("click",function(){
                window.location.href="grzl.html";
            });
            $("#people img").on("click",function(){
                window.location.href="grzl.html";
            });
    }

    }
    var move=new Move();




});
