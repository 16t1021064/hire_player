import { FC } from "react";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

interface ButtonProps extends AntdButtonProps {
  className?: string;
  type?: "primary" | "link" | "ghost";
  size?: "middle" | "small";
  stretch?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  type = "primary",
  size = "middle",
  stretch = false,
  children,
  ...props
}) => {
  return (
    <AntdButton
      className={clsx(
        styles.btn,
        styles[type],
        styles[size],
        stretch ? styles.stretch : undefined,
        className
      )}
      {...props}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
