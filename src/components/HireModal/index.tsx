import Modal from "components/Modal";
import React, { FC } from "react";
import { Col, Row } from "antd";
import styles from "./index.module.scss";
import Select from "components/Form/Select";
import Button from "components/Button";
import Label from "components/Form/Label";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import TextArea from "components/Form/TextArea";

interface HireModalProps {
  visible: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

const HireModal: FC<HireModalProps> = ({ visible, onCancel }) => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      title={"Hire Player"}
      onCancel={onCancel}
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col md={12}>
            <Label>Player</Label>
            <div>Tuong Nguyen</div>
          </Col>
          <Col md={12}>
            <Label>Time to rent</Label>
            <FormItem
              name="time"
              rules={[{ required: true, message: "Please input time to rent" }]}
            >
              <Select
                items={[
                  { text: "1 Hour", value: "1h" },
                  { text: "2 Hour", value: "2h" },
                  { text: "3 Hour", value: "3h" },
                  { text: "4 Hour", value: "4h" },
                ]}
              />
            </FormItem>
          </Col>
          <Col md={12}>
            <Label>Cost</Label>
            <div>$20</div>
          </Col>
          <Col md={12}>
            <Label>Cost</Label>
            <div>$50</div>
          </Col>
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

export default HireModal;
