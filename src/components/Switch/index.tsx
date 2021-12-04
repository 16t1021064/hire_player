import { FC } from "react";
import styles from "./index.module.scss";
import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from "antd";
import clsx from "clsx";

interface SwitchProps extends AntdSwitchProps {
  className?: string;
  antdClassName?: string;
  icon?: any;
}

const Switch: FC<SwitchProps> = ({
  className,
  antdClassName,
  icon,
  ...props
}) => {
  return (
    <label className={clsx(styles.wrapper, className)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <AntdSwitch className={clsx(styles.switch, antdClassName)} {...props} />
    </label>
  );
};

export default Switch;
