import { FC } from "react";
import {
  Pagination as AntdPagination,
  PaginationProps as AntdPaginationProps,
} from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

export interface PaginationProps extends AntdPaginationProps {
  className?: string;
  align?: "left" | "right";
}

const Pagination: FC<PaginationProps> = ({
  className,
  align = "left",
  ...props
}) => {
  return (
    <AntdPagination
      className={clsx(styles.wrapper, styles[align], className)}
      {...props}
    />
  );
};

export default Pagination;
