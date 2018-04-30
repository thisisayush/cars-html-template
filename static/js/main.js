$(document).ready(function (e) {
    var pageTransitionTimeout = 1000;

    function init() {
        $("#slides").page();
        runHomeAnimations();
        $(document).on("DOMMouseScroll mousewheel", changeSlideByMouse);
        $(".fs-slide-next").one("click",function(e){
            e.preventDefault();
            processClick(1);
        });
        $(".fs-slide-prev").one("click", function(e){
            e.preventDefault();
            processClick(-1);
        });
        $(".fs-slide-to").one("click", function(e){
            e.preventDefault();
            slideTo(this);
        });
        $("#slides").page().transition("1","none");
        setTimeout(function(){
            $("#loader").fadeOut(1000);
        }, 1500);
    }
    init();

    function slideTo(obj){
        var slide = parseInt($(obj).attr("data-slide-to"));
        var curr = parseInt($(".fs-slide.active").attr("data-jquery-page-name"));
        changeSlide(slide - curr);
        setTimeout(function(){
            $(".fs-slide-to").one("click", function(e){
                e.preventDefault();
                slideTo(this);
            });
        }, pageTransitionTimeout);
    }

    function processClick(type){
        if(type == 1){
            
            changeSlide(1);
            setTimeout(function(){
                $(".fs-slide-next").one("click",function(e){
                    e.preventDefault();
                    processClick(1);
                });
            }, pageTransitionTimeout);
        }else{
            changeSlide(-1);
            setTimeout(function(){
                $(".fs-slide-prev").one("click", function(e){
                    e.preventDefault();
                    processClick(-1);
                });
            }, pageTransitionTimeout);
        }
    }

    /** Internal Slide Animations */
    function runSlideAnimations() {
        var active = $(".fs-slide.active").attr("data-animation-context");
        
        var animations = ["bounce","flash", "pulse", "rubberBand",
        "shake", "headShake", "swing", "tada",
        "wobble", "jello", "bounceIn", "bounceInDown",
        "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut",
        "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp",
        "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft",
        "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp",
        "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig",
        "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig",
        "fadeOutUp", "fadeOutUpBig", "flipInX", "flipInY",
        "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut",
        "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft",
        "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight",
        "rotateOutUpLeft", "rotateOutUpRight", "hinge", "jackInTheBox",
        "rollIn", "rollOut", "zoomIn", "zoomInDown",
        "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut",
        "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp",
        "slideInDown", "slideInLeft", "slideInRight", "slideInUp",
        "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"]
        for(x in animations){
            $(".animated").removeClass(animations[x]);
        }
        $(".animated").removeClass("animated");
        if (active == "home")
            runHomeAnimations();
        else if (active == "cars")
            runCarsAnimations();
    }

    function runHomeAnimations() {
        /** Home Slide Animations */
        $("#home-car").css("opacity", "0");
        $("#home-title-left, #home-title-right").css("visibility", "hidden");
        setTimeout(function () {
            $("#home-car").animateCss('fadeInUp', function () {
                $("#home-car").css("opacity", "1");
                $("#home-title-left").animateCss("slideInLeft");
                $("#home-title-right").animateCss("slideInRight");
                $("#home-title-left, #home-title-right").css("visibility", "visible");
            });
        }, pageTransitionTimeout);
    }

    function runCarsAnimations() {
        /** Cars Slide Animations **/
        var cars = $("#cars-content .car-box");
        cars.css("opacity", 0);
        cars.css("animation-duration", "500ms");
        setTimeout(function () {
            var i = 0;
            add();

            function add() {
                $(cars[i]).animateCss("fadeIn", function () {
                    $(cars[i]).css("opacity", "1")
                    if (i < cars.length) {
                        i++;
                        add();
                    }
                });
            }
        }, pageTransitionTimeout);
    }

    function changeSlideByMouse(e) {
        $(document).off("DOMMouseScroll mousewheel");
        var isScrolled = false;
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            //down
            isScrolled = changeSlide(1);
        } else {
            //up
            isScrolled = changeSlide(-1);
        }
        if (isScrolled == true) {
            setTimeout(function (e) {
                $(document).on("DOMMouseScroll mousewheel", changeSlideByMouse);
            }, pageTransitionTimeout);
        } else {
            $(document).on("DOMMouseScroll mousewheel", changeSlideByMouse);
        }
    }

    function changeSlide(direction){
        /** Changes Slide 
         * direction: -1 = previous
         * direction: +1 = next
         * **/

        var page = parseInt($(".fs-slide.active").attr("data-jquery-page-name"));

        page += direction;
        var trans  = $(".fs-slide.active").attr("data-transition");
        page = page.toString();
        if ($("#slides").page().fetch(page) === null){
            $("#slides").page().shake();
            return false;
        }
        else{
            console.log("Changing to slide " + page);
            $("#slides").page().transition(page, trans);
            $(".fs-slide.active").removeClass("active");
            $(".fs-slide[data-jquery-page-name="+page+"]").addClass("active");
            runSlideAnimations();
            return true;
        }
    }
});