import { FC } from "react";
import styles from "./index.module.scss";
import { Input as AntdInput } from "antd";
import { TextAreaProps as AntdTextAreaProps } from "antd/lib/input";
import clsx from "clsx";

interface TextAreaProps extends AntdTextAreaProps {
  className?: string;
}

const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <AntdInput.TextArea className={clsx(styles.input, className)} {...props} />
  );
};

export default TextArea;
