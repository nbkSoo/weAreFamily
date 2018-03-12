function Zhuce() {
    this.s = 60;
    this.timer = null;
    this.div=$('<div class="yincang"></div>');
    this.lis = $("li");
    this.init();
};
Zhuce.prototype={
    constructor: Zhuce,
    init:function () {
        this.click();
        this.btn();
        this.qd();
    },
    click:function () {
        var _this=this;
        $(".inp2").on("click",function(){
            // var $tel = $(".register_tel");
            if($(".register_tel").val()==""){
                $(".tankuang").css("display","block");
                $(".contents").html("手机号不能为空！");
            }else if($(".register_tel")[0].validity.patternMismatch){
                $(".tankuang").css("display","block");
                $(".contents").html("手机号码格式错误");
            }else{
                _this.timer = setInterval(downTime,1000);
                $(this).addClass("notClick");
                function downTime() {
                    _this.s--;
                    $(".inp2").val(_this.s+"秒后重新获取");
                    if(_this.s<=0){
                        clearInterval(_this.timer);
                        $(".inp2").val("获取验证码").removeClass("notClick");
                        _this.s = 60;
                    }
                }
                $.ajax({
                    type:"post",
                    url:"./php/aliyun/api_demo/SmsDemo.php",
                    data:"tel="+$(".register_tel").val(),
                    dataType:"json",
                    success:function (data) {
                        sessionStorage.setItem("rand",data.data);
                        console.log(data);
                    }
                })
            }
        });
    },
    btn:function () {
        var _this=this;
        $(".btn").on("click",function () {
            if($(".inpa").val()==""){
                d(0,"取一个好听的名字吧！！！");
            }else if($(".register_tel").val()==""){
                d(1,"要输入手机号哦~");
            }else if($(".register_tel")[0].validity.patternMismatch){
                d(1,"手机号码格式不正确");
            }else if($(".inp1").val()==""){
                d(2,"请输入验证码");
            }else if($(".inp1").val()!=sessionStorage.getItem("rand")){
                d(2,"验证码错误");
            }else if($(".ps:eq(0)").val()==""){
                d(3,"请输入密码");
            }else if($(".ps:eq(0)")[0].patternMismatch){
                d(3,"密码格式为：6~15位");
            }else if($(".ps:eq(1)").val()==""){
                d(4,"请再次输入密码");
            }else if($(".ps:eq(1)").val()!=$(".ps:eq(0)").val()){
                d(4,"两次输入的密码不一致");
            }else{
                $.ajax({
                    type:"post",
                    url:"./php/index.php?c=Login&a=register",
                    data:$(".register_form").serialize(),
                    dataType:"json",
                    success:function (data) {
                        console.log(data);
                        if(data.code=="403"){
                            d(2,"验证码已过期，请重新获取");
                        }else if(data.code=="505"){
                            d(1,data.message);
                            sessionStorage.removeItem("rand");
                        }else if(data.code=="200"){
                            $(".tankuang").show().children("p").html("注册成功");
                        }
                    }
                })
            }
        });
        $(".inp").on("focus",function () {
            _this.lis.children(".yincang").fadeOut(function () {
                _this.lis.children(".yincang").remove();
            });
        });
        function d(n,str) {
            _this.div.fadeIn();
            _this.div.html(str);
            _this.lis.eq(n).append(_this.div);
        }
    },
    qd:function () {
        $(".qd").on("click",function () {
            $(".tankuang").css("display","none");
        })
    }

};
var zhuce=new Zhuce();