/* eslint-disable no-undef */
import { FC, useEffect } from "react";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";
import { routesEnum } from "pages/Routes";

const SidebarSettings: FC = () => {
  useEffect(() => {
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
  });
  return (
    <div className="setting__sidebar__wrapper">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a className="sidebar-header">
            <IonIcon
              className="icon icon-person-circle-outline"
              name="person-circle-outline"
            />
            <span>User</span>
            <div className="icon-menu">
              <IonIcon
                className="icon icon-arrow-forward-outline"
                name="arrow-forward-outline"
              />
              <IonIcon
                className="icon icon-arrow-down-outline"
                name="arrow-down-outline"
              />
            </div>
          </a>
          <ul className="sidebar-submenu">
            <li>
              <Link to={routesEnum.settingUser}>User Info</Link>
            </li>
            <li>
              <Link to={routesEnum.settingUserHireHistory}>Hired List</Link>
            </li>
            <li>
              <Link to={routesEnum.settingUserDonateHistory}>Donated List</Link>
            </li>
            <li>
              <Link to={routesEnum.settingBalanceFluctuation}>
                Balance fluctuations
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <a className="sidebar-header">
            <IonIcon className="icon icon-person-circle" name="person-circle" />
            <span>Player</span>
            <div className="icon-menu">
              <IonIcon
                className="icon icon-arrow-forward-outline"
                name="arrow-forward-outline"
              />
              <IonIcon
                className="icon icon-arrow-down-outline"
                name="arrow-down-outline"
              />
            </div>
          </a>
          <ul className="sidebar-submenu">
            <li>
              <Link to={routesEnum.settingPlayer}>Player Info</Link>
            </li>
            <li>
              <Link to={routesEnum.settingPlayerHire}>Hire Setting</Link>
            </li>
            <li>
              <Link to={routesEnum.settingPlayerAlbums}>Albums</Link>
            </li>
            <li>
              <Link to={routesEnum.settingPlayerHireHistory}>
                Received Hire
              </Link>
            </li>
            <li>
              <Link to={routesEnum.settingPlayerDonateHistory}>
                Received Donate
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <Link to={routesEnum.settingPayments} className="sidebar-header">
            <IonIcon
              className="icon icon-wallet-outline"
              name="wallet-outline"
            />
            <span>Payment Settings</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to={routesEnum.settingPlayer} className="sidebar-header">
            <IonIcon className="icon icon-cash-outline" name="cash-outline" />
            <span>Balance & Withdraw</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <a className="sidebar-header">
            <IonIcon className="icon icon-cog-outline" name="cog-outline" />
            <span>Security</span>
            <div className="icon-menu">
              <IonIcon
                className="icon icon-arrow-forward-outline"
                name="arrow-forward-outline"
              />
              <IonIcon
                className="icon icon-arrow-down-outline"
                name="arrow-down-outline"
              />
            </div>
          </a>
          <ul className="sidebar-submenu">
            <li>
              <Link to={routesEnum.settingBlockUsers}>User Blocks</Link>
            </li>
            <li>
              <Link to={routesEnum.settingUserPassword}>Password</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SidebarSettings;
