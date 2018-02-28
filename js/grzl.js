$(function () {
    $("#box").on("tap",function(){
        console.log($(this));
        $("#file").click();
    });
    $("#file").on("change",function(){
        var resultFl=null;
        var fl = $(this).get(0).files[0];
        resultFl=fl;
        var fileSize=fl/1024;
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
        $("#btn").on("tap",function(){
            var data = new FormData();
            data.append("name",$("input[name='uname']").val());
            data.append("photo",$("input[name='photo']").val());
            data.append("title",$("input[name='title']").val());
            data.append("img",resultFl);
            console.log(data);
            if($("#uname").val()==""||$("#tel").val()==""||$("#tie").val()==""){
                $(".dding").css("display","block");
                $(".dding p").eq(0).html("未修改");
                $(".ti").on("tap",function(){
                    $ (".dding").css("display","none");
                    return;
                });
            }
            $.ajax({
                type:"post",
                url:"php/server.php",
                data:data,
                dataType:"json",
                processData:false,
                contentType:false,
                success:function(da){
                    var img = $("<img src='"+da.photo.replace('../'," ")+"' id='img' class='top'/>");
                    box.innerHTML=img;
                    localStorage.setItem("img",da.photo);
                    localStorage.setItem("name",$("#uname").val());
                    $(".dding").css("display","block");
                    $(".dding").html("修改成功");
                    $(".ti").on("click",function(){
                        $(".dding").css("display","none");
                        var da=$("form").serialize();
                        $.ajax({
                            type:"post",
                            url:"../php/index.php?c=Message&a=sendMessage",
                            data:da,
                            dataType:"json",
                            success:function(data){
                                if(data.code=="403"){
                                    $(".dding").css("display","block");
                                    $(".dding p").eq(0).html(data.message);
                                    $(".ti").on("click",function(){
                                        $(".dding").css("display","none");
                                    });
                                }else if(data.code=="200"){
                                    $(".dding").css("display","block").css("top","120%");
                                    $(".dding p").eq(0).html(data.message);
                                    $(".ti").on("click",function(){
                                        $(".dding").css("display","none");
                                        location.reload(true);
                                    });

                                }
                            }
                        });




                        window.location.href="index.html";
                    });
                }
            })

        })
    });
});
