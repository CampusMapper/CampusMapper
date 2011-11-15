$(document).ready(function() {
    var height = $(document).height();
    var h_height = $("div.cm-header").height();
    var f_height = $("div.cm-footer").height();

    var total = height - h_height - f_height;

    $("div.cm-content").css("height", "" + total);
});
