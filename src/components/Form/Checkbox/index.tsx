import { FC } from "react";
import styles from "./index.module.scss";
import {
  Checkbox as AntdCheckbox,
  CheckboxProps as AntdCheckboxProps,
} from "antd";
import clsx from "clsx";

interface CheckboxProps extends AntdCheckboxProps {
  className?: string;
  size?: "md" | "lg";
}

const Checkbox: FC<CheckboxProps> = ({
  className,
  size = "md",
  children,
  ...props
}) => {
  return (
    <AntdCheckbox
      className={clsx(styles.wrap, styles[size], className)}
      {...props}
    >
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
