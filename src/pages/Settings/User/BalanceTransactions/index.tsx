import clsx from "clsx";
import Table from "components/Table";
import { FC } from "react";
import styles from "./index.module.scss";

const columns = [
  {
    key: "time",
    title: "TIME",
    dataIndex: "time",
  },
  {
    key: "amount",
    title: "AMOUNT",
    dataIndex: "amount",
  },
  {
    key: "message",
    title: "MESSAGE",
    dataIndex: "message",
  },
];

const dataSource = [
  {
    key: "1",
    time: "19/11/2021 04:22:26",
    amount: "$50",
    message: "Nice Player",
  },
  {
    key: "2",
    time: "19/11/2021 04:22:26",
    amount: "$50",
    message: "Nice Player",
  },
];

const BalanceTransactions: FC = () => {
  return (
    <div>
      <div className={clsx(styles.title, "h5")}>Balance transactions</div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default BalanceTransactions;
