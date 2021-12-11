import Modal from "components/Modal";
import React, { FC } from "react";
import { Col, Row } from "antd";
import styles from "./index.module.scss";
import Input from "components/Form/Input";
import InputNumber from "components/Form/InputNumber";
import Select from "components/Form/Select";
import Button from "components/Button";
import Label from "components/Form/Label";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";

interface RechargeModalProps {
  visible: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

const RechargeModal: FC<RechargeModalProps> = ({ visible, onCancel }) => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      className={styles.modal}
      visible={visible}
      title={"Recharge"}
      onCancel={onCancel}
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Label>Withdraw Method</Label>
            <FormItem
              name="method"
              rules={[
                { required: true, message: "Please input payment medthod" },
              ]}
            >
              <Select
                items={[
                  { text: "PayPal", value: "paypal" },
                  { text: "Bank", value: "bank" },
                ]}
              />
            </FormItem>
          </Col>
          <Col lg={12}>
            <Label>Amount</Label>
            <FormItem
              name="amount"
              rules={[{ required: true, message: "Please input amount" }]}
            >
              <InputNumber />
            </FormItem>
          </Col>
          <Col lg={12}>
            <Label>PayPal Email</Label>
            <FormItem
              name="email"
              rules={[
                { required: true, message: "Please input payment email" },
                { type: "email", message: "Please input correct email" },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col lg={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RechargeModal;
