import { Col, Row } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import Input from "components/Form/Input";
import Label from "components/Form/Label";
import { FC } from "react";
import styles from "./index.module.scss";

const Payment: FC = () => {
  return (
    <Form>
      <div className={clsx(styles.title, "h5")}>Setting Payments</div>
      <div className={styles.fieldset}>
        <Row gutter={[15, 15]}>
          <Col sm={12}>
            <Label>PayPal Address</Label>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
        </Row>
      </div>
      <Button type={"primary"}>Update</Button>
    </Form>
  );
};

export default Payment;
