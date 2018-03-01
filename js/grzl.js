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
        },
        sendPic: function () {
            $("#box").on("click", function (e) {
                $("#file").click();
            });
            $("#file").on("change",function(){
                var fl = $(this).get(0).files[0];
                var fileSize=fl.size/1024;
                if(fileSize>100){
                    alert("图片大小不能超过100k");
                    return false;
                }
                if(fl.type.indexOf("image")===-1){
                    alert("图片格式不符合");
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
                    $(".dding").css("display","block");
                    $(".dding p").eq(0).html("未修改");
                    $(".ti").on("click",function(){
                        $(".dding").css("display","none");
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
                        localStorage.setItem("name",$("#uname").val());
                        $(".dding").css("display","block");
                        $(".dding p").html("修改成功");
                    }
                });
                $(".ti").on("click",function(){
                    $(".dding").css("display","none");
                    $.ajax({
                        type:"post",
                        url:"./php/index.php?c=Message&a=sendMessage",
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

        }
    };
    var grzl = new Grzl();
});
