import clsx from "clsx";
import { FC } from "react";
import styles from "./index.module.scss";

interface LabelProps {
  className?: string;
}

const Label: FC<LabelProps> = ({ className, children }) => {
  return <label className={clsx(styles.label, className)}>{children}</label>;
};

export default Label;
