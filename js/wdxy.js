$(function () {


function  Move(){
    this.init();
}
Move.prototype={
    init:function(){
        this.auto();
        this.form();
        this.delete();
        this.getMessage();
        this.scrollGet();
        this.clickPic();
        this.Left();
    },
    //限制行数和设置收起与全文
    auto:function(){
        var lis=$("ul li");
        for(var i=0; i<lis.length; i++){
            var tit=$("li .neirong").eq(i).html().length;
            var img=$("li .txtImg").eq(i);
            var imgLength=$("span",img).length;
            if(tit>=120){
                $(".neirong").eq(i).addClass("txt");
                $(".slide").eq(i).css("display","block");
            }else{
                $(".slide").eq(i).css("display","none");
            }
            var One=true;
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
            });
            //图片的数量决定图片的大小
            if(imgLength<=1){
                $("span",img).css({
                    minWidth:"2rem",
                    maxWidth:"100%"
                });
            }else if(imgLength<=2){
                $("span",img).css({
                    width:"44%"
                });
            }else if(imgLength<=3){
                $("span",img).css({
                    width:"28%"
                });
            }else{
                $("span",img).css({
                    width:"1rem",
                    margin:"0.1rem"
                });
            }
        }
    },
    //跳转页面
    form:function(){
        $(".jump").on("click",function(){
            window.location.href="add.html";
        })
    },
    //删除功能
    delete:function(){
        $(document).on("click",".delete",function(){
            var _this=this;
            $(this).parent("li").fadeOut(function () {
                $(".remove").slideDown();
                setTimeout(function(){
                    $(".remove").slideUp();
                },2000);
            });
            $.ajax({
                type:"post",
                url:"./php/index.php?c=Message&a=deleteMessage",
                data:"mid="+$(this).attr("mid"),
                dataType:"json",
                success:function (data) {
                    console.log(data);
                }
            })
        })
    },
    //获取留言功能
    getMessage:function () {
        $.ajax({
            type:"get",
            url:"http://172.16.45.87/PhpstormProjects/weAreFamily316/php/index.php?c=Message&a=returnMessage",
            processData: false,
            dataType:"json",
            beforeSend:function () {
                $(".loader").show();
                $(".lodding").hide();
            },
            success:function (data) {
                $(".loader").hide();
                if(data.code=="200"){
                    var d = data.data.data;
                    var d1 = null;
                    $.ajax({
                        type:"post",
                        url:"http://172.16.45.87/PhpstormProjects/weAreFamily316/php/index.php?c=Message&a=getOldData",
                        data:"mid="+sessionStorage.getItem("loginId"),
                        async:false,
                        dataType:"json",
                        success:function (data) {
                            var d = data;
                            d1 = d;
                        }
                    });
                    for(var i=0; i<d.length; i++){
                        var html = '';
                        var tit=d[i].title.length;
                        var imgs = d[i].photoUrl.split(";");
                        var img = '';
                        if(imgs.length<=1){
                            $.each(imgs,function (index, item) {
                                img += '<span style="min-width: 2rem; max-width: 100%"><img src="' + item.substr(3) + '"></span>';
                            })
                        }else if(imgs<=2){
                            $.each(imgs,function (index, item) {
                                img+='<span style="width:44%">'+'<img src="'+item.substr(3)+'">'+'</span>';
                            });
                        }else if(imgs<=3){
                            $.each(imgs,function (index, item) {
                                img+='<span style="width:28%">'+'<img src="'+item.substr(3)+'">'+'</span>';
                            });

                        }else{
                            $.each(imgs,function (index, item) {
                                img+='<span style="width:1rem;margin:0.07rem;height:1rem;">'+'<img src="'+item.substr(3)+'">'+'</span>';
                            });
                        }
                        if(tit>100){
                            var neirong = '<p class="neirong txt">'+d[i].title+'</p>';
                            $(".slide").eq(i).css("display","block");
                            var slide = '<p class="slide">全文</p>';
                        }else{
                            var neirong = '<p class="neirong">'+d[i].title+'</p>';
                            var slide = '';
                        }
                        // 图片的数量决定图片的大小
                        html+= '<li>'+
                            '<span class="touxiang">'+
                            '<img src="'+d1.data.headPic.substr(3)+'" alt="" class="tx">'+
                            '</span>'+
                            '<div class="title">'+
                            '<span class="uname">'+d1.data.username+'</span>'+
                            '<span class="time">'+d[i].date+'</span>'+
                            neirong+
                            slide+
                            '<p class="txtImg">'+
                            img+
                            '</p>'+
                            '</div>'+
                            '<p class="delete" mid="'+d[i].id+'"><img src="images/delete.png" alt=""></p>'+
                            '</li>';
                            $('ul').append(html);
                    }
                    var One=true;
                    $(document).on("click",".slide",function(){
                        if(One){
                            $(this).prev().removeClass("txt");
                            $(this).html("收起");
                            One=false;
                        }else{
                            $(this).prev().addClass("txt");
                            $(this).html("全文");
                            One=true;
                        }
                    });
                }
                else if(data.code=="403"){
                    $(".lodding").show().children("p").html(data.message);
                    $(".ok").on("click",function () {
                        location.href = "add.html";
                    })
                }
            },
            timeout:15000,
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                if(textStatus=="timeout"){
                    $(".loader").hide();
                    $(".lodding").show().children("p").html("加载超时");
                }
            }
        });
    },
    //底部刷新
    scrollGet:function () {
        $(window).on("scroll",function () {
            console.log(123);
        })
    },
    //左边一直居中
    Left:function(){
        window.onscroll=function(){
            var stop=document.documentElement.scrollTop||document.body.scrollTop;
            console.log(stop);
        }
    },
    //点击图片
    clickPic:function () {
        $(".txtImg img").on("click",function () {
            console.log($(this));
        })
    }
};

var move=new Move();
})

