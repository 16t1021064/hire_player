import { loginRequest } from "api/auth/request";
import { useAppDispatch } from "hooks/useRedux";
import { routesEnum } from "pages/Routes";
import React, { FC, useRef } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { LOCAL_STORAGE } from "utils/constant";
import { useHistory } from "react-router";
import Button from "components/Button";

const Login: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate: login, status: loginStatus } = useMutation(loginRequest, {
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE.accessToken, data.accessToken);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, data.refreshToken);
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(data.data));
      history.replace(routesEnum.home);
    },
  });

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      loginStatus !== "loading" &&
      emailRef.current?.value &&
      passwordRef.current?.value
    ) {
      login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={onSubmit}>
          <div className="login__title h3">Sign in</div>
          <div className="login__line">
            <div className="login__text">New user?</div>
            <Link to={routesEnum.register} className="login__link">
              Create an account
            </Link>
          </div>
          <div className="field">
            <div className="field__label">Usename or email</div>
            <div className="field__wrap">
              <input type="email" className="field__input" ref={emailRef} />
            </div>
          </div>
          <div className="field">
            <div className="field__label">Password</div>
            <div className="field__wrap">
              <input
                type="password"
                className="field__input"
                ref={passwordRef}
              />
            </div>
          </div>
          <div className="field">
            <div className="field__wrap">
              <Link to={routesEnum.forgotPassword} className="login__link">
                Forgot password ?
              </Link>
            </div>
          </div>
          <Button
            type="primary"
            className="login__btn"
            wide
            htmlType="submit"
            loading={loginStatus === "loading"}
          >
            Continue
          </Button>
          <div className="login__or">Or continue with</div>
          <Button type="blue" className="login__btn" wide>
            Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
