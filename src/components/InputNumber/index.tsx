import { FC } from "react";
import {
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
} from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

interface InputNumberProps extends AntdInputNumberProps {
  className?: string;
}

const InputNumber: FC<InputNumberProps> = ({ className, ...props }) => {
  return (
    <AntdInputNumber className={clsx(styles.input, className)} {...props} />
  );
};

export default InputNumber;
