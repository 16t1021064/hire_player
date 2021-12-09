import Modal from "components/Modal";
import React, { FC } from "react";
import { Col, Form, Row } from "antd";
import styles from "./index.module.scss";
import Input from "components/Input";
import InputNumber from "components/InputNumber";
import Select from "components/Select";
import Button from "components/Button";
import Label from "components/Label";

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
            <Form.Item
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
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Label>Amount</Label>
            <Form.Item
              name="amount"
              rules={[{ required: true, message: "Please input amount" }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Label>PayPal Email</Label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input payment email" },
                { type: "email", message: "Please input correct email" },
              ]}
            >
              <Input />
            </Form.Item>
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
