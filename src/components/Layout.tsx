/* eslint-disable no-undef */
import { FC, useEffect } from "react";

const Layout: FC = ({ children }) => {
  useEffect(() => {
    // page
    (function () {
      const page = $(".page");
      const sidebar = $(".sidebar");
      const burger = sidebar.find(".sidebar__burger");
      const close = sidebar.find(".sidebar__close");
      const header = $(".header");
      const burgerHeader = header.find(".header__burger");
      const search = header.find(".header__search");
      const openSearch = header.find(".header__item_search");
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
      var link: any = $(".js-popup-open");
      link.magnificPopup({
        type: "inline",
        fixedContentPos: true,
        removalDelay: 200,
        mainClass: "mfp-zoom-in",
      });
    })();
    // tabs
    (function () {
      // tab info player
      let tabs1: any = $(".catalog_player");
      tabs1.each(function (e: any, ele: any) {
        let thisTabs = $(ele),
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

      let tabs: any = $(".js-tabs");
      tabs.each(function (e: any, ele: any) {
        var thisTabs = $(ele),
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
  });
  return (
    <>
      {children}
      <div
        className="popup popup_normal mfp-hide mfp-zoom-in"
        id="popup-recharge"
      >
        <form className="popup__form">
          <div className="popup__title h5">Recharge</div>
          <div className="popup__fieldset">
            <div className="popup__field field">
              <div className="field__label">Withdraw Method</div>
              <div className="field__wrap">
                <select className="field__select">
                  <option>PayPal</option>
                  <option>Bank</option>
                </select>
              </div>
            </div>
          </div>
          <div className="popup__fieldset">
            <div className="popup__row">
              <div className="popup__field field">
                <div className="field__label">Amount</div>
                <div className="field__wrap">
                  <input className="field__input" type="number" />
                </div>
              </div>
              <div className="popup__field field">
                <div className="field__label">PayPal Email</div>
                <div className="field__wrap">
                  <input className="field__input" type="email" />
                </div>
              </div>
            </div>
          </div>
          <button className="popup__btn btn btn_primary" type="submit">
            Recharge now
          </button>
        </form>
      </div>
    </>
  );
};

export default Layout;
