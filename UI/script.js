$(document). ready(function() {
    $(".menu-icon").on("click", function(){
        $("nav .menu ul").toggleClass("showing");
    })
});
//dashboard menu toggle
$(document). ready(function() {
    $(".menu-icon").on("click", function(){
        $(".sidebar").toggleClass("active");
    })
});