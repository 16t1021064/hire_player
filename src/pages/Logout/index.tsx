import { logoutRequest } from "api/auth/request";
import LoadingFullpage from "components/LoadingFullpage";
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

  const { mutate: logout } = useMutation(logoutRequest, {
    onSuccess: (data) => {
      if (data.message === "LOGOUT_SUCCESS") {
        localStorage.removeItem(LOCAL_STORAGE.accessToken);
        localStorage.removeItem(LOCAL_STORAGE.refreshToken);
        dispatch(setIsLogin(false));
        dispatch(setUserInfo(null));
        setTimeout(() => {
          history.replace(routesEnum.login);
        });
      }
    },
  });

  useEffect(() => {
    logout({
      refreshToken: getRefreshToken(),
    });
  }, []);

  return <LoadingFullpage />;
};

export default Logout;
