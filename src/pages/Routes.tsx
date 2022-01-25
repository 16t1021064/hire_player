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
  settingBalance = "/setting-balance",
  settingBalanceFluctuation = "/setting-balance-fluctuation",
  settingBlockUsers = "/setting-block-users",
  settingPayments = "/setting-payments",
  settingPlayer = "/setting-player",
  settingPlayerAlbums = "/setting-player-albums",
  settingPlayerDonateHistory = "/setting-player-donate-history",
  settingPlayerHireHistory = "/setting-player-hire-history",
  settingPlayerHire = "/setting-player-hire",
  settingUser = "/setting-user",
  settingUserDonateHistory = "/setting-user-donate-history",
  settingUserHireHistory = "/setting-user-hire-history",
  settingUserPassword = "/setting-user-password",
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
    path: routesEnum.settingBalance,
    exact: true,
    component: lazy(() => import("./SettingBalance")),
    private: true,
  },
  {
    path: routesEnum.settingBalanceFluctuation,
    exact: true,
    component: lazy(() => import("./SettingBalanceFluctuation")),
    private: true,
  },
  {
    path: routesEnum.settingBlockUsers,
    exact: true,
    component: lazy(() => import("./SettingBlockUsers")),
    private: true,
  },
  {
    path: routesEnum.settingPayments,
    exact: true,
    component: lazy(() => import("./SettingPayments")),
    private: true,
  },
  {
    path: routesEnum.settingPlayer,
    exact: true,
    component: lazy(() => import("./SettingPlayer")),
    private: true,
  },
  {
    path: routesEnum.settingPlayerAlbums,
    exact: true,
    component: lazy(() => import("./SettingPlayerAlbums")),
    private: true,
  },
  {
    path: routesEnum.settingPlayerDonateHistory,
    exact: true,
    component: lazy(() => import("./SettingPlayerDonateHistory")),
    private: true,
  },
  {
    path: routesEnum.settingPlayerHireHistory,
    exact: true,
    component: lazy(() => import("./SettingPlayerHireHistory")),
    private: true,
  },
  {
    path: routesEnum.settingPlayerHire,
    exact: true,
    component: lazy(() => import("./SettingPlayerHire")),
    private: true,
  },
  {
    path: routesEnum.settingUser,
    exact: true,
    component: lazy(() => import("./SettingUser")),
    private: true,
  },
  {
    path: routesEnum.settingUserHireHistory,
    exact: true,
    component: lazy(() => import("./SettingUserHireHistory")),
    private: true,
  },
  {
    path: routesEnum.settingUserDonateHistory,
    exact: true,
    component: lazy(() => import("./SettingUserDonateHistory")),
    private: true,
  },
  {
    path: routesEnum.settingUserPassword,
    exact: true,
    component: lazy(() => import("./SettingUserPassword")),
    private: true,
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
