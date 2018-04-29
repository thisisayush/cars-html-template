$(document).ready(function (e) {
    var pageTransitionTimeout = 1000;

    function init() {
        runHomeAnimations();
        $(document).on("DOMMouseScroll mousewheel", changeSlideByMouse);
        $(".fs-slide-next").click(gotoNextSlide);
        $(".fs-slide-prev").click(gotoPrevSlide);
    }
    init();

    function runSlideAnimations() {
        var active = $(".fs-slide.active").attr("data-animation-context");

        if (active == "home")
            runHomeAnimations();
        else if (active == "cars")
            runCarsAnimations();
    }

    function runHomeAnimations() {
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
            isScrolled = gotoNextSlide();
        } else {
            //up
            isScrolled = gotoPrevSlide();
        }
        if (isScrolled == true) {
            setTimeout(function (e) {
                $(document).on("DOMMouseScroll mousewheel", changeSlideByMouse);
            }, pageTransitionTimeout);
        } else {
            $(document).on("DOMMouseScroll mousewheel", changeSlideByMouse);
        }
    }

    function gotoNextSlide() {
        var curr = $(".fs-slide.active");
        var next = $(".fs-slide.next");
        if (next.length == 0) {
            return false;
        }
        next.addClass("active").removeClass("next");
        curr.removeClass("active").addClass("prev");
        runSlideAnimations();
        return true;
    }

    function gotoPrevSlide() {
        var curr = $(".fs-slide.active");
        var prev = $(".fs-slide.prev");
        if (prev.length == 0) {
            return false;
        }
        $(".fs-slide.prev").addClass("active").removeClass("prev");
        curr.removeClass("active").addClass("next");
        runSlideAnimations();
        return true;
    }
});