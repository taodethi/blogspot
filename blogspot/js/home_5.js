(function (n) {
  function h(n, t) {
    var u, f, r;
    if (
      (($province = $(
        "select[data-address-type='province'][data-address-zone='" + n + "']"
      )),
      $province)
    ) {
      for (
        u = ['<option value="" hidden>---</option>'], f = 0;
        f < i.length;
        f++
      ) {
        if (((r = i[f]), r.id == t)) {
          u.push(
            "<option value='" + r.id + "' selected>" + r.name + "</option>"
          );
          continue;
        }
        u.push("<option value='" + r.id + "'>" + r.name + "</option>");
      }
      $province.html(u.join(""));
    }
  }
  function s(n, t, i) {
    var r = $(
        "select[data-address-type='district'][data-address-zone='" + n + "']"
      ),
      s,
      e,
      o,
      u;
    if (r) {
      if (!t) {
        r.val("");
        r.attr("disabled", "disabled");
        r.html("");
        return;
      }
      for (
        s = f.filter(function (n) {
          return n.province_id == t;
        }),
          e = ['<option value="" hidden>---</option>'],
          o = 0;
        o < s.length;
        o++
      ) {
        if (((u = s[o]), u.id == i)) {
          e.push(
            "<option value='" + u.id + "' selected>" + u.name + "</option>"
          );
          continue;
        }
        e.push("<option value='" + u.id + "'>" + u.name + "</option>");
      }
      r.removeAttr("disabled");
      r.html(e.join(""));
    }
  }
  function r(n, t, i) {
    var r = $(
        "select[data-address-type='ward'][data-address-zone='" + n + "']"
      ),
      f,
      s,
      o,
      u;
    if (r) {
      if (!t) {
        r.val("");
        r.attr("disabled", "disabled");
        r.html("");
        return;
      }
      for (
        f = ['<option value="" hidden>---</option>'],
          s = e.filter(function (n) {
            return n.district_id == t;
          }),
          o = 0;
        o < s.length;
        o++
      ) {
        if (((u = s[o]), u.id == i)) {
          f.push(
            "<option value='" + u.id + "' selected>" + u.name + "</option>"
          );
          continue;
        }
        f.push("<option value='" + u.id + "'>" + u.name + "</option>");
      }
      r.removeAttr("disabled");
      r.html(f.join(""));
    }
  }
  function c() {
    return o
      ? {
          then: function (n) {
            return n();
          },
        }
      : fetch("https://cdn.jsdelivr.net/gh/vietblogdao/js/addresses.json")
          .then(function (n) {
            return n.json();
          })
          .then(function (n) {
            i = n.provinces;
            f = n.districts;
            e = n.wards;
            o = !0;
          });
  }
  function u() {}
  function t(n, t) {
    $(
      'select[data-address-type="' + t + '"][data-address-zone="' + n + '"]'
    ).trigger("address:change");
  }
  var i = [],
    f = [],
    e = [],
    o = !1;
  u.prototype.bind = function () {
    $("body").on("change", "select[data-address-type]", function (n) {
      var u = n.target.getAttribute("data-address-type"),
        i = n.target.getAttribute("data-address-zone");
      u === "province"
        ? (t(i, "province"),
          s(i, n.target.value, undefined),
          t(i, "district"),
          r(i, "", undefined),
          t(i, "ward"))
        : u === "district" &&
          (t(i, "district"), r(i, n.target.value, undefined), t(i, "ward"));
    });
    return this;
  };
  u.prototype.refresh = function (n) {
    var i = {},
      u;
    ($("[data-address-zone]").each(function () {
      var n = $(this),
        r = n.data("address-type"),
        t,
        u;
      r &&
        ((t = n.data("address-zone")),
        (u = i[t] || (i[t] = {})),
        (u[r] = n.val() || n.attr("value")));
    }),
    (u = Object.keys(i)),
    u.length != 0) &&
      c().then(function () {
        u.forEach(function (n) {
          var u = i[n];
          h(n, u.province);
          t(n, "province");
          s(n, u.province, u.district);
          t(n, "district");
          r(n, u.district, u.ward);
          t(n, "ward");
        });
        n && n();
      });
  };
  n.Address = new u();
})(window);
$(function () {
  $("body")
    .on("click", "[data-toggle]", function () {
      var n = $(this);
      n.toggleClass("toggled");
      $(n.attr("data-toggle")).toggleClass(n.attr("data-toggle-class"));
    })
    .on(
      "focus",
      ".field__label+input[type=text].field__input,textarea.field__input",
      function () {
        $(this).closest(".field").addClass("field--show-floating-label");
      }
    )
    .on(
      "blur",
      ".field__label+input[type=text].field__input,textarea.field__input",
      function () {
        this.value ||
          $(this).closest(".field").removeClass("field--show-floating-label");
      }
    )
    .on("change", ".field.field--error  .field__input", function () {
      $(this).closest(".field").removeClass("field--error");
    })
    .on("keypress", "#checkoutForm input", function (n) {
      n.keyCode == 13 && n.preventDefault();
    });
});
$(function () {
  function u() {
    $("select[data-address-type]").select2({
      width: "100%",
      language: {
        noResults: function () {
          return "KhĂ´ng tĂ¬m tháº¥y káº¿t quáº£";
        },
      },
    });
  }
  u();
  Address.bind().refresh();
  $('select[name="billingProvince"]').change(function () {
    var province = $(this).select2("data")[0].text;
    $("input#address_1").attr("value", province);
  });
  $('select[name="billingDistrict"]').change(function () {
    var district = $(this).select2("data")[0].text;
    $("input#address_2").attr("value", district);
  });
  $('select[name="billingWard"]').change(function () {
    var ward = $(this).select2("data")[0].text;
    $("input#address_3").attr("value", ward);
  });
});
