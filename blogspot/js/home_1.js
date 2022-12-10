window.addEventListener("load", function () {
  var mq = window.matchMedia("(min-width:861px)");
  if (mq.matches) {
    (function (a) {
      function h() {
        var z = "<div></div><div></div><div></div><div></div>";
        g ||
          ((g = !0),
          d
            ? (b.find("a").hide(),
              b.find(".ellipsis").append(z),
              a.ajax(d, { dataType: "html" }).done(function (c) {
                var c = a("<div></div>").append(c.replace("")),
                  e = c.find("a.older-link");
                e ? (d = e.attr("href")) : ((d = ""), b.addClass("hidden"));
                c = c.find(i).children();
                a(i).append(c);
                b.find(".ellipsis").empty();
                b.find("a").show();
                g = !1;
                fM();
              }))
            : b.addClass("hidden"));
      }
      function k() {
        var hT = $("#loading").offset().top,
          hH = $("#loading").outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
        if (wS > hT + hH - wH && hT > wS && wS + wH > hT + hH) h();
      }
      var d = "",
        b = null,
        i = ".blog-posts",
        g = !1,
        f = a(window),
        l = a(document);
      a(document).ready(function () {
        if ((d = a("a.older-link").attr("href"))) {
          var e = a('<div class="ellipsis">');
          f.scroll(k);
          b = a('<div class="loading-wrapper flex-center"></div>');
          b.append(e);
          b.insertBefore(a(".blog-pager"));
        }
      });
    })(jQuery);
  } else {
    var a = ".blog-posts",
      b = ".post",
      elem = ".blog-pager",
      c = ".blog-pager>a",
      d = document.querySelector(c),
      e = d.getAttribute("href"),
      r = ".ellipsis",
      div =
        '<div class="ellipsis"><div></div><div></div><div></div><div></div></div>';
    function f() {
      setTimeout(function () {
        $(r).remove();
        $(d)
          .html("Không tìm thấy kết quả nào")
          .removeClass("load-more hide")
          .addClass("disabled");
      }, 500);
    }
    $(elem).removeClass("hidden");
    $(c).html("Tải thêm");
    function n(v) {
      v.preventDefault();
      $(div).appendTo($(elem));
      $(d).addClass("hide");
      if (e != "") {
        $.get(
          e,
          function (g) {
            var h = $(g).find(b);
            if (h.length) {
              var i = document.createElement("div"),
                j = $(i).append(g),
                k = j.find(c);
              if (k.length) (e = k.attr("href")), d.setAttribute("href", e);
              else e = "";
              var l = j.find(a).children(b);
              $(a).append(l);
              $(d).removeClass("hide");
              $(r).remove();
            } else f();
          },
          "html"
        );
      } else f();
    }
    $(d).on("click", n);
  }
});
