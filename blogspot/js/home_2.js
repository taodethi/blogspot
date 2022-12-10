window.addEventListener("load", function () {
  var load_random = 0;
  function get_random() {
    if (load_random == 0) {
      load_random = 1;
      $.get("/search?max-results=" + data.blog.searchindex, function (e) {
        var a = $(e).find(".Blog .post"),
          p = "";
        if (a.length) {
          console.log(a.length);
          var b = a.length,
            r = 10,
            c = document.querySelector(".RandomPosts>.widget-content");
          if (a.length < r) r = a.length;
          let arr = [];
          do {
            let num = Math.floor(Math.random() * b);
            arr.push(num);
            arr = arr.filter((item, index) => {
              return arr.indexOf(item) === index;
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
    }
  }
  window.addEventListener("scroll", function () {
    get_random();
  });
  if ($(window).scrollTop() > 0) get_random();
});
