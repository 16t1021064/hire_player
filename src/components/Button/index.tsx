import { FC } from "react";
import { Button as AntdButton, ButtonProps as AtndButtonProps } from "antd";
import clsx from "clsx";
import styles from "./index.module.sass";

interface ButtonProps extends Omit<AtndButtonProps, "size" | "type"> {
  className?: string;
  size?: "small" | "xs__small";
  wide?: boolean;
  square?: boolean;
  type:
    | "primary"
    | "white"
    | "blue"
    | "orange"
    | "blue-dark"
    | "black"
    | "gray";
}

const Button: FC<ButtonProps> = ({
  className,
  size,
  wide = false,
  square = false,
  type = "primary",
  children,
  ...props
}) => {
  return (
    <AntdButton
      className={clsx(
        "btn",
        styles.button,
        size && `btn__${size}`,
        wide && `btn_wide`,
        square && `btn_square`,
        type && `btn_${type}`,
        className
      )}
      {...props}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
