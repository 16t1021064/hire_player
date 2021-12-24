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
  playerProfile = "/player-profile",
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
  },
  {
    path: routesEnum.forgotPassword,
    exact: true,
    component: lazy(() => import("./ForgotPassword")),
  },
  {
    path: routesEnum.resetPassword,
    exact: true,
    component: lazy(() => import("./ResetPassword")),
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
  },
  {
    path: routesEnum.chat,
    exact: true,
    component: lazy(() => import("./Chat")),
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
  },
  {
    path: routesEnum.settingBalance,
    exact: true,
    component: lazy(() => import("./SettingBalance")),
  },
  {
    path: routesEnum.settingBalanceFluctuation,
    exact: true,
    component: lazy(() => import("./SettingBalanceFluctuation")),
  },
  {
    path: routesEnum.settingBlockUsers,
    exact: true,
    component: lazy(() => import("./SettingBlockUsers")),
  },
  {
    path: routesEnum.settingPayments,
    exact: true,
    component: lazy(() => import("./SettingPayments")),
  },
  {
    path: routesEnum.settingPlayer,
    exact: true,
    component: lazy(() => import("./SettingPlayer")),
  },
  {
    path: routesEnum.settingPlayerAlbums,
    exact: true,
    component: lazy(() => import("./SettingPlayerAlbums")),
  },
  {
    path: routesEnum.settingPlayerDonateHistory,
    exact: true,
    component: lazy(() => import("./SettingPlayerDonateHistory")),
  },
  {
    path: routesEnum.settingPlayerHireHistory,
    exact: true,
    component: lazy(() => import("./SettingPlayerHireHistory")),
  },
  {
    path: routesEnum.settingPlayerHire,
    exact: true,
    component: lazy(() => import("./SettingPlayerHire")),
  },
  {
    path: routesEnum.settingUser,
    exact: true,
    component: lazy(() => import("./SettingUser")),
  },
  {
    path: routesEnum.settingUserHireHistory,
    exact: true,
    component: lazy(() => import("./SettingUserHireHistory")),
  },
  {
    path: routesEnum.settingUserDonateHistory,
    exact: true,
    component: lazy(() => import("./SettingUserDonateHistory")),
  },
  {
    path: routesEnum.settingUserPassword,
    exact: true,
    component: lazy(() => import("./SettingUserPassword")),
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
