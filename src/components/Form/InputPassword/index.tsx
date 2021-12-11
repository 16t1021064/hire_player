import { FC } from "react";
import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

interface InputPasswordProps extends AntdInputProps {
  className?: string;
}

const InputPassword: FC<InputPasswordProps> = ({ className, ...props }) => {
  return (
    <AntdInput.Password className={clsx(styles.input, className)} {...props} />
  );
};

export default InputPassword;
