
$(function(){
    function Move(){
        this.tf=true;
        this.init();
        this.startPosition = 0;
        this.endPosition = 0;
        this.moveLength = 0;
        this.deltaY = 0;
        this.deltaX = 0;
    }
    Move.prototype={
        init:function(){
            this.auto();
            this.href();
            this.slideLeftBar();
            this.logout();
            if(!sessionStorage.getItem("login")){
                $(".lodding").css("display","block");
                $(".ok").on("click",function(){
                    location.href = "login.html";
                })

            }else{
                $("#uname").html(sessionStorage.getItem("login"));
            }
            if(localStorage.getItem("img")){
                $("#people>img").attr("src",localStorage.getItem("img").substr(3));
            }
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
        //滑动显示左侧菜单(zepto)
        slideLeftBar:function () {
            window.$$ = window.Zepto = Zepto;
            $$(document).on("touchstart",function (e) {
                var touch = e.touches[0];
                this.startPosition = touch.pageX;
            }.bind(this)).on("touchmove",function (e) {
                var touch = e.touches[0];
                this.endPosition = touch.pageX;
                this.deltaX = this.endPosition - this.startPosition;
            }.bind(this)).on("touchend",function (e) {
                if(this.deltaX > 80) { // 向右划动
                    this.tf = true;
                    $$(".tc").click();
                }else if(this.deltaX < -80){ // 向左滑动
                    this.tf = false;
                    $$(".tc").click();
                }
            }.bind(this))
        },
        logout:function () {
            $("#logout").on("click",function () {
                localStorage.removeItem("img");
                sessionStorage.removeItem("login");
                location.reload();
            })
        }
    };
    var move=new Move();
});
