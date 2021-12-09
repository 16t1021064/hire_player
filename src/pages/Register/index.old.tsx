import { FC } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { registerRequest } from "api/auth/request";
import { LOCAL_STORAGE } from "utils/constant";
import { useAppDispatch } from "hooks/useRedux";
import { setIsLogin, setUserInfo } from "store/ducks/auth/slice";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { mutate: register } = useMutation(registerRequest, {
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE.accessToken, data.token);
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(data.userInfo));
      history.replace(routesEnum.home);
    },
  });

  const onFinish = (values: any) => {
    register({
      name: values.name,
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password" },
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match")
                );
              },
            }),
          ]}
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

export default Register;
