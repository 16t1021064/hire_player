import { FC } from "react";
import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

interface InputProps extends AntdInputProps {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return <AntdInput className={clsx(styles.input, className)} {...props} />;
};

export default Input;
