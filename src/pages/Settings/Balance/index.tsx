import { Col, Row, Typography } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import Input from "components/Form/Input";
import InputNumber from "components/Form/InputNumber";
import Label from "components/Form/Label";
import Select from "components/Form/Select";
import Table from "components/Table";
import { FC, useState } from "react";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import RechargeModal from "components/RechargeModal";

const columns = [
  {
    key: "amount",
    title: "AMOUNT",
    dataIndex: "amount",
  },
  {
    key: "time_withdraw",
    title: "TIME WITHDRAW",
    dataIndex: "time_withdraw",
  },
  {
    key: "method",
    title: "METHOD",
    dataIndex: "method",
  },
  {
    key: "status",
    title: "STATUS",
    dataIndex: "status",
  },
  {
    key: "note",
    title: "NOTE",
    dataIndex: "note",
  },
];

const dataSource = [
  {
    key: "1",
    amount: "$50",
    time_withdraw: "19/11/2021	",
    method: "PayPal | abc@gmail.com",
    status: (
      <Typography.Text type={"danger"} strong>
        Cancelled
      </Typography.Text>
    ),
    note: "",
  },
  {
    key: "2",
    amount: "$50",
    time_withdraw: "19/11/2021	",
    method: "PayPal | abc@gmail.com",
    status: (
      <Typography.Text type={"success"} strong>
        Completed
      </Typography.Text>
    ),
    note: "",
  },
];
const Balance: FC = () => {
  const [visibleRechargeModal, setVisibleRechargeModal] =
    useState<boolean>(false);

  const onCancelRecharge = () => {
    setVisibleRechargeModal(false);
  };

  const onRecharge = () => {
    setVisibleRechargeModal(true);
  };

  return (
    <>
      <Form>
        <div className={clsx(styles.title, "h5")}>Current balance</div>
        <div className={styles.balance}>
          <div className={clsx(styles.amount, "h2")}>$50</div>
          <Button type={"primary"} size={"small"} onClick={onRecharge}>
            <PlusOutlined />
            Recharge
          </Button>
        </div>
        <div className={styles.fieldset}>
          <Row gutter={[15, 15]}>
            <Col sm={24}>
              <Label>Withdraw Method</Label>
              <FormItem>
                <Select
                  items={[
                    { text: "Paypal", value: "paypal" },
                    { text: "Bank", value: "bank" },
                  ]}
                />
              </FormItem>
            </Col>
            <Col sm={12}>
              <Label>Email</Label>
              <FormItem>
                <Input />
              </FormItem>
            </Col>
            <Col sm={12}>
              <Label>Amount</Label>
              <FormItem>
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
        </div>
        <Button className={styles.button} type={"default"}>
          Request withdraw
        </Button>
        <div className={clsx(styles.title, "h5")}>Withdraw History</div>
        <Table columns={columns} dataSource={dataSource} />
      </Form>
      <RechargeModal
        visible={visibleRechargeModal}
        onCancel={onCancelRecharge}
      />
    </>
  );
};

export default Balance;
