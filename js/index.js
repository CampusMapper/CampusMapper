function() resizeItems() {
    var total_height = $(document).height();
    var header_height = $("div.ui-header").height();
    var footer_height = $("div.ui-footer").height();

    var height = total_height - header_height - footer_height;
    var padding = height/6 - 82; // 64 is half the size of an icon.

    $("a.cm-button-link-wrapper").css("padding-top", "" + padding);
    $("a.cm-button-link-wrapper").css("padding-bottom", "" + padding);
};
