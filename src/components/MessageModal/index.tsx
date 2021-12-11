import Modal from "components/Modal";
import React, { FC } from "react";
import { Col, Row } from "antd";
import styles from "./index.module.scss";
import Button from "components/Button";
import Label from "components/Form/Label";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import TextArea from "components/Form/TextArea";

interface MessageModalProps {
  visible: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

const MessageModal: FC<MessageModalProps> = ({ visible, onCancel }) => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      title={"Send a message"}
      onCancel={onCancel}
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col md={24}>
            <Label>Message</Label>
            <FormItem
              name="messsage"
              rules={[{ required: true, message: "Please input message" }]}
            >
              <TextArea rows={3} />
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

export default MessageModal;
