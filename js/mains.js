
$(function(){
    function Move(){
        this.tf=true;
        this.init();
    }
    Move.prototype={
        init:function(){
            this.auto();
            this.href();
            this.Left();
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
        },
        //实时获取滚动条，让右边的始终居中
        Left:function(){
            window.onscroll=function(){
                var sTop=document.documentElement.scrollTop||document.body.scrollTop;
                //当滑倒第一层楼层显示
                console.log(sTop);
                $(".box_left").css("top",30+sTop+"px");
            }
        }

    }
    var move=new Move();




});
