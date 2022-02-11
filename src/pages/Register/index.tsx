import { registerRequest, sendOtpRequest } from "api/auth/request";
import { useAppDispatch } from "hooks/useRedux";
import { routesEnum } from "pages/Routes";
import React, { FC, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { LOCAL_STORAGE } from "utils/constant";
import Countdown from "react-countdown";
import { notifySuccess, notifyWarning } from "utils/notify";
import { useTranslation } from "react-i18next";
import Button from "components/Button";

interface TOtpData {
  email: string | undefined;
  hash: string | undefined;
}

const Register: FC = () => {
  const { t } = useTranslation();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<TOtpData>({
    email: undefined,
    hash: undefined,
  });
  const [enableCountdown, setEnableCountdown] = useState<boolean>(false);

  const { mutate: register, status: registerStatus } = useMutation(
    registerRequest,
    {
      onSuccess: (data) => {
        localStorage.setItem(LOCAL_STORAGE.accessToken, data.accessToken);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, data.refreshToken);
        dispatch(setIsLogin(true));
        dispatch(setUserInfo(data.data));
        history.replace(routesEnum.home);
      },
    }
  );

  const { mutate: sendOtp, status: sendOtpStatus } = useMutation(
    sendOtpRequest,
    {
      onSuccess: (data) => {
        if (data.message === "SEND_OTP_SUCCESS") {
          setOtp({ ...otp, email: data.email, hash: data.hash });
          notifySuccess(t("response:SEND_OTP_SUCCESS", { email: data.email }));
          setEnableCountdown(true);
        }
      },
    }
  );

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      registerStatus !== "loading" &&
      usernameRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value &&
      otpRef.current?.value
    ) {
      if (!otp.hash) {
        notifyWarning("You need to verify your email");
        return;
      }

      if (otp.email !== emailRef.current.value) {
        notifyWarning("Make sure your OTP code map to submited email");
        return;
      }

      register({
        userName: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        otp: otpRef.current.value,
        hash: otp.hash,
      });
    }
  };

  const renderer = ({ seconds, completed }: any) => {
    if (completed) {
      setEnableCountdown(false);
      return undefined;
    } else {
      return seconds;
    }
  };

  const onSendOtp = () => {
    if (sendOtpStatus !== "loading" && emailRef.current?.value) {
      setOtp({ ...otp, email: undefined, hash: undefined });
      sendOtp({
        email: emailRef.current.value,
      });
    }
  };

  const loading = useMemo(() => {
    return registerStatus === "loading" || sendOtpStatus === "loading";
  }, [registerStatus, sendOtpStatus]);

  return (
    <div className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={onSubmit}>
          <div className="login__title h3">Sign up</div>
          <div className="login__line">
            <div className="login__text">Already a user</div>
            <Link to={routesEnum.login} className="login__link">
              Login now
            </Link>
          </div>
          <div className="field">
            <div className="field__label">Usename</div>
            <div className="field__wrap">
              <input className="field__input" type="text" ref={usernameRef} />
            </div>
          </div>
          <div className="field">
            <div className="field__label">Email Address</div>
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
          <div className="login__row">
            <div className="login__col field">
              <div className="field__label">Verify by OTP</div>
              <div className="field__wrap">
                <input type="text" className="field__input" ref={otpRef} />
              </div>
            </div>
            <div className="login__col field">
              <div className="field__label">&nbsp;</div>
              <div className="field__wrap">
                <Button
                  type="primary"
                  className="login__btn"
                  wide
                  disabled={enableCountdown}
                  onClick={onSendOtp}
                  loading={loading}
                >
                  {enableCountdown ? (
                    <Countdown date={Date.now() + 60000} renderer={renderer} />
                  ) : (
                    "Get Code"
                  )}
                </Button>
              </div>
            </div>
          </div>
          <Button
            htmlType="submit"
            className="login__btn"
            type="primary"
            wide
            loading={loading}
          >
            Continue
          </Button>
          <div className="login__or">Sign up by Open ID</div>
          <Button className="login__btn" type="blue" wide>
            Google Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
