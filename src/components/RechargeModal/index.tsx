import Modal from "components/Modal";
import React, { FC } from "react";
import { Button, Col, Form, Row } from "antd";
import styles from "./index.module.scss";
import Input from "components/Input";
import InputNumber from "components/InputNumber";
import Select from "components/Select";

interface RechargeModalProps {
  visible: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

const RechargeModal: FC<RechargeModalProps> = ({ visible, onCancel }) => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal visible={visible} title={"Recharge"} onCancel={onCancel}>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <label className={styles.label}>Withdraw Method</label>
            <Form.Item
              name="method"
              rules={[
                { required: true, message: "Please input payment medthod" },
              ]}
            >
              <Select
                items={[
                  { text: "Male", value: "male" },
                  { text: "Female", value: "female" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <label className={styles.label}>Amount</label>
            <Form.Item
              name="amount"
              rules={[{ required: true, message: "Please input amount" }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <label className={styles.label}>PayPal Email</label>
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
