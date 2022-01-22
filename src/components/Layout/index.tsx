import { FC, useEffect, useRef } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ConfigProvider } from "antd";
import useSocket from "hooks/useSocket";
import RatingModal from "components/RatingModal";
import { useAppSelector } from "hooks/useRedux";
import { TEventData_StartOnline, TListenerData_OnMessages } from "socket/types";
import { SocketEvents, SocketListeners } from "socket";
import { useHistory, useLocation } from "react-router-dom";
import { TUser } from "types";
import { routesEnum } from "pages/Routes";
import notify from "utils/notify";
import { chatDefaultState } from "pages/Chat";

const Layout: FC = ({ children }) => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { socket, connected } = useSocket();
  const location = useLocation();
  const history = useHistory();
  const handleOnMessagesRef = useRef<
    ((data: TListenerData_OnMessages) => void) | null
  >(null);

  useEffect(() => {
    if (connected && userInfo) {
      const startOnlineData: TEventData_StartOnline = {
        userId: userInfo.id,
      };
      socket?.emit(SocketEvents.startOnline, startOnlineData);
    }
  }, [connected, userInfo]);

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

  const handleOnMessages = (data: TListenerData_OnMessages) => {
    if (location.pathname === routesEnum.chat) return;
    let name: string | undefined = "Administrator";
    if (data.sender.id === (data.conversation.customer as TUser).id) {
      name = data.sender.userName;
    } else if (data.sender.id === (data.conversation.player as TUser).id) {
      name = data.sender.playerInfo?.playerName;
    }
    notify(
      {
        message: `A new message from ${name}`,
        onRemoval: (id, removedBy) => {
          if (removedBy === "click") {
            history.push(routesEnum.chat, {
              [chatDefaultState]: data.conversation.id,
            });
          }
        },
      },
      "info"
    );
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    if (handleOnMessagesRef.current) {
      socket?.removeListener(
        SocketListeners.onMessages,
        handleOnMessagesRef.current
      );
    }
    handleOnMessagesRef.current = handleOnMessages;
    socket?.on(SocketListeners.onMessages, handleOnMessagesRef.current);
  }, [connected, location]);

  return (
    <ConfigProvider>
      <ReactNotification />

      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header socketInstance={socket} socketConnected={connected} />
          {children}
        </div>
      </div>

      <RatingModal socketInstance={socket} socketConnected={connected} />
    </ConfigProvider>
  );
};

export default Layout;
