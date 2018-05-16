$(document).ready(function() {
  $(".menu-icon").on("click", function() {
    $("nav .menu ul").toggleClass("showing");
  });
  //add request
  $("#make_request").on("click", function() {
    $("#modal_make_request").fadeIn("slow");
    $("#make_request_content").fadeIn("slow");
  });
  // close
  $(".close").on("click", function() {
    $("#modal_make_request").fadeOut("slow");
    $("#make_request_content").fadeOut("slow");
  });
});
//dashboard menu toggle
$(document).ready(function() {
  $(".menu-icon").on("click", function() {
    $(".sidebar").toggleClass("active");
  });
});
