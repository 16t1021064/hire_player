import clsx from "clsx";
import Table from "components/Table";
import { FC } from "react";
import styles from "./index.module.scss";

const columns = [
  {
    key: "donate_code",
    title: "DONATE CODE",
    dataIndex: "donate_code",
  },
  {
    key: "time",
    title: "TIME",
    dataIndex: "time",
  },
  {
    key: "to_player",
    title: "TO PLAYER",
    dataIndex: "to_player",
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
    donate_code: "125e5448f0e01e",
    time: "19/11/2021	",
    to_player: "Tuong Nguyen",
    amount: "$50",
    message: "Nice Player",
  },
  {
    key: "2",
    donate_code: "125e5448f0e01e",
    time: "19/11/2021	",
    to_player: "Tuong Nguyen",
    amount: "$50",
    message: "Nice Player",
  },
];

const DonatedList: FC = () => {
  return (
    <div>
      <div className={clsx(styles.title, "h5")}>Donated List</div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default DonatedList;
