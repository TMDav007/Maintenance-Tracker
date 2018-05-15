$(document). ready(function() {
    $(".menu-icon").on("click", function(){
        $("nav .menu ul").toggleClass("showing");
    })
});