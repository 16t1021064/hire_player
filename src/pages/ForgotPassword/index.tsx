import { FC, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { requestResetPasswordRequest } from "api/auth/request";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import styles from "./index.module.scss";
import clsx from "clsx";
import Input from "components/Form/Input";
import Button from "components/Button";
import Label from "components/Form/Label";
import { Link } from "react-router-dom";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import { message, Modal } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

const reCAPTCHASitekey = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY;

const ForgotPassword: FC = () => {
  const history = useHistory();
  const reCAPTCHARef = useRef(null);
  const [reCAPTCHAValue, setReCAPTCHAValue] = useState<string | undefined>(
    undefined
  );

  const { mutate: requestResetPassword, status: requestResetPasswordStatus } =
    useMutation(requestResetPasswordRequest, {
      onSuccess: (data) => {
        if (data.message === "REQUEST_RESET_PASSWORD_SUCCESS") {
          Modal.success({
            content: "Reset link has been sent to your email successful",
            onOk: () => {
              history.push(routesEnum.home);
            },
          });
        }
      },
    });

  const onFinish = (values: any) => {
    if (!reCAPTCHAValue) {
      message.warning("Please check human verification");
      return;
    }

    requestResetPassword({
      email: values.email,
    });
  };

  const onReCAPTCHAChange = (value: any) => {
    setReCAPTCHAValue(value);
  };

  useEffect(() => {
    if (reCAPTCHASitekey && reCAPTCHARef.current) {
      (reCAPTCHARef.current as any).reset();
      setReCAPTCHAValue(undefined);
    }
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Form className={styles.form} autoComplete="off" onFinish={onFinish}>
          <div className={clsx(styles.title, "h3")}>Forgot password</div>
          <div className={styles.line}>
            <Link className={styles.link} to={routesEnum.login}>
              Back to login
            </Link>
          </div>
          <div className={styles.field}>
            <Label>Email</Label>
            <FormItem
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please input valid email!" },
              ]}
            >
              <Input />
            </FormItem>
          </div>
          {reCAPTCHASitekey && (
            <div className={styles.field}>
              <ReCAPTCHA
                ref={reCAPTCHARef}
                sitekey={reCAPTCHASitekey}
                onChange={onReCAPTCHAChange}
              />
            </div>
          )}
          <Button
            htmlType={"submit"}
            type={"primary"}
            loading={requestResetPasswordStatus === "loading"}
            stretch
          >
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
