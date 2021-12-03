import { FC } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { loginRequest } from "api/auth/request";
import { LOCAL_STORAGE } from "utils/constant";
import { useAppDispatch } from "hooks/useRedux";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";

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
    <div className={"container"}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
