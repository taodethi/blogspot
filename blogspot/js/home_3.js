function create_video(e) {
  e.preventDefault();
  var parents = $(this).parents(".post"),
    src = $(parents).attr("data-video");
  $(parents)
    .find(".post_thumb")
    .html(
      '<div class="video-container"><iframe allowfullscreen="" frameborder="0" src=' +
        src +
        "></iframe></div>"
    );
}
window.addEventListener("load", function () {
  $(".icon-play").on("click", create_video);
  var load_random = 0;
  function get_random() {
    if (load_random == 0) {
      load_random = 1;
      $.get("/search?max-results=" + data.blog.searchindex, function (e) {
        var a = $(e).find(".Blog .post"),
          p = "";
        if (a.length) {
          var b = a.length,
            r = 12,
            c = document.querySelector(".RandomPosts>.widget-content");
          if (a.length < r) r = a.length;
          let arr = [];
          do {
            let num = Math.floor(Math.random() * b);
            arr.push(num);
            arr = arr.filter((m, n) => {
              return arr.indexOf(m) === n;
            });
          } while (arr.length < r);
          arr.forEach(function (i) {
            p +=
              '<article class="post data-article" data-article-id=' +
              $(a[i]).attr("data-article-id") +
              ">";
            p += $(a[i]).html();
            p += "</article>";
            c.classList.remove("loading");
            c.innerHTML = p;
          });
          if (data.view.isMobile != "true") fM();
        } else {
          $(".RandomPosts").remove();
        }
      });
      $.get("/search?max-results=12", function (e) {
        var a = $(e).find(".Blog .post");
        if (a.length) {
          var r = 12,
            z = "";
          if (a.length < r) r = a.length;
          for (var i = 0; i < r; i++) {
            var html =
              '<article class="post data-article" data-article-id=' +
              $(a[i]).attr("data-article-id") +
              ">" +
              $(a[i]).html() +
              "</article>";
            $(".RecentPosts>.widget-content")
              .append(html)
              .removeClass("loading");
          }
          if (data.view.isMobile != "true") fM();
        } else {
          $(".RecentPosts").remove();
        }
      });
    }
  }
  window.addEventListener("scroll", function () {
    get_random();
  });
  if ($(window).scrollTop() > 0) get_random();
});
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
