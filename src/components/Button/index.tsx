import { FC } from "react";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

interface ButtonProps extends AntdButtonProps {
  className?: string;
  type?: "primary";
}

const Button: FC<ButtonProps> = ({
  className,
  type = "primary",
  children,
  ...props
}) => {
  return (
    <AntdButton
      className={clsx(styles.btn, styles[type], className)}
      {...props}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
