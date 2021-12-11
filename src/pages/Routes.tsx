import { lazy } from "@loadable/component";
import PrivateRoute from "auth/PrivateRoute";
import { FC, useEffect } from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import { refreshUserRequest } from "api/auth/request";
import { getToken } from "utils/auth";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { useAppDispatch } from "hooks/useRedux";
import AnonymousRoute from "auth/AnonymousRoute";

export enum routesEnum {
  home = "/",
  login = "/login",
  logout = "/logout",
  register = "/register",
  dashboard = "/dashboard",
  chat = "/chat",
  playerProfile = "/player-profile",
  following = "/following",
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
    anonymous: true,
    component: lazy(() => import("./Login")),
  },
  {
    path: routesEnum.logout,
    exact: true,
    private: true,
    component: lazy(() => import("./Logout")),
  },
  {
    path: routesEnum.register,
    exact: true,
    anonymous: true,
    component: lazy(() => import("./Register")),
  },
  {
    path: routesEnum.dashboard,
    exact: true,
    private: true,
    component: lazy(() => import("./Dashboard")),
  },
  {
    path: routesEnum.chat,
    exact: true,
    private: true,
    component: lazy(() => import("./Chat")),
  },
  {
    path: routesEnum.playerProfile,
    exact: true,
    private: true,
    component: lazy(() => import("./PlayerProfile")),
  },
  {
    path: routesEnum.following,
    exact: true,
    private: true,
    component: lazy(() => import("./Following")),
  },
];

export const Routes: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const userData = await refreshUserRequest();
        dispatch(setIsLogin(true));
        dispatch(setUserInfo(userData.userInfo));
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
