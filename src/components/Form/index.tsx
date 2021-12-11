import { FC } from "react";
import styles from "./index.module.scss";
import { Form as AntdForm, FormProps as AntdFormProps } from "antd";
import clsx from "clsx";

interface FormProps extends AntdFormProps {
  className?: string;
}

const Form: FC<FormProps> = ({ className, children, ...props }) => {
  return (
    <AntdForm className={clsx(styles.wrapper, className)} {...props}>
      {children}
    </AntdForm>
  );
};

export default Form;
