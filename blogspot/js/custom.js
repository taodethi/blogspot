$(window).on("load", function () {
  if ($(".layout-quiz").length) {
    $("#site-header").remove();
    $(".banner-widget").remove();
    $(".footer-navigation-bar").remove();
  }

  function createAndAppendAdsElement(parent, adUnitID) {
    var ele = document.createElement("ins");
    ele.style.display = "block";
    ele.className = "adsbygoogle";
    ele.setAttribute("data-ad-client", "ca-pub-9935302332385679");
    ele.setAttribute("data-ad-slot", adUnitID);
    ele.setAttribute("data-ad-format", "auto");
    ele.setAttribute("data-full-width-responsive", "true");

    parent.append(ele);

    (adsbygoogle = window.adsbygoogle || []).push({});
  }

  setTimeout(() => {
    var unit_id = [1872730858, 6045933673, 3076776553];
    if ($("#appquiz .card-body").length) {
      createAndAppendAdsElement(
        $("#appquiz .card-body").eq(0),
        unit_id[Math.floor(Math.random() * unit_id.length)]
      );
    }

    $(".banner-col").each((i, v) => {
      if ($(v).hasClass("show")) {
        $(v).html("");
        var unit = unit_id[i];
        createAndAppendAdsElement($(v), unit);
      }
    });
  }, 5000);
});
