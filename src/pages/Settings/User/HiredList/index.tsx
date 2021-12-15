import clsx from "clsx";
import Table from "components/Table";
import { FC } from "react";
import styles from "./index.module.scss";
import { Typography } from "antd";

const columns = [
  {
    key: "hire_code",
    title: "HIRE CODE",
    dataIndex: "hire_code",
  },
  {
    key: "created_at",
    title: "CREATED AT",
    dataIndex: "created_at",
  },
  {
    key: "player",
    title: "PLAYER",
    dataIndex: "player",
  },
  {
    key: "status",
    title: "STATUS",
    dataIndex: "status",
  },
];

const dataSource = [
  {
    key: "1",
    hire_code: "125e5448f0e01e",
    created_at: "19/11/2021	",
    player: "Tuong Nguyen",
    status: (
      <Typography.Text type={"danger"} strong>
        Cancelled
      </Typography.Text>
    ),
  },
  {
    key: "2",
    hire_code: "125e5448f0e01e",
    created_at: "19/11/2021	",
    player: "Tuong Nguyen",
    status: (
      <Typography.Text type={"success"} strong>
        Completed
      </Typography.Text>
    ),
  },
];

const HiredList: FC = () => {
  return (
    <div>
      <div className={clsx(styles.title, "h5")}>User Info</div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default HiredList;
