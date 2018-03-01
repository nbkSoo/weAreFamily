var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination'
    },
    loop: false,
    on: {
        slideChangeTransitionEnd: function () {
            var a = swiper.activeIndex;
            // 获取当前页
            if(a==0){
                $(".one img:eq(1)").addClass("ones");
                $(".one img:eq(2)").addClass("one-con");
            }else{
                $(".one img:eq(1)").removeClass("ones");
                $(".one img:eq(2)").removeClass("one-con");
            }
            if(a==1) {
                $(".two img:eq(1)").addClass("two-contents");
                $(".two img:eq(2)").addClass("two-xins");
                $(".two img:eq(3)").addClass("two-btom");
            }else{
                $(".two img:eq(1)").removeClass("two-contents");
                $(".two img:eq(2)").removeClass("two-xins");
                $(".two img:eq(3)").addClass("two-btom");
            }
            if(a==2){
                $(".three img:eq(0)").addClass("three-one");
                $(".three img:eq(1)").addClass("three-ones");
                $(".three img:eq(3)").addClass("three-xin");
            }else{
                $(".three img:eq(0)").removeClass("three-one");
                $(".three img:eq(1)").removeClass("three-ones");
                $(".three img:eq(3)").removeClass("three-xin");
            }

        }
    }
});
$(".go").on("click",function(){
    window.location.href="mainz.html";
});