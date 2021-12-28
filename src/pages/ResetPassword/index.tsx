import React, { FC, useEffect, useRef, useState } from "react";
import qs from "qs";
import { useMutation } from "react-query";
import { resetPasswordRequest } from "api/auth/request";
import { Link, useHistory, useLocation } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import notify from "utils/notify";

interface TData {
  userId: string | undefined;
  token: string | undefined;
}

const ResetPassword: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [forbidden, setForbidden] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TData | undefined>({
    userId: undefined,
    token: undefined,
  });

  useEffect(() => {
    const params: any = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params?.token && params?.id) {
      setData({ ...data, userId: params.id, token: params.token });
    } else {
      setForbidden(true);
    }
  }, [location]);

  const { mutate: resetPassword, status: resetPasswordStatus } = useMutation(
    resetPasswordRequest,
    {
      onSuccess: (data) => {
        if (data.message === "RESET_PASSWORD_SUCCESS") {
          setDisabled(true);
          notify(
            {
              message: "Reset password successful",
              onRemoval: () => {
                history.push(routesEnum.login);
              },
            },
            "success"
          );
        }
      },
    }
  );

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      resetPasswordStatus !== "loading" &&
      !disabled &&
      passwordRef.current?.value &&
      data?.userId &&
      data?.token
    ) {
      resetPassword({
        userId: data.userId,
        token: data.token,
        password: passwordRef.current.value,
      });
    }
  };

  return forbidden ? (
    <></>
  ) : (
    <div className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={onSubmit}>
          <div className="login__title h3">Reset Password</div>
          <div className="login__line">
            <Link to={routesEnum.login} className="login__link">
              Back to login
            </Link>
          </div>
          <div className="field">
            <div className="field__label">New password</div>
            <div className="field__wrap">
              <input
                type="password"
                className="field__input"
                ref={passwordRef}
              />
            </div>
          </div>
          <button type="submit" className="login__btn btn btn_primary btn_wide">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
