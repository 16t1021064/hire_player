import LoadingFullpage from "components/LoadingFullpage";
import { useAppDispatch } from "hooks/useRedux";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { LOCAL_STORAGE } from "utils/constant";
import { routesEnum } from "../Routes";

const Logout: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE.accessToken);
    dispatch(setIsLogin(false));
    dispatch(setUserInfo(null));
    setTimeout(() => {
      history.replace(routesEnum.login);
    });
  }, []);

  return <LoadingFullpage />;
};

export default Logout;
