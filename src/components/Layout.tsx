import { FC, useEffect } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: FC = ({ children }) => {
  useEffect(() => {
    // page
    (function () {
      // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
      const page = $(".page");
      // eslint-disable-next-line no-undef
      const sidebar = $(".sidebar");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const burger = sidebar.find(".sidebar__burger");
      const close = sidebar.find(".sidebar__close");
      // eslint-disable-next-line no-undef
      const header = $(".header");
      const burgerHeader = header.find(".header__burger");
      const search = header.find(".header__search");
      const openSearch = header.find(".header__item_search");
      let items = header.find(".header__item");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let wrap = header.find(".header__wrap");

      items.each(function () {
        // eslint-disable-next-line no-undef
        let item = $(this),
          head = item.find(".header__head:not(.js-propagation)"),
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

        // eslint-disable-next-line no-undef
        $("body").on("click", function () {
          items.removeClass("active");
        });
      });

      openSearch.on("click", function (e) {
        e.preventDefault();
        burgerHeader.removeClass("active");
        search.slideToggle();
        sidebar.removeClass("visible");
        // eslint-disable-next-line no-undef
        $("html").removeClass("no-scroll");
        // eslint-disable-next-line no-undef
        $("body").removeClass("no-scroll");
      });
      burgerHeader.on("click", function () {
        burgerHeader.toggleClass("active");
        search.slideUp();
        sidebar.toggleClass("visible");
        // eslint-disable-next-line no-undef
        $("html").toggleClass("no-scroll");
        // eslint-disable-next-line no-undef
        $("body").toggleClass("no-scroll");
      });
      close.on("click", function () {
        burgerHeader.removeClass("active");
        search.slideUp();
        sidebar.removeClass("visible");
        // eslint-disable-next-line no-undef
        $("html").removeClass("no-scroll");
        // eslint-disable-next-line no-undef
        $("body").removeClass("no-scroll");
      });
    })();
    // tabs
    (function () {
      // tab info player
      // eslint-disable-next-line no-undef
      let tabs1: any = $(".catalog_player");
      tabs1.each(function (e: any, ele: any) {
        // eslint-disable-next-line no-undef
        let thisTabs = $(ele),
          nav = thisTabs.find(".catalog__link"),
          item = thisTabs.find(".catalog__tabs__item");
        nav.on("click", function () {
          // eslint-disable-next-line no-undef
          var thisNav = $(this),
            indexNav = thisNav.index();
          nav.removeClass("active");
          thisNav.addClass("active");
          item.hide();
          item.eq(indexNav).fadeIn();
          return false;
        });
      });

      // eslint-disable-next-line no-undef
      let tabs: any = $(".js-tabs");
      tabs.each(function (e: any, ele: any) {
        // eslint-disable-next-line no-undef
        var thisTabs = $(ele),
          nav = thisTabs.find(".js-tabs-link"),
          item = thisTabs.find(".js-tabs-item");
        console.log(thisTabs);
        nav.on("click", function () {
          // eslint-disable-next-line no-undef
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
  });
  return (
    <>
      <ReactNotification />

      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
