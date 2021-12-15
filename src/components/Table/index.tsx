import { FC } from "react";
import styles from "./index.module.scss";
import { Table as AntdTable, TableProps as AntdTableProps } from "antd";
import clsx from "clsx";

interface TableProps extends AntdTableProps<any> {
  className?: string;
}

const Table: FC<TableProps> = ({ className, ...props }) => {
  return <AntdTable className={clsx(styles.wrapper, className)} {...props} />;
};

export default Table;
