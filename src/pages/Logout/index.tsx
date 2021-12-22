import { logoutRequest } from "api/auth/request";
import { useAppDispatch } from "hooks/useRedux";
import { FC, useEffect } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { getRefreshToken } from "utils/auth";
import { LOCAL_STORAGE } from "utils/constant";
import { routesEnum } from "../Routes";

const Logout: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const action = () => {
    localStorage.removeItem(LOCAL_STORAGE.accessToken);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    dispatch(setIsLogin(false));
    dispatch(setUserInfo(null));
    setTimeout(() => {
      history.replace(routesEnum.login);
    });
  };

  const { mutate: logout } = useMutation(logoutRequest, {
    onSuccess: (data) => {
      if (data.message === "LOGOUT_SUCCESS") {
        action();
      }
    },
  });

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      logout({
        refreshToken,
      });
    } else {
      action();
    }
  }, []);

  return <></>;
};

export default Logout;
