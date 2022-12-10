window.addEventListener("load", function () {
  var mq = window.matchMedia("(min-width:861px)");
  if (mq.matches) {
    var widget = $(".sidebar>.has-banner.banner-fixed"),
      menu = $("header.header");
    if (widget.length) {
      var x = $(widget),
        y = $(widget).prev();
      if (data.view.isHomepage == "true") var z = $("#section-magazine");
      else z = $("#section-bottom");
      function scroll_to_fiexed() {
        if (!z.length) return false;
        var d = $(window).scrollTop(),
          e = z.offset().top,
          f = y.offset().top + y.outerHeight(),
          g = x.height(),
          h = 20;
        if (d + g > e - h) x.css({ top: (d + g - e + h) * -1, "z-index": 0 });
        else if (d > f)
          x.css({
            position: "fixed",
            top: menu.outerHeight(),
            left: x.offset().left,
            width: x.outerWidth(),
            "z-index": 998,
          });
        else x.removeAttr("style");
      }
      $(window).scroll(scroll_to_fiexed);
      scroll_to_fiexed();
      window.addEventListener("resize", function () {
        if (this.matchMedia("(max-width:860px)").matches) $(widget).hide();
        else $(widget).show();
      });
    }
  }
});
