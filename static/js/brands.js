$(document).ready(function(e){
    function fixVideoAlignment(){
        requestAnimationFrame(function(){
            var cWidth = $("#home .background-wrapper").width();
            var cHeight = $("#home .background-wrapper").height();

            var vWidth = $("#home .background-wrapper video").width();
            var vHeight = $("#home .background-wrapper video").height();

            var wDiff = Math.abs(cWidth - vWidth);
            var hDiff = Math.abs(cHeight - vHeight);

            $("#home .background-wrapper video").css("transform", "translate3d(-" + wDiff/2 + "px, -" + hDiff/2 + "px, 0");
        });
    }
    fixVideoAlignment();
    $(window).on("resize", function(){
        fixVideoAlignment();
    });
    
    $(".carousel-car-item>a").click(function(e){
        e.preventDefault();
        var target = $(this).attr("data-target");
        $("#home").addClass("blurred");
        $("#primaryMenu").addClass("blurred");
        $(".cars-carousel-content").addClass("active");
        $(target).addClass("active");
    });
    $(".close-modal").click(function(e){
        e.preventDefault();
        $(".cars-carousel-content").removeClass("active");
        $(".cars-carousel-content-inner.active").removeClass("active");
        $("#home").removeClass("blurred");
        $("#primaryMenu").removeClass("blurred");
    });
});