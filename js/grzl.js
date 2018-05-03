$(function () {


});
$(function () {
    function Grzl() {
        this.resultFl = null;
        this.formData;
        this.init();
    }
    Grzl.prototype = {
        constructor: Grzl,
        init: function () {
            this.sendPic();
            this.submit();
            this.jump();
            if(sessionStorage.getItem("login")){
                var login = JSON.parse(sessionStorage.getItem("login"));
                if(login.headPic==null){
                    $("#box>img").attr("src","images/xj.png");
                }else{
                    console.log(123);
                    $("#box").html("<img class='logPics' src='"+login.headPic.substr(3)+"'>");
                }
                $("#uname").val(login.username);
                $("#tie").val(login.title);
                $("#hidden_mid").val(login.id);
            }
            if(sessionStorage.getItem("loginId")){
                $.ajax({
                    type:"post",
                    url:"http://172.16.45.87/PhpstormProjects/weAreFamily316/php/index.php?c=Message&a=getOldData",
                    data:"mid="+sessionStorage.getItem("loginId"),
                    dataType:"json",
                    beforeSend:function () {
                        $(".loader").show();
                    },
                    timeout:15000,
                    success:function (data) {
                        $(".loader").hide();
                        var d = data;
                        if(d.data.headPic!=null){
                            $("#box").html("<img class='logPics' src='"+d.data.headPic.substr(3)+"'>");
                        }else{
                            $("#box>img").attr("src","images/xj.png");
                        }
                        $("#uname").val(d.data.username);
                        $("#tie").val(d.data.title);
                        $("#hidden_mid").val(d.data.id);
                    },
                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                        if(textStatus=="timeout"){
                            $(".loader").hide();
                            $(".lodding").show().children("p").html("加载超时");
                        }
                    }
                });
            }
        },
        sendPic: function () {
            $("#box").on("click", function (e) {
                $("#file").click();
            });
            $("#file").on("change",function(){
                var fl = $(this).get(0).files[0];
                var fileSize=fl.size/1024;
                if(fileSize>100){
                    $(".lodding").css("display","block");
                    $(".contents").html("图片大小不能超过100k");
                   $(".ok").on("click",function(){
                       $(".lodding").css("display","none");
                   });
                    return false;
                }
                if(fl.type.indexOf("image")===-1){
                    $(".lodding").css("display","block");
                    $(".contents").html("图片格式不符合");
                    $(".ok").on("click",function(){
                        $(".lodding").css("display","none");
                    });
                    return false;
                }
                var url=window.URL.createObjectURL(fl)||window.webkitURL.createObjectURL(fl);
                var imgs=document.createElement('img');
                imgs.src=url;
                box.innerHTML="";
                box.appendChild(imgs);
                imgs.className="tou";
                imgs.onload=function () {
                    window.URL.revokeObjectURL(fl);
                };
            });
        },
        submit:function () {
            var _this = this;
            $("#btn").on("click",function(){
                _this.formData = new FormData($("#form")[0]);
                if($("#uname").val()==""||$("#tel").val()==""||$("#tie").val()==""){
                    $(".lodding").css("display","block");
                    $(".contents").html("未进行修改");
                    $(".ok").on("click",function(){
                        $(".lodding").css("display","none");
                    });
                    return false;
                }
                $.ajax({
                    type:"post",
                    url:"php/index.php?c=Message&a=updateMessage",
                    data:_this.formData,
                    dataType:"json",
                    processData:false,
                    contentType:false,
                    beforeSend:()=>{
                        $(".loader").show();
                    },
                    success:function(da){
                        $(".loader").hide();
                        if(da.code==200){
                            $(".lodding").show().children("p").html("修改成功");
                        }
                        $(".ok").on("click",function () {
                            $(".lodding").hide();
                        });
                    }
                });
            });
        },
        //后退按钮
        jump:function(){
            window.$$ = window.Zepto = Zepto;
            $(".jump").on("click",function(){
                window.history.back(-1);
            })
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
                    window.history.back(-1);
                }
            }.bind(this))
        }
    };
    var grzl = new Grzl();
});
