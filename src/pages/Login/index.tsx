import { FC } from "react";
import { Form } from "antd";
import { useMutation } from "react-query";
import { loginRequest } from "api/auth/request";
import { LOCAL_STORAGE } from "utils/constant";
import { useAppDispatch } from "hooks/useRedux";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import styles from "./index.module.scss";
import clsx from "clsx";
import Input from "components/Input";
import Button from "components/Button";
import Label from "components/Label";
import InputPassword from "components/InputPassword";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { mutate: login } = useMutation(loginRequest, {
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE.accessToken, data.token);
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(data.userInfo));
      history.replace(routesEnum.home);
    },
  });

  const onFinish = (values: any) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Form className={styles.form} autoComplete="off" onFinish={onFinish}>
          <div className={clsx(styles.title, "h3")}>Sign in</div>
          <div className={styles.line}>
            <div className={styles.text}>New user?</div>
            <a className={styles.link} href="#">
              Create an account
            </a>
          </div>
          <div className={styles.field}>
            <Label>Usename or email</Label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={styles.field}>
            <Label>Password</Label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <InputPassword />
            </Form.Item>
          </div>
          <Button htmlType={"submit"} type={"primary"} stretch>
            Continue
          </Button>
          <div className={styles.or}>Or continue with</div>
          <Button type={"link"} stretch>
            Google
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
