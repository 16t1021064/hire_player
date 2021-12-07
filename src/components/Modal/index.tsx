import React, { FC, useMemo } from "react";
import styles from "./index.module.scss";
import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import clsx from "clsx";
import { CloseOutlined } from "@ant-design/icons";

interface ModalProps extends AntdModalProps {
  className?: string;
  title?: React.ReactNode | string;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

const Modal: FC<ModalProps> = ({
  className,
  title,
  onCancel,
  children,
  ...props
}) => {
  const convertedTitle = useMemo(() => {
    if (title) {
      return (
        <div className={styles.header}>
          <div className={clsx(styles.title, "h5")}>{title}</div>
          <div className={styles.close}>
            <a onClick={onCancel}>
              <CloseOutlined />
            </a>
          </div>
        </div>
      );
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
        closable={false}
        onCancel={onCancel}
        {...props}
      >
        {children}
      </AntdModal>
    </div>
  );
};

export default Modal;
