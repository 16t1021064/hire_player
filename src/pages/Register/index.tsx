import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import { registerRequest, sendOtpRequest } from "api/auth/request";
import { LOCAL_STORAGE } from "utils/constant";
import { useAppDispatch } from "hooks/useRedux";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Label from "components/Form/Label";
import InputPassword from "components/Form/InputPassword";
import Input from "components/Form/Input";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import ReCAPTCHA from "react-google-recaptcha";
import { Col, message, Modal, Row, Tooltip } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { Form as AntdForm } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionOutlined } from "@ant-design/icons";

const reCAPTCHASitekey = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY;

const Register: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const reCAPTCHARef = useRef(null);
  const [reCAPTCHAValue, setReCAPTCHAValue] = useState<string | undefined>(
    undefined
  );
  const [enableCountdown, setEnableCountdown] = useState<boolean>(false);
  const [form] = AntdForm.useForm();
  const [otpData, setOtpData] = useState<any>({
    email: undefined,
    hash: undefined,
  });

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
          setOtpData({ ...otpData, email: data.email, hash: data.hash });
          Modal.success({
            content: t("response:SEND_OTP_SUCCESS", { email: data.email }),
          });
          setEnableCountdown(true);
        }
      },
    }
  );

  const freezyInput = useMemo(() => {
    return enableCountdown || registerStatus === "loading";
  }, [registerStatus, enableCountdown]);

  const onFinish = (values: any) => {
    if (!reCAPTCHAValue) {
      message.warning("Please check human verification");
      return;
    }

    if (!values?.otp || !otpData.hash) {
      message.warning("Please verify your email");
    } else if (values.email !== otpData.email) {
      message.warning("Please verify the new email");
    } else {
      register({
        userName: values.username,
        otp: values.otp,
        hash: otpData.hash,
        email: values.email,
        password: values.password,
      });
    }
  };

  useEffect(() => {
    if (reCAPTCHASitekey && reCAPTCHARef.current) {
      (reCAPTCHARef.current as any).reset();
      setReCAPTCHAValue(undefined);
    }
  }, []);

  const onReCAPTCHAChange = (value: any) => {
    setReCAPTCHAValue(value);
  };

  const onGetOTP = () => {
    form
      .validateFields()
      .then((values) => {
        if (!reCAPTCHAValue) {
          message.warning("Please check human verification");
          return;
        }
        if (!enableCountdown) {
          sendOtp({ email: values.email });
        }
      })
      .catch((error) => {
        console.log("form fail");
        console.log(error);
      });
  };

  const onFinishCountdown = () => {
    setEnableCountdown(false);
  };

  const usernameHelp = (
    <Tooltip
      title={
        <div>
          <div>Username must be:</div>
          <div>- Min length is 6, max length is 20</div>
          <div>
            - Contains letters, numberic or special characters (
            <strong>_ .</strong>)
          </div>
          <div>
            - Do not end with special character. No double character side by
            side
          </div>
        </div>
      }
    >
      <QuestionOutlined />
    </Tooltip>
  );

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Form
          form={form}
          className={styles.form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className={clsx(styles.title, "h3")}>Register</div>
          <div className={styles.line}>
            <div className={styles.text}>Already a user</div>
            <Link className={styles.link} to={routesEnum.login}>
              Login now
            </Link>
          </div>
          <div className={styles.field}>
            <Label>Username</Label>
            <FormItem
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (
                      !value.match(
                        /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
                      )
                    ) {
                      return Promise.reject(
                        new Error("User name invalid format")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input readOnly={freezyInput} suffix={usernameHelp} />
            </FormItem>
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
              <Input readOnly={freezyInput} autoComplete={"off"} />
            </FormItem>
          </div>
          <div className={styles.field}>
            <Label>Password</Label>
            <FormItem
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one letter and one number"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputPassword readOnly={freezyInput} />
            </FormItem>
          </div>
          <div className={styles.field}>
            <Label>Confirm Password</Label>
            <FormItem
              name="password2"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match"
                      )
                    );
                  },
                }),
              ]}
            >
              <InputPassword readOnly={freezyInput} />
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
          <div className={styles.field}>
            <Label>OTP</Label>
            <Row gutter={[15, 0]}>
              <Col flex={"auto"}>
                <FormItem name="otp">
                  <Input />
                </FormItem>
              </Col>
              <Col flex={"none"}>
                <Button
                  type={"primary"}
                  className={styles.otpButton}
                  onClick={onGetOTP}
                  disabled={enableCountdown}
                  loading={sendOtpStatus === "loading"}
                >
                  {enableCountdown ? "Resend in" : "Get OTP"}
                  {enableCountdown && (
                    <Countdown
                      className={styles.countdown}
                      value={Date.now() + 1000 * 60}
                      format={"s"}
                      onFinish={onFinishCountdown}
                    ></Countdown>
                  )}
                </Button>
              </Col>
            </Row>
          </div>
          <Button
            htmlType={"submit"}
            type={"primary"}
            loading={registerStatus === "loading"}
            stretch
          >
            Continue
          </Button>
          <div className={styles.or}>Sign up by Open ID</div>
          <Button type={"link"} stretch>
            Google
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
