import { FC } from "react";
import styles from "./index.module.scss";
import { Form as AntdForm, FormItemProps as AntdFormItemProps } from "antd";
import clsx from "clsx";

interface ItemProps extends AntdFormItemProps {
  className?: string;
}

const FormItem: FC<ItemProps> = ({ className, children, ...props }) => {
  return (
    <AntdForm.Item className={clsx(styles.wrapper, className)} {...props}>
      {children}
    </AntdForm.Item>
  );
};

export default FormItem;
