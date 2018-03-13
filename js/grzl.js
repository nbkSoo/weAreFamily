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
            if(localStorage.getItem("img")){
                $("#box>img").attr("src",localStorage.getItem("img").substr(3)).addClass("tou");
            }
            if(sessionStorage.getItem("login")){
                $("#uname").val(sessionStorage.getItem("login"));
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
                    url:"./php/server.php",
                    data:_this.formData,
                    dataType:"json",
                    processData:false,
                    contentType:false,
                    success:function(da){
                        var img = $("<img src='"+da.photo.replace('../',"")+"' id='img' class='top'/>");
                        $("#box").html(img);
                        localStorage.setItem("img",da.photo);
                        $(".lodding").css("display","block");
                        $(".lodding p").html("修改成功");
                    }
                });
                $(".ok").on("click",function(){
                    $(".lodding").css("display","none");
                    $.ajax({
                        type:"post",
                        url:"http://172.16.45.87/PhpstormProjects/weAreFamily11/php/index.php?c=Message&a=sendMessage",
                        data:_this.formData,
                        processData:false,
                        contentType:false,
                        dataType:"json",
                        success:function(data){
                            if(data.code=="200"){

                            }
                        }
                    });
                });
            });

        },
        //后退按钮
        jump:function(){
            $(".jump").on("click",function(){
                window.history.back(-1);
            })
    }
    };
    var grzl = new Grzl();
});
