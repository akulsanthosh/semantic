let wrap = $("#headingText");


function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function moveheading() {

    wrap.addClass("headerAfter");

}

function reversemoveheading() {

    wrap.removeClass("headerAfter");

}


function smoothscroll() {

    $(".welcome_page").addClass("blur-me");
    $(".gooey").removeClass("gooeywhite");
    $(".welcome_page").animate({ top: "-100vh" }, 500)
    $(".overview").animate({ top: "0vh" }, 500)

}

function reversesmoothscroll() {


    $(".welcome_page").removeClass("blur-me");
    $(".overview").animate({ top: "100vh" }, 500)
    $(".welcome_page").animate({ top: "0vh" }, 500)
    $(".gooey").addClass("gooeywhite");

}
$("#headingText").on("click",function(){
    moveheading()
    setTimeout(smoothscroll,1500)
    
})

