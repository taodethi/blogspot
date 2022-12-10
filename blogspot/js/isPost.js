window.addEventListener("load", function () {
  if ($("#blog-posts .article-body h2").length) {
    var toc = "";
    $("#blog-posts .article-body")
      .find("h2")
      .each((i, v) => {
        $(v).attr("id", "heading-" + i);
        toc += `<li><a href="#heading-${i}">${$(v).text()}</a>
                      </li>`;
      });
    toc = `<div id="tocid" class="tocify-wrap"> <div class="tocify-inner"><a href="javascript:;" class="tocify-title" role="button" title="Mục lục"><span class="tocify-title-text">Mục lục</span></a> <ol id="tocify"> ${toc} </ol> </div> </div>`;
    $(toc).insertBefore($("#blog-posts .article-body").find("h2").eq(0));

    $("body").delegate(".tocify-title", "click", function () {
      $("#tocify").toggleClass("hide");
    });
  }
});
