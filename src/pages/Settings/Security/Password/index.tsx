import { Col, Row } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import InputPassword from "components/Form/InputPassword";
import Label from "components/Form/Label";
import { FC } from "react";
import styles from "./index.module.scss";

const Password: FC = () => {
  return (
    <Form>
      <div className={clsx(styles.title, "h5")}>Change Password</div>
      <div className={styles.fieldset}>
        <Row gutter={[15, 15]}>
          <Col md={24}>
            <Label>Old Password</Label>
            <FormItem>
              <InputPassword />
            </FormItem>
          </Col>
          <Col md={24}>
            <Label>New Password</Label>
            <FormItem>
              <InputPassword />
            </FormItem>
          </Col>
          <Col md={24}>
            <Label>Confirm Password</Label>
            <FormItem>
              <InputPassword />
            </FormItem>
          </Col>
        </Row>
      </div>
      <Button type={"primary"}>Update</Button>
    </Form>
  );
};

export default Password;
