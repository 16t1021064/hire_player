import { FC, useEffect } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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
    // magnificPopup
    (function () {
      // eslint-disable-next-line no-undef
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
