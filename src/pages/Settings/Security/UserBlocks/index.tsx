import clsx from "clsx";
import Table from "components/Table";
import { FC } from "react";
import styles from "./index.module.scss";
import Button from "components/Button";
import { DeleteOutlined } from "@ant-design/icons";

const columns = [
  {
    key: "user",
    title: "USER",
    dataIndex: "user",
  },
  {
    key: "time_block",
    title: "TIME BLOCK",
    dataIndex: "time_block",
  },
  {
    key: "reason",
    title: "REASON",
    dataIndex: "reason",
  },
  {
    key: "actions",
    title: "ACTIONS",
    render: () => (
      <Button className={styles.button} type={"default"} stretch={false}>
        <DeleteOutlined />
      </Button>
    ),
  },
];

const dataSource = [
  {
    key: "1",
    user: "Phan Vien",
    time_block: "19/11/2021	",
    reason: "BLOCK USER",
  },
  {
    key: "2",
    user: "Phan Vien",
    time_block: "19/11/2021	",
    reason: "BLOCK USER",
  },
];

const UserBlocks: FC = () => {
  return (
    <div>
      <div className={clsx(styles.title, "h5")}>Block users list</div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default UserBlocks;
