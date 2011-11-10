$(document).ready(function() {
    var total_height = $(document).height();
    var header_height = $("div.ui-header").height();
    var footer_height = $("div.ui-footer").height();

    alert(header_height);
    alert(footer_height);

    var height = total_height - header_height - footer_height;

    $("a.cm-button-link-wrapper").css("padding-top", "" + (height/6 - 24));
    $("a.cm-button-link-wrapper").css("padding-bottom", "" + (height/6 - 24));
});
