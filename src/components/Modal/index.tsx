import React, { FC } from "react";
import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import clsx from "clsx";
import styles from "./index.module.sass";

interface ModalProps extends AntdModalProps {
  className?: string;
  visible: boolean;
  title?: React.ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Modal: FC<ModalProps> = ({
  className,
  visible,
  title,
  onCancel,
  children,
  ...props
}) => {
  const onClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onCancel) {
      onCancel(event);
    }
  };
  return (
    <AntdModal
      {...props}
      className={clsx(styles.wrapper, className)}
      visible={visible}
      footer={null}
      closable={false}
      onCancel={onCancel}
    >
      <div className={clsx("popup__form", styles.content)}>
        <div className="popup__title h5">{title}</div>
        {children}
        <button
          title="Close (Esc)"
          type="button"
          className={clsx(styles.close)}
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </AntdModal>
  );
};

export default Modal;
