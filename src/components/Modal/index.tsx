import React, { FC, useMemo } from "react";
import styles from "./index.module.scss";
import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import clsx from "clsx";

interface ModalProps extends AntdModalProps {
  className?: string;
  title?: React.ReactNode | string;
}

const Modal: FC<ModalProps> = ({ className, title, children, ...props }) => {
  const convertedTitle = useMemo(() => {
    if (title) {
      return <div className={"h5"}>{title}</div>;
    } else {
      return null;
    }
  }, [title]);

  return (
    <div className={clsx(className)}>
      <AntdModal
        className={styles.modal}
        title={convertedTitle}
        footer={null}
        width={630}
        {...props}
      >
        {children}
      </AntdModal>
    </div>
  );
};

export default Modal;
