// check if touch device
function isTouchDevice() {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  var mq = function (query) {
    return window.matchMedia(query).matches;
  };
  if (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true;
  }
  var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return mq(query);
}

if (isTouchDevice()) {
  $("body").addClass("touch-device");
}

// page
(function () {
  const page = $(".page"),
    sidebar = $(".sidebar"),
    burger = sidebar.find(".sidebar__burger"),
    close = sidebar.find(".sidebar__close"),
    header = $(".header"),
    burgerHeader = header.find(".header__burger"),
    search = header.find(".header__search"),
    openSearch = header.find(".header__item_search");
  let items = header.find(".header__item");
  let wrap = header.find(".header__wrap");

  items.each(function () {
    let item = $(this),
      head = item.find(".header__head"),
      body = item.find(".header__body");

    head.on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      burgerHeader.removeClass("active");
      sidebar.removeClass("visible");
      search.slideUp();
      if (!item.hasClass("active")) {
        items.removeClass("active");
        item.addClass("active");
      } else {
        items.removeClass("active");
      }
    });

    body.on("click", function (e) {
      e.stopPropagation();
    });

    $("body").on("click", function () {
      items.removeClass("active");
    });
  });

  openSearch.on("click", function (e) {
    e.preventDefault();
    burgerHeader.removeClass("active");
    search.slideToggle();
    sidebar.removeClass("visible");
    $("html").removeClass("no-scroll");
    $("body").removeClass("no-scroll");
  });
  burgerHeader.on("click", function () {
    burgerHeader.toggleClass("active");
    search.slideUp();
    sidebar.toggleClass("visible");
    $("html").toggleClass("no-scroll");
    $("body").toggleClass("no-scroll");
  });
  close.on("click", function () {
    burgerHeader.removeClass("active");
    search.slideUp();
    sidebar.removeClass("visible");
    $("html").removeClass("no-scroll");
    $("body").removeClass("no-scroll");
  });
})();

// magnificPopup
(function () {
  var link = $(".js-popup-open");
  link.magnificPopup({
    type: "inline",
    fixedContentPos: true,
    removalDelay: 200,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr("data-effect");
      },
    },
  });
})();

// tabs
(function () {
  // tab info player
  var tabs = $(".catalog_player");
  tabs.each(function () {
    var thisTabs = $(this),
      nav = thisTabs.find(".catalog__link"),
      item = thisTabs.find(".catalog__tabs__item");
    nav.on("click", function () {
      var thisNav = $(this),
        indexNav = thisNav.index();
      nav.removeClass("active");
      thisNav.addClass("active");
      item.hide();
      item.eq(indexNav).fadeIn();
      return false;
    });
  });

  var tabs = $(".js-tabs");
  tabs.each(function () {
    var thisTabs = $(this),
      nav = thisTabs.find(".js-tabs-link"),
      item = thisTabs.find(".js-tabs-item");
    console.log(thisTabs);
    nav.on("click", function () {
      var thisNav = $(this),
        indexNav = thisNav.index();
      nav.removeClass("active");
      thisNav.addClass("active");
      item.hide();
      item.eq(indexNav).fadeIn();
      return false;
    });
  });
})();
// Menu sidebar
(function () {
  $(".sidebar-header").on("click", function () {
    var item = $(this),
      sidebar_item = item.parent(),
      sub_menu = sidebar_item.find(".sidebar-submenu");
    if (sidebar_item.hasClass("active") && sub_menu) {
      sidebar_item.removeClass("active");
      sub_menu.removeClass("menu-open");
    } else {
      $(".sidebar-item").removeClass("active");
      $(".sidebar-submenu").removeClass("menu-open");
      sidebar_item.addClass("active");
      sub_menu.addClass("menu-open");
      return true;
    }
    return false;
  });
  // setting menu mobile
  $(".setting__menu__outline").on("click", function () {
    //icon
    $(this).css("display", "none");
    $(".setting__menu__close").css("display", "block");
    //content
    $(".setting__sidebar").css("display", "block");
    $(".setting__content").css("display", "none");
  });
  $(".setting__menu__close").on("click", function () {
    //icon
    $(this).css("display", "none");
    $(".setting__menu__outline").css("display", "block");
    //content
    $(".setting__sidebar").css("display", "none");
    $(".setting__content").css("display", "block");
  });
})();
// toggle body theme
(function () {
  const switchTheme = $(".js-switch-theme"),
    body = $("body");

  switchTheme.on("change", function () {
    if (!body.hasClass("dark")) {
      body.addClass("dark");
      localStorage.setItem("darkMode", "on");
    } else {
      body.removeClass("dark");
      localStorage.setItem("darkMode", "off");
    }
  });
})();
