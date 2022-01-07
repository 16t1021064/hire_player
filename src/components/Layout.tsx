import { FC, useEffect } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ConfigProvider } from "antd";

const Layout: FC = ({ children }) => {
  useEffect(() => {
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
    <ConfigProvider>
      <ReactNotification />

      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          {children}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Layout;
