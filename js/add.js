$(function () {
    function Add() {
        this.init();
    };
    Add.prototype={
        constructor:Add,
        init:function () {
            this.img();
            this.picSelect();
            this.addSubmit();
        },
        img:function () {
            var _this = this;
            $(".Imge img").on("click",function(){
                if($(".picBox").children().length>=9){
                    _this.tipK("最多只能添加9张图片");
                    return;
                }
                $(".picBox").append('<div><img src="'+$(this).attr("src")+'"></div>');
            });
            $(".qd").on("click",function () {
                $(this).parent().hide();
            });
            //长按划出删除按钮
            $(".picBox").on("longTap","div",function () {
                $(this).append('<p class="delete_pic">删除</p>')
            });
            //删除所选图片
            $(document).on("click",".delete_pic",function () {
                $(this).parent().remove();
            });
        },
        //选择外部图片
        picSelect:function () {
            var n = 0;
            $(".add").on({
                "click":function () {
                    if(n>=9){
                        $(".tankuang").show().children("p").html("最多只能添加9张图片");
                        return false;
                    }
                    n++;
                    $(".Imge").append('<input type="file" style="display:none" name="photo[]" id="file'+n+'">');
                    $("#file"+n).click();
                    $("#file"+n).on("change",function () {
                        var fl = $(this)[0].files[0];
                        if(fl.type.indexOf("image")==-1){
                            alert("只能选择图片文件");
                            return false;
                        }
                        var url = window.URL.createObjectURL(fl) || window.webkitURL.createObjectURL(fl);
                        var imgs = '<img src="'+url+'"/>'
                        $(".picBox").append('<div>'+imgs+'</div>');
                        imgs.onload = function () {
                            window.URL.revokeObjectURL(fl);
                        }
                    })
                }
            })
        },
        //提交信息
        addSubmit:function () {
            var _this = this;
            $("#addSubmit").on({
                "click":function () {
                    var formData = new FormData(content);
                    if($(".teart").val()==""){
                        _this.tipK("内容不能为空！");
                        return;
                    }
                    $.ajax({
                        type:"post",
                        url:"./php/index.php?c=Message&a=sendMessage",
                        data:formData,
                        dataType:"json",
                        processData:false,
                        contentType:false,
                        success:function (data) {
                            console.log(data);
                        }
                    })
                }
            })
        },
        tipK:function (str) {
            $(".tankuang").show().children("p").html(str);
        }
    };
    var add=new Add();
})