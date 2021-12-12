import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { resetPasswordRequest } from "api/auth/request";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Label from "components/Form/Label";
import InputPassword from "components/Form/InputPassword";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import { Modal } from "antd";
import { Form as AntdForm } from "antd";
import { useLocation } from "react-router";
import LoadingFullpage from "components/LoadingFullpage";
import qs from "qs";

const ResetPassword: FC = () => {
  const history = useHistory();
  const [form] = AntdForm.useForm();
  const location = useLocation();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loadingText, setLoadingText] = useState<string>("");

  useEffect(() => {
    const params: any = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params?.token && params?.id) {
      setToken(params.token);
      setUserId(params.id);
    } else {
      setLoadingText("Forbidden");
    }
  }, [location]);

  const { mutate: resetPassword, status: resetPasswordStatus } = useMutation(
    resetPasswordRequest,
    {
      onSuccess: (data) => {
        if (data.message === "RESET_PASSWORD_SUCCESS") {
          Modal.success({
            content: "Reset password successful",
            onOk: () => {
              history.push(routesEnum.login);
            },
          });
        }
      },
    }
  );

  const onFinish = (values: any) => {
    if (userId && token) {
      resetPassword({
        userId: userId,
        token: token,
        password: values.password,
      });
    }
  };

  if (!userId || !token) {
    return <LoadingFullpage tip={loadingText} />;
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Form
          form={form}
          className={styles.form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className={clsx(styles.title, "h3")}>Reset Password</div>
          <div className={styles.line}>
            <Link className={styles.link} to={routesEnum.login}>
              Back to login
            </Link>
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
              <InputPassword />
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
              <InputPassword />
            </FormItem>
          </div>
          <Button
            htmlType={"submit"}
            type={"primary"}
            loading={resetPasswordStatus === "loading"}
            stretch
          >
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
