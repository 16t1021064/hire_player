import { lazy } from "@loadable/component";
import PrivateRoute from "auth/PrivateRoute";
import { FC, useEffect } from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import { getProfileRequest } from "api/auth/request";
import { getAccessToken } from "utils/auth";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { useAppDispatch } from "hooks/useRedux";
import AnonymousRoute from "auth/AnonymousRoute";

export enum routesEnum {
  home = "/",
  login = "/login",
  logout = "/logout",
  register = "/register",
  chat = "/chat",
  playerProfile = "/player/:id",
  following = "/following",
  forgotPassword = "/forgot-password",
  resetPassword = "/password-reset",

  settings_balance = "/settings/balance",
  settings_balanceManage = "/settings/balance-manage",
  settings_blockedUsers = "/settings/blocked-users",
  settings_payments = "/settings/payments",

  settings_player = "/settings/player",
  settings_playerAlbums = "/settings/player-albums",
  settings_playerDonates = "/settings/player-donates",
  settings_playerHires = "/settings/player-hires",
  settings_playerHire = "/settings/player-hire",

  settings_user = "/settings/user",
  settings_userDonates = "/settings/user-donates",
  settings_userHires = "/settings/user-hires",
  settings_userPassword = "/settings/user-password",

  recharges_success = "/recharges/success",
  recharges_cancel = "/recharges/cancel",
}

type CustomRouteProps = RouteProps & { private?: boolean; anonymous?: boolean };

const routes: CustomRouteProps[] = [
  {
    path: routesEnum.home,
    exact: true,
    component: lazy(() => import("./Home")),
  },
  {
    path: routesEnum.login,
    exact: true,
    component: lazy(() => import("./Login")),
    anonymous: true,
  },
  {
    path: routesEnum.forgotPassword,
    exact: true,
    component: lazy(() => import("./ForgotPassword")),
    anonymous: true,
  },
  {
    path: routesEnum.resetPassword,
    exact: true,
    component: lazy(() => import("./ResetPassword")),
    anonymous: true,
  },
  {
    path: routesEnum.logout,
    exact: true,
    component: lazy(() => import("./Logout")),
  },
  {
    path: routesEnum.register,
    exact: true,
    component: lazy(() => import("./Register")),
    anonymous: true,
  },
  {
    path: routesEnum.chat,
    exact: true,
    component: lazy(() => import("./Chat")),
    private: true,
  },
  {
    path: routesEnum.playerProfile,
    exact: true,
    component: lazy(() => import("./PlayerProfile")),
  },
  {
    path: routesEnum.following,
    exact: true,
    component: lazy(() => import("./Following")),
    private: true,
  },
  {
    path: routesEnum.settings_balance,
    exact: true,
    component: lazy(() => import("./Settings/Balance")),
    private: true,
  },
  {
    path: routesEnum.settings_balanceManage,
    exact: true,
    component: lazy(() => import("./Settings/BalanceManage")),
    private: true,
  },
  {
    path: routesEnum.settings_blockedUsers,
    exact: true,
    component: lazy(() => import("./Settings/BlockedUsers")),
    private: true,
  },
  {
    path: routesEnum.settings_payments,
    exact: true,
    component: lazy(() => import("./Settings/Payments")),
    private: true,
  },
  {
    path: routesEnum.settings_player,
    exact: true,
    component: lazy(() => import("./Settings/Player")),
    private: true,
  },
  {
    path: routesEnum.settings_playerAlbums,
    exact: true,
    component: lazy(() => import("./Settings/PlayerAlbums")),
    private: true,
  },
  {
    path: routesEnum.settings_playerDonates,
    exact: true,
    component: lazy(() => import("./Settings/PlayerDonates")),
    private: true,
  },
  {
    path: routesEnum.settings_playerHires,
    exact: true,
    component: lazy(() => import("./Settings/PlayerHires")),
    private: true,
  },
  {
    path: routesEnum.settings_playerHire,
    exact: true,
    component: lazy(() => import("./Settings/PlayerHire")),
    private: true,
  },
  {
    path: routesEnum.settings_user,
    exact: true,
    component: lazy(() => import("./Settings/User")),
    private: true,
  },
  {
    path: routesEnum.settings_userHires,
    exact: true,
    component: lazy(() => import("./Settings/UserHires")),
    private: true,
  },
  {
    path: routesEnum.settings_userDonates,
    exact: true,
    component: lazy(() => import("./Settings/UserDonates")),
    private: true,
  },
  {
    path: routesEnum.settings_userPassword,
    exact: true,
    component: lazy(() => import("./Settings/UserPassword")),
    private: true,
  },
  {
    path: routesEnum.recharges_success,
    exact: true,
    component: lazy(() => import("./Recharges/Success")),
  },
  {
    path: routesEnum.recharges_cancel,
    exact: true,
    component: lazy(() => import("./Recharges/Cancel")),
  },
];

export const Routes: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const disabledRoutes: string[] = [routesEnum.logout];
    (async () => {
      if (disabledRoutes.includes(location.pathname)) {
        return;
      }
      const token = getAccessToken();
      if (token) {
        const userData = await getProfileRequest();
        dispatch(setIsLogin(true));
        dispatch(setUserInfo(userData.data));
      }
    })();
  }, [location]);

  return (
    <Switch>
      {routes.map((route) => {
        if (route?.private) {
          return (
            <PrivateRoute
              path={route.path}
              key={route.path as string}
              exact={route.exact}
              component={route.component}
            />
          );
        }

        if (route?.anonymous) {
          return (
            <AnonymousRoute
              path={route.path}
              key={route.path as string}
              exact={route.exact}
              component={route.component}
            />
          );
        }

        return (
          <Route
            path={route.path}
            key={route.path as string}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
};
