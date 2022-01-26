/* eslint-disable no-undef */
import { FC } from "react";
import { routesEnum } from "pages/Routes";
import Renderer from "./Renderer";

export interface TMenu {
  text: string;
  href?: string;
  icon?: string;
  subs?: TMenu[];
}

const menus: TMenu[] = [
  {
    text: "User",
    icon: "person-circle-outline",
    subs: [
      {
        text: "User Info",
        href: routesEnum.settings_user,
      },
      {
        text: "Hired List",
        href: routesEnum.settings_userHires,
      },
      {
        text: "Donated List",
        href: routesEnum.settings_userDonates,
      },
      {
        text: "Balance fluctuations",
        href: routesEnum.settings_balanceManage,
      },
    ],
  },
  {
    text: "Player",
    icon: "person-circle",
    subs: [
      {
        text: "Player Info",
        href: routesEnum.settings_player,
      },
      {
        text: "Hire Setting",
        href: routesEnum.settings_playerHire,
      },
      {
        text: "Albums",
        href: routesEnum.settings_playerAlbums,
      },
      {
        text: "Received Hire",
        href: routesEnum.settings_playerHires,
      },
      {
        text: "Received Donate",
        href: routesEnum.settings_playerDonates,
      },
    ],
  },
  {
    text: "Payment Settings",
    icon: "wallet-outline",
    href: routesEnum.settings_payments,
  },
  {
    text: "Balance & Withdraw",
    icon: "cash-outline",
    href: routesEnum.settings_balance,
  },
  {
    text: "Security",
    icon: "cog-outline",
    subs: [
      {
        text: "User Blocks",
        href: routesEnum.settings_blockedUsers,
      },
      {
        text: "Password",
        href: routesEnum.settings_userPassword,
      },
    ],
  },
];

const SidebarSettings: FC = () => {
  // useEffect(() => {
  //   // Menu sidebar
  //   (function () {
  //     $(".sidebar-header").on("click", function () {
  //       var item = $(this),
  //         sidebar_item = item.parent(),
  //         sub_menu = sidebar_item.find(".sidebar-submenu");

  //       if (sidebar_item.hasClass("active") && sub_menu) {
  //         sidebar_item.removeClass("active");
  //         sub_menu.removeClass("menu-open");
  //       } else {
  //         $(".sidebar-item").removeClass("active");
  //         $(".sidebar-submenu").removeClass("menu-open");
  //         sidebar_item.addClass("active");
  //         sub_menu.addClass("menu-open");
  //         return true;
  //       }
  //       return false;
  //     });

  //     // setting menu mobile
  //     $(".setting__menu__outline").on("click", function () {
  //       //icon
  //       $(this).css("display", "none");
  //       $(".setting__menu__close").css("display", "block");
  //       //content
  //       $(".setting__sidebar").css("display", "block");
  //       $(".setting__content").css("display", "none");
  //     });
  //     $(".setting__menu__close").on("click", function () {
  //       //icon
  //       $(this).css("display", "none");
  //       $(".setting__menu__outline").css("display", "block");
  //       //content
  //       $(".setting__sidebar").css("display", "none");
  //       $(".setting__content").css("display", "block");
  //     });
  //   })();
  // });

  return (
    <div className="setting__sidebar__wrapper">
      <ul className="sidebar-menu">
        {menus.map((menu, pos: number) => (
          <Renderer key={pos} menu={menu} />
        ))}
      </ul>
    </div>
  );
};

export default SidebarSettings;
