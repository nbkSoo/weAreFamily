
$(function(){
    var tf =true;
    $(".tc").on("click",function(){
        if(tf){
            $(".box_left").css("left","0px");
            $(".box_right").css("left","4.4rem");
            tf = false;
        }else{
            $(".box_left").css("left","-4.4rem");
            $(".box_right").css("left","0px");
            tf = true;
        }
    })
});
