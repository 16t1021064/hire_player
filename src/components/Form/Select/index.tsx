import { FC } from "react";
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface Option {
  text: string;
  value: any;
}

interface SelectProps extends AntdSelectProps<any> {
  items: Option[];
  className?: string;
}

const Select: FC<SelectProps> = ({ items, className, ...props }) => {
  return (
    <AntdSelect className={clsx(styles.select, className)} {...props}>
      {items.map((item: Option, position: number) => (
        <AntdSelect.Option key={position} value={item.value}>
          {item.text}
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
};

export default Select;
