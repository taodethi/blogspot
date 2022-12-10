var url = window.location.href,
  uri = window.location.toString(),
  isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
(fb1 = url.substring(0, url.indexOf("?fbclid"))),
  (fb2 = url.substring(0, url.indexOf("&fbclid"))),
  (gi1 = url.substring(0, url.indexOf("?gidzl"))),
  (gi2 = url.substring(0, url.indexOf("&gidzl"))),
  (m1 = url.substring(0, url.indexOf("?m=1"))),
  (m2 = url.substring(0, url.indexOf("&m=1")));
if (uri.length - fb1.length > 0)
  window.history.replaceState({}, document.title, fb1);
if (uri.length - fb2.length > 0)
  window.history.replaceState({}, document.title, fb2);
if (uri.length - gi1.length > 0)
  window.history.replaceState({}, document.title, gi1);
if (uri.length - gi2.length > 0)
  window.history.replaceState({}, document.title, gi2);
if (
  navigator.userAgent.match(
    /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS)/i
  ) === null ||
  (window.navigator.pointerEnabled && navigator.maxTouchPoints > 1)
) {
  document.documentElement.setAttribute("data-view-type", "desktop");
  if (uri.length - m1.length > 0) {
    window.history.replaceState({}, document.title, m1);
  }
  if (uri.length - m2.length > 0) {
    window.history.replaceState({}, document.title, m2);
  }
  var _a = document.querySelectorAll("a");
  for (var i = 0; i < _a.length; i++) {
    var _b = _a[i].getAttribute("href");
    if (_b != null) {
      if (_b.indexOf("?m=1") != -1)
        _a[i].setAttribute("href", _b.substr(0, _b.indexOf("?m=1")));
      if (_b.indexOf("&m=1") != -1)
        _a[i].setAttribute("href", _b.substr(0, _b.indexOf("&m=1")));
    }
  }
} else {
  document.documentElement.setAttribute("data-view-type", "mobile");
}
if (isSafari) document.documentElement.setAttribute("class", "safari");
function appendChildHead(name, type) {
  if (type == "css") {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("href", name);
  } else if (type == "js") {
    var fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("async", "");
    fileref.setAttribute("src", name);
  }
  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}
function appendChildBody(name, type) {
  if (type == "js") var src = document.createElement("script");
  src.setAttribute("async", "");
  src.setAttribute("src", name);
  if (typeof src != "undefined")
    document.getElementsByTagName("body")[0].appendChild(src);
}
function modal_open(e) {
  e.preventDefault();
  var target = "#" + $(".modal--target").attr("id");
  if ($(this).is("a")) {
    target = $(this).attr("href");
  } else {
    target = $(this).attr("data-target");
  }
  $(target).show();
  $(target)
    .find(".modal--confirm")
    .fadeIn("slow", function () {
      $(this).addClass("show");
    });
  $(".modal--close").click(function () {
    var $this = $(this);
    $this.parents(".modal--confirm").removeClass("show");
    setTimeout(function () {
      $this.parents(".modal--target").removeAttr("style");
    }, 200);
  });
  $(document).on("keyup", function (k) {
    if (k.keyCode == 27) {
      target = $(".modal--confirm.show");
      var parent = $(target).parent();
      setTimeout(function () {
        $(target).remove();
      }, 200);
    }
  });
}
function submit_form() {
  var $this = $(this);
  $this.addClass("processing");
  $this.find(".background-overlay").removeClass("hidden");
  function one(callback) {
    setTimeout(function () {
      $this.removeClass("processing").addClass("success");
      callback();
    }, 4000);
  }
  function two() {
    setTimeout(function () {
      $this.removeClass("success");
      $this.find(".background-overlay").addClass("hidden");
      $this[0].reset();
      $this.find(".required").removeClass("required");
      console.clear();
    }, 4000);
  }
  one(two);
}
function _copy(e) {
  var t = document.createElement("textarea");
  (t.value = e), document.body.appendChild(t), t.select();
  try {
    document.execCommand("copy");
  } catch (o) {
    alert("!!!");
  }
  document.body.removeChild(t);
}
function _append() {
  $("body").append(
    '<div class="modals"><div class="modals-dialog"><div class="modals-dialog-content flex-align">' +
      data.messages.linkCopiedToClipboard +
      ' <svg class="modals-dialog-buttons" height="21px" width="21px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg></div></div></div>'
  );
  setTimeout(function () {
    $(".modals").remove();
  }, 4000);
  $(".modals-dialog-buttons").click(function () {
    $(this).parents(".modals").remove();
  });
}
function page_list(e) {
  e.stopPropagation();
  var open = $(this).parents(".page-list").find(".widget-content");
  $(this).attr("aria-expanded", function (i, attr) {
    return attr == "true" ? "false" : "true";
  });
  $(this).attr("aria-pressed", function (i, attr) {
    return attr == "true" ? "false" : "true";
  });
  open.toggleClass("opened");
  open.attr("aria-hidden", function (i, attr) {
    return attr == "true" ? "false" : "true";
  });
  $(open).click(function (e) {
    e.stopPropagation();
  });
  if ($(".menu .title.more").hasClass("active"))
    $(".menu .title.more").removeClass("active");
  if ($(".menu .widget.has-more-full").hasClass("active"))
    $(".menu .widget.has-more-full").removeClass("active");
}
function switch_checked(e) {
  e.preventDefault();
  var div1 = $(this).parent().find(".first-checked"),
    div2 = $(this).parent().find(".second-checked");
  $(this).attr("checked", function (i, attr) {
    return attr == "true" ? "false" : "true";
  });
  $(this).attr("aria-checked", function (i, attr) {
    return attr == "true" ? "false" : "true";
  });
  $(this).attr("aria-label", function (i, attr) {
    return attr == "Đã tắt" ? "Đã bật" : "Đã tắt";
  });
  $(this).attr("title", function (i, attr) {
    return attr == "Bật" ? "Tắt" : "Bật";
  });
  $("body").attr("data-theme", function (i, attr) {
    return attr == "light" ? "dark" : "light";
  });
  if (div1.hasClass("false")) div1.removeClass("false").addClass("true");
  else div1.removeClass("true").addClass("false");
  if (div2.hasClass("false")) div2.removeClass("false").addClass("true");
  else div2.removeClass("true").addClass("false");
}
var templates = {
  prefix: "",
  suffix: " trước",
  seconds: "ít hơn một phút",
  minute: "một phút",
  minutes: "%d phút",
  hour: "một giờ",
  hours: "%d giờ",
  day: "24 giờ",
  days: "%d ngày",
  month: "một tháng",
  months: "%d tháng",
  year: "một năm",
  years: "%d năm",
};
var template = function (t, n) {
  return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
};
var formatTimer = function (time) {
  if (!time) return;
  time = time.replace(/\.\d+/, "");
  time = time.replace(/-/, "/").replace(/-/, "/");
  time = time.replace(/T/, " ").replace(/Z/, " UTC");
  time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
  time = new Date(time * 1000 || time);
  var now = new Date(),
    seconds = ((now.getTime() - time) * 0.001) >> 0,
    minutes = seconds / 60,
    hours = minutes / 60,
    days = hours / 24,
    years = days / 365;
  return (
    templates.prefix +
    ((seconds < 45 && template("seconds", seconds)) ||
      (seconds < 90 && template("minute", 1)) ||
      (minutes < 45 && template("minutes", minutes)) ||
      (minutes < 90 && template("hour", 1)) ||
      (hours < 24 && template("hours", hours)) ||
      (hours < 42 && template("day", 1)) ||
      (days < 30 && template("days", days)) ||
      (days < 45 && template("month", 1)) ||
      (days < 365 && template("months", days / 30)) ||
      (years < 1.5 && template("year", 1)) ||
      template("years", years)) +
    templates.suffix
  );
};
function fM() {
  var tM = document.querySelectorAll(".post_meta>.post_date");
  for (var i = 0; i < tM.length; i++) {
    tM[i].innerHTML =
      "<time>" + formatTimer(tM[i].getAttribute("data-date")) + "</time>";
  }
}
function callmarkup1() {
  const header = document.querySelector("header.header"),
    more = $(".menu .title.more"),
    menu = document.querySelector(".menu"),
    title = document.querySelectorAll(".menu .title:not(.home)"),
    button = document.querySelector(".header button.open"),
    input = document.querySelector(".web-search input"),
    reset = document.querySelector(".web-search .reset"),
    overlay = document.querySelector(".overlay"),
    elems = document.querySelectorAll("header.header,.overlay,body"),
    close = document.querySelectorAll(".menu .home,.overlay"),
    search = $(".header-search-icon>a"),
    page = $(".header-page-icon>a"),
    scrollTop = document.querySelector(".scroll--top");
  if (window.matchMedia("(max-width:860px)").matches) {
    for (var i = 0; i < title.length; i++) title[i].classList.add("has-sub");
  }
  window.addEventListener("resize", function () {
    if (this.matchMedia("(max-width:860px)").matches) {
      for (var i = 0; i < title.length; i++) {
        title[i].classList.add("has-sub");
        title[i].addEventListener("click", function () {
          this.classList.toggle("has-toggle");
        });
      }
    } else {
      if (!menu.classList.contains("section")) menu.classList.add("section");
      if (!overlay.classList.contains("hidden"))
        overlay.classList.add("hidden");
      for (var i = 0; i < title.length; i++)
        title[i].classList.remove("has-sub");
    }
  });
  for (var i = 0; i < title.length; i++) {
    if (title[i].classList.contains("has-sub")) {
      title[i].addEventListener("click", function () {
        this.classList.toggle("has-toggle");
      });
    }
  }
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-pressed", "true");
    overlay.classList.remove("hidden");
    menu.classList.remove("section");
  });
  for (var i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function () {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-pressed", "false");
      overlay.classList.add("hidden");
      menu.classList.add("section");
    });
  }
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  input.addEventListener("keyup", function () {
    reset.classList.remove("hidden");
  });
  reset.addEventListener("click", function (e) {
    input.setAttribute("value", "");
    reset.classList.add("hidden");
  });
  $(more).click(function () {
    $(this).toggleClass("active");
    $(this).parent().toggleClass("active");
  });
  $(search).click(function (e) {
    e.stopPropagation();
    $(".header-right>div").attr("expanded", "true");
    $(input).focus();
    if ($(more).hasClass("active")) $(more).removeClass("active");
    if ($(".menu .widget.has-more-full").hasClass("active"))
      $(".menu .widget.has-more-full").removeClass("active");
  });
  $(".web-search").click(function (e) {
    e.stopPropagation();
  });
  if (data.view.isSearchQuery == "true") {
    $(search).attr({ "aria-expanded": "true", "aria-pressed": "true" });
    $(".header+div").attr("expanded", "true");
  }
  $("html,.header .open,.menu").click(function () {
    $(".header-right>div").attr("expanded", "false");
    $(".header-page-icon>a").attr({
      "aria-expanded": "false",
      "aria-pressed": "false",
    });
    $(".page-list .widget-content")
      .removeClass("opened")
      .attr("aria-hidden", "true");
  });
  window.addEventListener("scroll", function () {
    if (this.pageYOffset == 0) {
      scrollTop.classList.remove("show");
      scrollTop.classList.add("hide");
    } else {
      scrollTop.classList.add("show");
      scrollTop.classList.remove("hide");
    }
  });
  scrollTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
function callmarkup2() {
  var nabar = document.querySelector(".footer-navigation-bar"),
    x = window.pageYOffset,
    menu = document.querySelector(".menu"),
    overlay = document.querySelector(".overlay"),
    search = $(".footer-navigation-bar .open-search");
  window.addEventListener("scroll", function () {
    var y = window.pageYOffset,
      z = document.documentElement.scrollHeight - 1100;
    if (x > 50) nabar.classList.remove("visible");
    else nabar.classList.add("visible");
    if (y > z) nabar.classList.add("visible");
    x = y;
  });
  $(".footer-navigation-bar .open-menu").click(function (e) {
    e.stopPropagation();
    $(menu).removeClass("section");
    $(overlay).removeClass("hidden");
  });
  $(search).click(function () {
    $("html,body").animate({ scrollTop: 0 }, "slow", function () {
      $(".header-right>div").attr("expanded", "true");
      if ($(".header-right>div").attr("expanded") == "true")
        $(".web-search input[type=search]").focus();
    });
  });
  $(".scroll-top").click(function () {
    $("html,body").animate({ scrollTop: 0 }, "slow");
  });
  if (data.view.isPost == "true") {
    $(".footer-navigation-bar .sroll-comments").click(function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: $("#comments").offset().top - $("header.header").height(),
        },
        1000
      );
    });
  }
}
function callmarkup3() {
  appendChildHead(
    "https://cdn.jsdelivr.net/gh/vietblogdao/css/themify-icons.min.css",
    "css"
  );
  var widget = $(".widget.data-video"),
    wid = $(".section-multimedia"),
    d = $(widget).find(".data-config"),
    cof = $(wid).find(".data-config"),
    cat = $(cof).attr("data-category"),
    cou = Number($(cof).attr("data-count")),
    cate_video = $(d).attr("data-box-category"),
    item = Number($(d).attr("data-box-items")),
    cat_url = "/search/label/" + cat + "?max-results=" + cou,
    _video = 0,
    _multimedia = 0,
    _coverage = 0,
    fN = $(".first-news-coverage"),
    cate_src = "/search/label/" + cate_video + "?max-results=1",
    cate_href = "/search/label/" + cate_video + "?max-results=" + item;
  function show_coverage() {
    if (_coverage == 0) {
      _coverage = 1;
      if (fN.length != "") {
        $(fN).each(function (i) {
          var sB =
              '<div class="section-thumbnail"><a href="/search/label/' +
              $(fN[i]).attr("data-label") +
              '" style="background-image:url(' +
              $(fN[i]).attr("data-image") +
              ')"></a></div>',
            sT =
              '<header class="section-title"><h3><a href="/search/label/' +
              $(fN[i]).attr("data-label") +
              '">' +
              $(fN[i]).attr("data-title") +
              "</a></h3></header>",
            sC =
              '<div class="section-content"><div class="article-list float-left w100"></div></div>';
          $(fN[i]).html(sB + sT + sC);
          $.get(
            "/feeds/posts/default/-/" +
              $(fN[i]).attr("data-label") +
              "?alt=json-in-script&max-results=" +
              $(fN[i]).attr("data-count"),
            function (e) {
              if (e.feed.entry) {
                for (var f = 0; f < e.feed.entry.length; f++) {
                  var entry = e.feed.entry[f],
                    eT = entry.title.$t;
                  for (var a = 0; a < entry.link.length; a++) {
                    if (entry.link[a].rel == "alternate") {
                      if (data.view.isMobile == "true") {
                        var eL = entry.link[a].href + "?m=1";
                        break;
                      } else eL = entry.link[a].href;
                    }
                  }
                  if ("category" in entry) {
                    for (var k = 0; k < entry.category.length; k++)
                      var lN = entry.category[k].term,
                        lU = "/search/label/" + lN;
                  }
                  if ("content" in entry)
                    var eM = entry.content.$t.replace(
                      '<div class="hidden">',
                      '<p class="article-summary">'
                    );
                  else if ("summary" in entry)
                    eM = entry.summary.$t.replace(
                      '<div class="hidden">',
                      '<p class="article-summary">'
                    );
                  var cT =
                    '<article class="article-item"><header><p class="article-title"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '">' +
                    eT +
                    '</a></p><p class="article-meta"><span class="article-publish">' +
                    formatTimer(entry.published.$t) +
                    '</span><a href="' +
                    lU +
                    '" title="' +
                    lN +
                    '"><span class="category-parent">' +
                    lN +
                    "</span></a></p>" +
                    eM +
                    "</header></article>";
                  $(fN[i]).find(".article-list").append(cT);
                }
              }
            },
            "jsonp"
          );
        });
      }
    }
  }
  function show_multimedia() {
    if (_multimedia == 0) {
      _multimedia = 1;
      $.get(cat_url, function (e) {
        var a = $(e).find(".widget.label .post");
        if (a.length) {
          var b = [];
          if (a.length < cou) cou = a.length;
          for (var m = 0; m < cou; m++) b.push(m);
          b.forEach(function (k) {
            var htmls =
              '<article class="post">' + $(a[k]).html() + "</article>";
            $(wid).find(".multimedia-layout").append(htmls);
          });
          $(wid).find(".multimedia-layout").removeClass("loading");
        }
      });
    }
  }
  function show_video() {
    if (_video == 0) {
      _video = 1;
      $.get(cate_src, function (e) {
        var a = $(e).find(".widget.label .post");
        if (a.length) {
          var v = "";
          if ($(a).attr("data-video") != null)
            var src = $(a).attr("data-video");
          else src = "https://www.youtube.com/embed/RXIm1NLCSz0";
          v =
            '<div class="video-item w-100"><div class="video-container"><iframe allowfullscreen="" src=' +
            src +
            "></iframe></div></div>";
          $(widget).find(".video-player").append(v);
          $(widget).find(".video-player").removeClass("loading");
        }
      });
      $.get(cate_href, function (e) {
        var a = $(e).find(".widget.label .post");
        if (a.length) {
          var b = [];
          if (a.length < item) item = a.length;
          for (var m = 0; m < item; m++) b.push(m);
          b.forEach(function (k) {
            var htmls =
              '<article class="post">' + $(a[k]).html() + "</article>";
            $(widget).find(".video-list").append(htmls);
          });
          $(widget).find(".data-content").removeClass("loading");
          setTimeout(function () {
            var wH = $(".video-player").height();
            $(".video-list").css({ height: wH, "overflow-y": "auto" });
          }, 1000);
        }
      });
    }
  }
  //window.addEventListener('scroll',function(){show_coverage();show_video();show_multimedia()})
  //if($(window).scrollTop()>0){show_coverage();show_video();show_multimedia()}
  //setTimeout(function(){show_coverage();show_video();show_multimedia()},3000)
  if ($("#home-slider .glide__slides li").length > 0) {
    $.getScript("https://cdn.jsdelivr.net/gh/vietblogdao/js/glide.min.js").done(
      function () {
        var glide1 = new Glide("#home-slider", {
          type: "slider",
          perView: 5,
          gap: 20,
          focusAt: 0,
          breakpoints: {
            960: { perView: 4 },
            768: { perView: 3 },
            640: { perView: 2 },
            550: {
              startAt: 0,
              perView: 1,
              gap: 10,
              autoplay: 4000,
              hoverpause: !0,
            },
          },
        });
        glide1.mount();
        if ($("#most-article").length) {
          var glide2 = new Glide("#most-article", {
            type: "slider",
            perView: 4,
            gap: 0,
            focusAt: 0,
            breakpoints: {
              960: { perView: 4, gap: 20 },
              768: { perView: 3, gap: 20 },
              640: { perView: 2, gap: 20 },
              550: {
                startAt: 0,
                perView: 1,
                gap: 10,
                autoplay: 4000,
                hoverpause: !0,
              },
            },
          });
          glide2.mount();
        }
      }
    );
  }
  if (
    data.view.isMobile != "true" &&
    $(".widget.homepage .post:last-child").length
  ) {
    var isLoaded = 0,
      pL = $(".widget.homepage .post:last-child"),
      oS = pL.offset().top - 100;
    function append_data() {
      if (isLoaded == 0) {
        isLoaded = 1;
        if (pL.length != "") {
          const iS =
            "/search?updated-max=" +
            pL.find(".post_date").attr("data-date").replace("+", "%2B") +
            "&max-results=20";
          $.get(iS, function (e) {
            const a = $(e).find(".Blog .post");
            if (a.length) {
              for (var i = 0; i < a.length; i++) {
                const dT =
                  '<article class="post" data-article-id=' +
                  $(a[i]).attr("data-article-id") +
                  ">" +
                  $(a[i]).html() +
                  "</article>";
                $(dT).insertAfter($(pL));
              }
              fM();
            }
          });
        }
      }
    }
    $(window).scroll(function () {
      if ($(this).scrollTop() >= oS) append_data();
    });
  }
}
function callmarkup4() {
  var _feeds = 0;
  function _cate() {
    if (_feeds == 0) {
      _feeds = 1;
      var cate = $(".data-entry");
      if (cate.length != "") {
        $(cate).each(function (i) {
          var custom = $(cate[i]).find(".data-config"),
            r = Number($(custom).attr("data-box-items")),
            cate_type = $(custom).attr("data-box-type"),
            layout = $(custom).attr("data-box-layout"),
            summary = $(custom).attr("data-box-summary");
          if ($(custom).attr("data-box-category") != null)
            var cate_name = $(custom).attr("data-box-category");
          else cate_name = "";
          if (cate_type == "recent") var cate_url = "/feeds/posts/default";
          else if (cate_type == "label")
            cate_url = "/feeds/posts/default/-/" + cate_name;
          else if (cate_type == "random")
            cate_url = "/feeds/posts/summary?alt=json&max-results=0";
          else if (cate_type == "related")
            cate_url =
              "/feeds/posts/summary/-/" + cate_name + "?alt=json&max-results=0";
          else cate_url = "";
          function create_video(e) {
            e.preventDefault();
            var parents = $(this).parents(".data-item-thumb"),
              src = $(parents).attr("data-video");
            $(parents)
              .addClass("video-container")
              .html(
                '<iframe allowfullscreen="" frameborder="0" src=' +
                  src +
                  "></iframe>"
              );
          }
          function get_data(e) {
            console.log(e);
            if (e.feed.entry) {
              for (var f = 0; f < e.feed.entry.length; f++) {
                var entry = e.feed.entry[f],
                  entry_title = entry.title.$t;
                for (var a = 0; a < entry.link.length; a++) {
                  if (entry.link[a].rel == "alternate") {
                    if (data.view.isMobile == "true") {
                      var entry_alternate = entry.link[a].href + "?m=1";
                      break;
                    } else entry_alternate = entry.link[a].href;
                  }
                }
                var data_title =
                  '<div class="data-item-title"><a href=' +
                  entry_alternate +
                  ' title="' +
                  entry_title +
                  '">' +
                  entry_title +
                  "</a></div>";
                for (var b = 0; b < entry.link.length; b++) {
                  if (entry.link[b].rel == "related") {
                    var entry_related = entry.link[b].href;
                    break;
                  }
                }
                if ("media$thumbnail" in entry) {
                  var entry_thumb = entry.media$thumbnail.url.replace(
                    "s72-c",
                    "s1600"
                  );
                } else {
                  var st = entry.content.$t,
                    at = st.indexOf("<img"),
                    bt = st.indexOf('src="', at),
                    ct = st.indexOf('"', bt + 5),
                    dt = st.substr(bt + 5, ct - bt - 5);
                  if (at != -1 && bt != -1 && ct != -1 && dt != "")
                    entry_thumb = dt;
                  else
                    entry_thumb =
                      "https://4.bp.blogspot.com/-00O66C-eBQs/W0IcokXSnOI/AAAAAAAAL_k/g4KtDm7SkQsoe7_G0vZ_C_nU0Gf_-kyVQCLcBGAs/s1600/safe_image.png";
                }
                if ("category" in entry) {
                  var str = [];
                  for (var c = 0; c < entry.category.length; c++)
                    str.push(entry.category[c].term);
                  if (str.includes(data.label.video))
                    var data_img =
                      '<div class="data-item-thumb thumb_icon thumb_video"><a class="img has--img" href=' +
                      entry_alternate +
                      ' title="' +
                      entry_title +
                      '"><img alt="' +
                      entry_title +
                      '" class="lazyload" data-src=' +
                      entry_thumb +
                      ' src="https://cdn.jsdelivr.net/gh/vietblogdao/images/bg_img.jpg"></a></div>';
                  else if (str.includes(data.label.photo))
                    data_img =
                      '<div class="data-item-thumb thumb_icon thumb_photo"><a class="img has--img" href=' +
                      entry_alternate +
                      ' title="' +
                      entry_title +
                      '"><img alt="' +
                      entry_title +
                      '" class="lazyload" data-src=' +
                      entry_thumb +
                      ' src="https://cdn.jsdelivr.net/gh/vietblogdao/images/bg_img.jpg"></a></div>';
                  else
                    data_img =
                      '<div class="data-item-thumb"><a class="img has--img" href=' +
                      entry_alternate +
                      ' title="' +
                      entry_title +
                      '"><img alt="' +
                      entry_title +
                      '" class="lazyload" data-src=' +
                      entry_thumb +
                      ' src="https://cdn.jsdelivr.net/gh/vietblogdao/images/bg_img.jpg"></a></div>';
                } else {
                  data_img =
                    '<div class="data-item-thumb"><a class="img has--img" href=' +
                    entry_alternate +
                    ' title="' +
                    entry_title +
                    '"><img alt="' +
                    entry_title +
                    '" class="lazyload" data-src=' +
                    entry_thumb +
                    ' src="https://cdn.jsdelivr.net/gh/vietblogdao/images/bg_img.jpg"></a></div>';
                }
                if ("content" in entry)
                  var entry_summary = entry.content.$t.replace(
                    '<div class="hidden">',
                    "<p>"
                  );
                else if ("summary" in entry)
                  entry_summary = entry.summary.$t.replace(
                    '<div class="hidden">',
                    "<p>"
                  );
                else entry_summary = "Không có mô tả tóm tắt";
                if ($(cate[i]).hasClass("box-video")) {
                  var contents =
                    '<article class="data-item"><div><div class="data-item-thumb" data-video=' +
                    entry_related +
                    '><a class="img has--img" href=' +
                    entry_alternate +
                    ' title="' +
                    entry_title +
                    '"><img alt="' +
                    entry_title +
                    '" class="lazyload" data-src=' +
                    entry_thumb +
                    ' src="https://cdn.jsdelivr.net/gh/vietblogdao/images/bg_img.jpg"><span class="icon-play"></span></a></div><div class="data-item-body">' +
                    data_title +
                    "</div></div></article>";
                } else {
                  entry_summary = "";
                  if (summary == "true") {
                    contents =
                      '<article class="data-item"><div>' +
                      data_img +
                      '<div class="data-item-body">' +
                      data_title +
                      '<div class="data-item-summary">' +
                      entry_summary +
                      "</div></div></div></article>";
                  } else {
                    contents =
                      '<article class="data-item"><div>' +
                      data_img +
                      '<div class="data-item-body">' +
                      data_title +
                      "</div></div></article>";
                  }
                }
                $(cate[i])
                  .find(".data-content")
                  .append(contents)
                  .removeClass("loading");
              }
              if ($(cate[i]).hasClass("box-video"))
                $(".box-video .data-item:nth-of-type(1) .icon-play").on(
                  "click",
                  create_video
                );
            }
          }
          if (cate_type == "random") {
            $.get(
              cate_url,
              function (data) {
                if (data.feed) {
                  var a = data.feed.openSearch$totalResults.$t;
                  if (a < r) r = a;
                  let arr = [];
                  do {
                    let num = Math.floor(Math.random() * a);
                    arr.push(num);
                    arr = arr.filter((x, y) => {
                      return arr.indexOf(x) === y;
                    });
                  } while (arr.length < r);
                  arr.forEach(function (m) {
                    m += 1;
                    $.ajax({
                      type: "GET",
                      url: "/feeds/posts/default",
                      data: {
                        alt: "json-in-script",
                        "start-index": m,
                        "max-results": 1,
                      },
                      dataType: "jsonp",
                      success: get_data,
                    });
                  });
                }
              },
              "jsonp"
            );
          } else if (cate_type == "related") {
            $.get(
              cate_url,
              function (data) {
                if (data.feed) {
                  var a = data.feed.openSearch$totalResults.$t;
                  if (a < r) r = a;
                  let arr = [];
                  do {
                    let num = Math.floor(Math.random() * a);
                    arr.push(num);
                    arr = arr.filter((x, y) => {
                      return arr.indexOf(x) === y;
                    });
                  } while (arr.length < r);
                  arr.forEach(function (m) {
                    m += 1;
                    $.ajax({
                      type: "GET",
                      url: "/feeds/posts/default/-/" + cate_name,
                      data: {
                        alt: "json-in-script",
                        "start-index": m,
                        "max-results": 1,
                      },
                      dataType: "jsonp",
                      success: get_data,
                    });
                  });
                }
              },
              "jsonp"
            );
          } else
            $.ajax({
              type: "GET",
              url: cate_url,
              data: { alt: "json-in-script", "max-results": r },
              dataType: "jsonp",
              success: get_data,
            });
        });
      }
    }
  }
  window.addEventListener("scroll", function () {
    _cate();
  });
  window.addEventListener("mousemove", function () {
    _cate();
  });
  if ($(window).scrollTop() > 0) _cate;
  setTimeout(function () {
    _cate();
  }, 2000);
}
function callmarkup5() {
  var is_load = 0;
  function append_fancybox() {
    if (is_load == 0) {
      is_load = 1;
      appendChildHead(
        "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css",
        "css"
      );
      appendChildHead(
        "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js",
        "js"
      );
    }
  }
  window.addEventListener("scroll", function () {
    append_fancybox();
  });
  window.addEventListener("mousemove", function () {
    append_fancybox();
  });
  setTimeout(function () {
    append_fancybox();
  }, 3000);
  if ($(window).scrollTop() > 0) append_fancybox();
  $(".separator,.tr-caption-container").removeAttr("style");
  $(".separator a,.tr-caption-container a")
    .attr("data-fancybox", "gallery")
    .removeAttr("imageanchor style");
  $(".tr-caption-container").each(function () {
    var caption = $(this).find(".tr-caption").text();
    $(this).find("a").attr("data-caption", caption);
  });
}
function callmarkup6() {
  $(".font-size-increase>.font-size").click(function () {
    $(this).addClass("active");
    $(".font-size-increase>.font-size").not($(this)).removeClass("active");
  });
  $(".font-size.default").click(function () {
    if ($(".article-summary>p,.article-body").hasClass("font-increase"))
      $(".article-summary>p,.article-body").removeClass("font-increase");
  });
  if ($("article.article").hasClass("article-cover")) {
    var bg = $(".article-cover .article-body img.bg");
    if (bg.length != "")
      $(".article-cover .header-bg").css(
        "background-image",
        "url(" + $(bg).attr("src") + ")"
      );
    else
      $(".article-cover .header-bg").css(
        "background-image",
        "url(" + $('meta[property="og:image"]').attr("content") + ")"
      );
  }
  var img = $(
    ".tr-caption-container tr:first-child img,.separator:not(.hidden) img"
  );
  if (img.length > 0) {
    var ori = "",
      or1 = "",
      or2 = "",
      or3 = "",
      wit = "",
      hei = "";
    function resizeImage() {
      $(img).each(function (i) {
        var index = $(img[i]),
          offset = index.offset().top;
        ori = index.attr("src");
        or1 = ori.substr(0, ori.lastIndexOf("/"));
        or2 = or1.substr(0, or1.lastIndexOf("/"));
        or3 = ori.replace(or1.substr(or2.length + 1, or1.length), "s1600");
        wit = index.data("original-width");
        hei = index.data("original-height");
        if (offset < $(window).scrollTop() + $(window).innerHeight())
          $(img[i])
            .attr({ src: or3, width: wit, height: hei })
            .css("filter", "none");
      });
    }
    window.addEventListener("load", resizeImage);
    window.addEventListener("scroll", resizeImage);
    window.addEventListener("rezize", resizeImage);
    if (document.documentElement.scrollTop > 0) resizeImage();
  }
  var q = $(".article-body .box-question>.question"),
    w = [
      "Bạn là thần đồng",
      "Bạn rất suất xắc",
      "Kiến thức của bạn khá tốt",
      "Bạn có thể làm tốt hơn thế",
    ];
  if (q.length !== "") {
    $(q).each(function (n) {
      var ul = $(q[n]).find("ul"),
        mes = $(q[n]).parent().find(".message");
      $(ul).each(function (i, v) {
        var li = $(ul[i]).find("li"),
          p = $(ul[i]).next("p"),
          cor = $(ul[i]).find("li.correct");
        $(li).one("click", function () {
          $(this).parent().addClass("answered");
          $(this).addClass("selected");
          $(p).appendTo($(cor)).addClass("explaination");
          if (i == ul.length - 1) {
            var corr = $(ul).find("li.correct.selected").length,
              s = (corr * 100) / ul.length - 1;
            (v =
              '<span class="correct">' +
              corr +
              '</span><span class="total">' +
              ul.length +
              "</span>"),
              $(v).insertAfter($(mes));
            w.forEach(function () {
              if (s == 100) $(mes).html(w[0]);
              else if (s >= 80) $(mes).html(w[1]);
              else if (s >= 50) $(mes).html(w[2]);
              else $(mes).html(w[3]);
            });
          }
        });
      });
    });
  }
  var sticky = $(".article-social-pin"),
    navfixed = $(".header-navigation-bar"),
    h = $(".article-header").offset().top,
    f =
      $(".article-footer").offset().top - ($(".article-footer").height() + 150),
    scr = $(window).scrollTop();
  if (sticky.length != "") {
    if (scr > h) {
      navfixed.removeClass("visible");
      sticky.addClass("show").removeClass("hide");
    }
    $(window).scroll(function () {
      scr = $(this).scrollTop();
      if (scr >= f) {
        sticky.removeClass("show").addClass("hide");
        navfixed.addClass("visible");
      } else if (scr >= h) {
        sticky.addClass("show").removeClass("hide");
        navfixed.removeClass("visible");
      } else {
        sticky.removeClass("show").addClass("hide");
        navfixed.addClass("visible");
      }
    });
    $(".copy-clipboard").click(function () {
      _copy(data.blog.url);
      _append();
    });
    $(".article-social-pin li:not(.btnHome)>a").click(function (ev) {
      ev.preventDefault();
    });
    $(".header-navigation-bar .sendBtn").click(function () {
      FB.ui(
        {
          method: "send",
          display: "popup",
          mobile_iframe: true,
          link: data.blog.url,
        },
        function (a) {}
      );
    });
    $(".header-navigation-bar .feedBtn").click(function () {
      FB.ui(
        {
          method: "feed",
          display: "popup",
          mobile_iframe: true,
          link: data.blog.url,
        },
        function (b) {}
      );
    });
    $(".article-social-pin .btnFacebook>a, .facebook-share-button").click(
      function () {
        FB.ui(
          {
            method: "share",
            display: "popup",
            mobile_iframe: true,
            href: data.blog.url,
          },
          function (t) {}
        );
      }
    );
    $(".article-social-pin .btnTwitter>a").click(function (t) {
      t.preventDefault();
      t = $(this).parent().attr("data-href");
      var o = screen.width / 2 - 200,
        n = screen.height / 2 - 225;
      window.open(
        t,
        "popUpWindow",
        "height=450,width=400,left=" +
          o +
          ",top=" +
          n +
          ",resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
      );
    });
    $(".article-social-pin .btnComment>a,.scroll-to-comments").click(
      function () {
        $("html,body").animate(
          {
            scrollTop:
              $("#comments").offset().top - $("header.header").height(),
          },
          800
        );
      }
    );
    $(".header-navigation-bar>div>div").click(function (e) {
      e.stopPropagation();
    });
    $(".header-navigation-bar>div").click(function () {
      $("html,body").animate({ scrollTop: 0 }, "slow");
    });
  }
  $(".font-size.large").click(function () {
    if (!$(".article-summary>p,.article-body").hasClass("font-increase"))
      $(".article-summary>p,.article-body").addClass("font-increase");
  });
  if (data.view.isMobile !== "true") {
    $(".header+div.refresh").removeClass("refresh");
    $(".menu .title>a").each(function () {
      var x = $(".breadcrumbs ul li:last-child a").attr("title"),
        y = $(this).attr("title");
      if (x == y) {
        $(this).parent().addClass("current");
        $(".menu .title>a").not($(this).parent()).removeClass("current");
      }
    });
    var a = 5,
      b = $("#banner-article"),
      br = $(".article-body>div:nth-of-type(2)").find("br"),
      e = Math.ceil(br.length / 2);
    if (br.length != "") {
      if (b.length != "") {
        if (br.length > a) $(b).insertAfter(br[e]).removeClass("hidden");
        else $(b).remove();
      }
    }
    const error = document.createElement("div");
    error.setAttribute("id", "error-report");
    error.setAttribute("class", "hidden");
    error.innerHTML =
      '<button id="btn-report-error">Báo lỗi</button><button id="btn-report-share">Chia sẻ</button>';
    document.body.appendChild(error);
    const sel = document.querySelectorAll(
        ".article-header .article-title,.article-summary p,.article-body>div:nth-of-type(2)"
      ),
      tooltip = document.getElementById("error-report"),
      report_error = document.getElementById("btn-report-error"),
      report_share = document.getElementById("btn-report-share");
    function getText() {
      if (window.getSelection) return window.getSelection();
    }
    for (var i = 0; i < sel.length; i++) {
      sel[i].addEventListener("mouseup", function () {
        const selection = getText();
        if (selection.toString().length >= 1) {
          const oRect = selection.getRangeAt(0).getBoundingClientRect(),
            left = oRect.left + "px",
            top = $("header.header").offset().top + oRect.top - 50 + "px";
          setTimeout(function () {
            tooltip.setAttribute("style", "top:" + top + ";left:" + left + "");
            tooltip.classList.remove("hidden");
          }, 100);
        } else {
          if (tooltip.hasAttribute) tooltip.removeAttribute("style");
          tooltip.classList.add("hidden");
        }
      });
    }
    report_error.addEventListener("click", function () {
      location.href = data.url.contact;
    });
    report_share.addEventListener("click", function () {
      FB.ui(
        {
          method: "share",
          display: "popup",
          mobile_iframe: true,
          href: data.blog.url,
        },
        function (t) {}
      );
    });
  }
  $(
    '.article-body div.hidden,.article-body img.hidden,.article-body a[name="more"]'
  ).remove();
  var load_recent = 0;
  function get_recent() {
    if (load_recent == 0) {
      load_recent = 1;
      //appendChildBody('https://sp.zalo.me/plugins/sdk.js','js')
      var index = 20,
        x = $(".RecentPosts>.widget-content"),
        g = ".blog-pager",
        h = ".blog-pager>a",
        j = ".ellipsis",
        f = "",
        k =
          '<div class="ellipsis"><div></div><div></div><div></div><div></div></div>',
        aN = $("#article-timeline"),
        aR = $("#article-coverage"),
        tR = $(".blog-posts>article.article");
      if (aR.length != "") {
        var sT =
            '<header class="section-title"><h3><a href="/search/label/' +
            aR.attr("data-label") +
            '">' +
            aR.attr("data-title") +
            "</a></h3></header>",
          sC =
            '<div class="section-content"><div class="article-list"></div></div>';
        aR.html(sT + sC);
        $.get(
          "/feeds/posts/summary/-/" +
            aR.attr("data-label") +
            "?alt=json-in-script&max-results=" +
            aR.attr("data-count"),
          function (e) {
            if (e.feed.entry) {
              for (var f = 0; f < e.feed.entry.length; f++) {
                var entry = e.feed.entry[f],
                  eT = entry.title.$t;
                for (var a = 0; a < entry.link.length; a++) {
                  if (entry.link[a].rel == "alternate") {
                    var eL = entry.link[a].href;
                    break;
                  }
                }
                if (eL === data.blog.url) {
                  var cT =
                    '<article class="article-item current"><header><p class="article-title"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '">' +
                    eT +
                    '</a></p><p class="article-meta"><span class="article-publish">' +
                    formatTimer(entry.published.$t) +
                    "</span></p></header></article>";
                  aR.find(".article-list").append(cT);
                  aR.find(".article-item.current").remove();
                } else {
                  cT =
                    '<article class="article-item"><header><p class="article-title"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '">' +
                    eT +
                    '</a></p><p class="article-meta"><span class="article-publish">' +
                    formatTimer(entry.published.$t) +
                    "</span></p></header></article>";
                  aR.find(".article-list").append(cT);
                }
              }
            }
          },
          "jsonp"
        );
      }
      if (aN.length != "") {
        var sT =
            '<header class="section-title"><h3><a href="/search/label/' +
            aN.attr("data-label") +
            '">' +
            aN.attr("data-title") +
            "</a></h3></header>",
          sC =
            '<div class="section-content"><div class="article-list"></div></div>';
        aN.html(sT + sC);
        $.get(
          "/feeds/posts/default/-/" +
            aN.attr("data-label") +
            "?alt=json-in-script&max-results=" +
            aN.attr("data-count"),
          function (e) {
            if (e.feed.entry) {
              for (var f = 0; f < e.feed.entry.length; f++) {
                var entry = e.feed.entry[f],
                  eT = entry.title.$t;
                for (var a = 0; a < entry.link.length; a++) {
                  if (entry.link[a].rel == "alternate") {
                    var eL = entry.link[a].href;
                    break;
                  }
                }
                if ("media$thumbnail" in entry) {
                  var eB = entry.media$thumbnail.url.replace("s72-c", "s1600");
                } else {
                  var st = entry.content.$t,
                    at = st.indexOf("<img"),
                    bt = st.indexOf('src="', at),
                    ct = st.indexOf('"', bt + 5),
                    dt = st.substr(bt + 5, ct - bt - 5);
                  if (at != -1 && bt != -1 && ct != -1 && dt != "")
                    entry_thumb = dt;
                  else
                    eB =
                      "https://4.bp.blogspot.com/-00O66C-eBQs/W0IcokXSnOI/AAAAAAAAL_k/g4KtDm7SkQsoe7_G0vZ_C_nU0Gf_-kyVQCLcBGAs/s1600/safe_image.png";
                }
                if ("content" in entry)
                  var eM = entry.content.$t.replace(
                    '<div class="hidden">',
                    '<p class="article-summary">'
                  );
                else if ("summary" in entry)
                  eM = entry.summary.$t.replace(
                    '<div class="hidden">',
                    '<p class="article-summary">'
                  );
                if (eL === data.blog.url) {
                  var cT =
                    '<article class="article-item current"><p class="article-thumbnail"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '"><img alt="' +
                    eT +
                    '" src=' +
                    eB +
                    '></a></p><header><p class="article-title"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '">' +
                    eT +
                    '</a></p><p class="article-meta"><span class="article-publish">' +
                    formatTimer(entry.published.$t) +
                    "</span></p>" +
                    eM +
                    "</header></article>";
                  aN.find(".article-list").append(cT);
                  aN.find(".article-item.current").remove();
                } else {
                  cT =
                    '<article class="article-item"><p class="article-thumbnail"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '"><img alt="' +
                    eT +
                    '" src=' +
                    eB +
                    '></a></p><header><p class="article-title"><a href=' +
                    eL +
                    ' title="' +
                    eT +
                    '">' +
                    eT +
                    '</a></p><p class="article-meta"><span class="article-publish">' +
                    formatTimer(entry.published.$t) +
                    "</span></p>" +
                    eM +
                    "</header></article>";
                  aN.find(".article-list").append(cT);
                }
              }
            }
          },
          "jsonp"
        );
      }
      if (tR.hasClass("type-replated")) {
        var rL = '<div id="related-article" class="related-article"></div>';
        if (aR.length != "") $(rL).insertBefore(aR);
        else if (aN.length != "") $(rL).insertBefore(aN);
        else $(rL).appendTo($(".article-body>div:nth-of-type(2)"));
        var n = Number(tR.attr("data-count"));
        console.log(
          "/feeds/posts/summary/-/" +
            tR.attr("data-label") +
            "?alt=json&max-results=0"
        );
        $.get(
          "/feeds/posts/summary/-/" +
            tR.attr("data-label") +
            "?alt=json&max-results=0",
          function (d) {
            if (d.feed) {
              var a = d.feed.openSearch$totalResults.$t;
              if (a < n) n = a;
              let arr = [];
              do {
                let num = Math.floor(Math.random() * a);
                arr.push(num);
                arr = arr.filter((x, y) => {
                  return arr.indexOf(x) === y;
                });
              } while (arr.length < n);
              arr.forEach(function (m) {
                m += 1;
                $.ajax({
                  type: "GET",
                  url: "/feeds/posts/default/-/" + tR.attr("data-label"),
                  data: {
                    alt: "json-in-script",
                    "start-index": m,
                    "max-results": 1,
                  },
                  dataType: "jsonp",
                  success: function (e) {
                    if (e.feed.entry) {
                      for (var f = 0; f < e.feed.entry.length; f++) {
                        var entry = e.feed.entry[f],
                          eT = entry.title.$t;
                        for (var a = 0; a < entry.link.length; a++) {
                          if (entry.link[a].rel == "alternate") {
                            var eL = entry.link[a].href;
                            break;
                          }
                        }
                        if ("media$thumbnail" in entry) {
                          var eB = entry.media$thumbnail.url.replace(
                            "s72-c",
                            "s1600"
                          );
                        } else {
                          var st = entry.content.$t,
                            at = st.indexOf("<img"),
                            bt = st.indexOf('src="', at),
                            ct = st.indexOf('"', bt + 5),
                            dt = st.substr(bt + 5, ct - bt - 5);
                          if (at != -1 && bt != -1 && ct != -1 && dt != "")
                            entry_thumb = dt;
                          else
                            eB =
                              "https://4.bp.blogspot.com/-00O66C-eBQs/W0IcokXSnOI/AAAAAAAAL_k/g4KtDm7SkQsoe7_G0vZ_C_nU0Gf_-kyVQCLcBGAs/s1600/safe_image.png";
                        }
                        if ("content" in entry)
                          var eM = entry.content.$t.replace(
                            '<div class="hidden">',
                            '<p class="article-summary">'
                          );
                        else if ("summary" in entry)
                          eM = entry.summary.$t.replace(
                            '<div class="hidden">',
                            '<p class="article-summary">'
                          );
                        if (eL === data.blog.url) {
                          // var cT='<article class="article-item related current"><p class="article-thumbnail"><a href='+eL+' title="'+eT+'"><img alt="'+eT+'" src='+eB+'></a></p><h3 class="article-title"><a href='+eL+' title="'+eT+'">'+eT+'</a></h3>'+eM+'</article>'

                          var cT =
                            '<article class="article-item related current"><p class="article-thumbnail"><a href=' +
                            eL +
                            ' title="' +
                            eT +
                            '"><img alt="' +
                            eT +
                            '" src=' +
                            eB +
                            '></a></p><h3 class="article-title"><a href=' +
                            eL +
                            ' title="' +
                            eT +
                            '">' +
                            eT +
                            "</a></h3></article>";
                          $(".article-body")
                            .find(".related-article")
                            .append(cT);
                          $(".article-item.current").remove();
                        } else {
                          // cT='<article class="article-item related"><p class="article-thumbnail"><a href='+eL+' title="'+eT+'"><img alt="'+eT+'" src='+eB+'></a></p><h3 class="article-title"><a href='+eL+' title="'+eT+'">'+eT+'</a></h3>'+eM+'</article>'

                          cT =
                            '<article class="article-item related"><p class="article-thumbnail"><a href=' +
                            eL +
                            ' title="' +
                            eT +
                            '"><img alt="' +
                            eT +
                            '" src=' +
                            eB +
                            '></a></p><h3 class="article-title"><a href=' +
                            eL +
                            ' title="' +
                            eT +
                            '">' +
                            eT +
                            "</a></h3></article>";
                          $(".article-body")
                            .find(".related-article")
                            .append(cT);
                        }
                      }
                    }
                  },
                });
              });
            }
          },
          "jsonp"
        );
      }
      $.get(
        "/search/label/" +
          $(".related-posts>div").attr("data-label") +
          "?max-results=" +
          data.blog.searchindex,
        function (e) {
          var a = $(e).find(".Blog .post");
          if (a.length) {
            var b = a.length,
              n = Number($(".related-posts>div").attr("data-count"));
            if (a.length < n) n = a.length;
            let arr = [];
            do {
              let num = Math.floor(Math.random() * b);
              arr.push(num);
              arr = arr.filter((item, index) => {
                return arr.indexOf(item) === index;
              });
            } while (arr.length < n);
            arr.forEach(function (i) {
              var html =
                '<article class="post" data-article-id=' +
                $(a[i]).attr("data-article-id") +
                ">" +
                $(a[i]).html() +
                "</article>";
              $(".related-posts>div").append(html);
              $(".related-posts").removeClass("loading");
            });
            if (data.view.isMobile != "true") fM();
          } else $(".related-posts").remove();
        }
      );
      $.get("/search?max-results=" + index, function (e) {
        var a = $(e).find(".Blog .post"),
          b = $(e).find(h);
        if (a.length) {
          if (a.length < index) index = a.length;
          var c = $(b).attr("href"),
            d =
              '<div class="blog-pager float-left w100 text-center"><a class="theme-button blue load-more" href=' +
              c +
              ' title="Tải thêm">Tải thêm</a></div>';
          for (var i = 0; i < index; i++) {
            f =
              '<article class="post data-article" data-article-id=' +
              $(a[i]).attr("data-article-id") +
              ">" +
              $(a[i]).html() +
              "</article>";
            $(x).append(f).removeClass("loading");
          }
          if (data.view.isMobile != "true") fM();
          $(d).insertAfter($(x));
          function l() {
            setTimeout(function () {
              $(g).html(
                '<a class="theme-button blue disabled" href="javascript:void(0)">Không tìm thấy kết quả nào</a>'
              );
            }, 600);
          }
          function m(v) {
            v.preventDefault();
            $(k).appendTo($(g));
            $(h).addClass("hide");
            if (c != "") {
              $.get(
                c,
                function (e) {
                  (a = $(e).find(".Blog .post")), (b = $(e).find(h));
                  if (a.length) {
                    if (a.length < index) index = a.length;
                    c = $(b).attr("href");
                    for (var i = 0; i < index; i++) {
                      f =
                        '<article class="post data-article" data-article-id=' +
                        $(a[i]).attr("data-article-id") +
                        ">" +
                        $(a[i]).html() +
                        "</article>";
                      $(x).append(f);
                    }
                    $(j).remove();
                    $(h).attr("href", c).removeClass("hide");
                    if (data.view.isMobile != "true") fM();
                  } else l();
                },
                "html"
              );
            } else l();
          }
          $(h).on("click", m);
        } else $(".RecentPosts").remove();
      });
    }
  }
  window.addEventListener("scroll", function () {
    get_recent();
  });
  window.addEventListener("mousemove", function () {
    get_recent();
  });
  if ($(window).scrollTop() > 0) {
    get_recent();
  }
  setTimeout(function () {
    get_recent();
  }, 2000);
  var wW = $(window).width(),
    wH = $(window).height(),
    hH = $("header.header").height(),
    fH = wH - hH,
    hF = (wW - 1100) / 2,
    bC = $(".banner-col"),
    bL = $(".banner-col-left"),
    bR = $(".banner-col-right"),
    cW = $(bC).width();
  bC.css({ height: fH + "px" });
  $(bL).css({ left: hF - cW + "px" });
  $(bR).css({ right: hF - cW + "px" });
  $(bC).removeClass("hide").addClass("show");
  $(window).resize(function () {
    (wW = $(window).width()),
      (wH = $(window).height()),
      (hH = $("header.header").height()),
      (fH = wH - hH),
      (hF = (wW - 1100) / 2),
      (bC = $(".banner-col")),
      (bL = $(".banner-col-left")),
      (bR = $(".banner-col-right")),
      (cW = $(bC).width());
    if (wW < 1349) {
      bC.removeClass("show").addClass("hide");
    } else {
      bC.removeClass("hide").addClass("show");
      $(bC).css({ height: fH + "px" });
      $(bL).css({ left: hF - cW + "px" });
      $(bR).css({ right: hF - cW + "px" });
    }
  });
  setTimeout(function () {
    var fF = $("footer.footer").offset().top - $("footer.footer").height() * 2;
    $(window).scroll(function () {
      if ($(this).scrollTop() >= fF) bC.removeClass("show").addClass("hide");
      else bC.removeClass("hide").addClass("show");
    });
  }, 10000);
}
function callmarkup7() {
  var a = 15,
    b = $(".banner-post"),
    c =
      '<div class="qc-300 banner-post has-banner box-shadow mobile">' +
      b.html() +
      "</div>",
    d = $(".banner-body"),
    br = $(".article-body>div").find("br"),
    e = Math.ceil(br.length / 2);
  if (br.length != "") {
    if (b.length != "") {
      if (br.length > a)
        for (var i = a; i < br.length; i += a) $(c).insertAfter(br[i]);
      $(b).remove();
    }
    if (d.length != "") {
      $(d).insertAfter(br[e]).removeClass("hidden");
      var _w = $(window).width() + "px",
        _h = $(window).height() + "px";
      $(".banner-content").css({ height: _h });
      $(".banner-position").css({
        height: _h,
        clip: "rect(0 " + _w + " " + _h + " -20px)",
      });
      $(".banner-display").css({ width: _w, height: _h });
      $(".banner-iframe").css({ height: _h });
    }
  }
}
if (data.view.isPost == "true") {
  if (document.querySelector(".article-body .video-container")) {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", { events: { onReady: onPlayerReady } });
    }
    function onPlayerReady(event) {
      event.target.playVideo();
    }
    var s1 = document.querySelector(".switch>.first-checked"),
      s2 = document.querySelector(".switch>.second-checked"),
      s3 = document.querySelector('.switch>input[type="checkbox"]'),
      body = document.querySelector("body");
    body.setAttribute("data-theme", "dark");
    s1.classList.remove("false");
    s1.classList.add("true");
    s2.classList.remove("false");
    s2.classList.add("true");
    s3.setAttribute("aria-checked", "true");
    s3.setAttribute("aria-label", "Đã bật");
    s3.setAttribute("title", "Tắt");
  }
}

window.addEventListener("load", function () {
  if (!$(".layout-quiz").length) callmarkup1();
  if (data.view.isMobile == "true") callmarkup2();
  if (data.view.isHomepage == "true") callmarkup3();
  if ([data.view.isHomepage, data.view.isPost].includes("true")) callmarkup4();
  if (data.view.isSingleItem == "true") callmarkup5();
  if (data.view.isPost == "true" && !$(".layout-quiz").length) {
    callmarkup6();
    if (data.view.isMobile == "true") callmarkup7();
  }
  $(document)
    .off("click", ".modal--open", modal_open)
    .on("click", ".modal--open", modal_open);
  $(".header-page-icon>a").click(page_list);
  $('.switch>input[type="checkbox"]').click(switch_checked);
  $('form[name="contact_form"]').on("submit", submit_form);
  if (!$(".layout-quiz").length)
    $(document).idle({
      onIdle: function () {
        location.reload();
      },
      idle: data.blog.timeOut,
    });
  if (data.view.isMobile !== "true") {
    fM();
    if (data.view.isLabelSearch == "true") {
      $(".menu .title>a").each(function () {
        var x = $(".breadcrumbs h1").text(),
          y = $(this).attr("title");
        if (x == y) {
          $(this).parent().addClass("current");
          $(".menu .title>a").not($(this).parent()).removeClass("current");
        }
      });
    }
  }
});
