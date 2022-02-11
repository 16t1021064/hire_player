import { requestResetPasswordRequest } from "api/auth/request";
import Button from "components/Button";
import { routesEnum } from "pages/Routes";
import React, { FC, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import notify from "utils/notify";

const ForgotPassword: FC = () => {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { mutate: requestResetPassword, status: requestResetPasswordStatus } =
    useMutation(requestResetPasswordRequest, {
      onSuccess: (data) => {
        if (data.message === "REQUEST_RESET_PASSWORD_SUCCESS") {
          setDisabled(true);
          notify(
            {
              message: "Reset link has been sent to your email successful",
              onRemoval: () => {
                history.push(routesEnum.home);
              },
            },
            "success"
          );
        }
      },
    });

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      requestResetPasswordStatus !== "loading" &&
      !disabled &&
      emailRef.current?.value
    ) {
      requestResetPassword({
        email: emailRef.current.value,
      });
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={onSubmit}>
          <div className="login__title h3">Forgot Password</div>
          <div className="login__line">
            <Link to={routesEnum.login} className="login__link">
              Back to login
            </Link>
          </div>
          <div className="field">
            <div className="field__label">Email</div>
            <div className="field__wrap">
              <input type="email" className="field__input" ref={emailRef} />
            </div>
          </div>
          <Button
            htmlType="submit"
            className="login__btn"
            type="primary"
            wide
            loading={requestResetPasswordStatus === "loading"}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
