import { FC, MouseEvent, ReactNode } from "react";
import {
  Button,
  Col,
  Modal as AntdModal,
  ModalProps as AntdModalProps,
  Row,
} from "antd";

interface ConfirmModalProps extends AntdModalProps {
  visible: boolean;
  title?: ReactNode | string;
  textCancel?: string;
  onCancel: (event: MouseEvent) => void;
  enableNo?: boolean;
  onNo?: (event: MouseEvent) => void;
  loadingNo?: boolean;
  textNo?: string;
  onYes?: (event: MouseEvent) => void;
  loadingYes?: boolean;
  textYes?: string;
  freezy?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  visible,
  title,
  textCancel,
  onCancel,
  enableNo = false,
  loadingNo = false,
  onNo,
  textNo,
  loadingYes = false,
  textYes,
  onYes,
  freezy = false,
  children,
  ...props
}) => {
  return (
    <AntdModal
      {...props}
      visible={visible}
      title={title}
      footer={
        <Row gutter={[8, 8]} justify="end">
          <Col>
            <Button type="default" onClick={onCancel} disabled={freezy}>
              {textCancel || "Cancel"}
            </Button>
          </Col>
          {enableNo && (
            <Col>
              <Button
                type="primary"
                danger
                disabled={freezy}
                onClick={onNo}
                loading={loadingNo}
              >
                {textNo || "Deny"}
              </Button>
            </Col>
          )}

          <Col>
            <Button
              type="primary"
              disabled={freezy}
              onClick={onYes}
              loading={loadingYes}
            >
              {textYes || "Apcept"}
            </Button>
          </Col>
        </Row>
      }
      onCancel={onCancel}
    >
      {children}
    </AntdModal>
  );
};

export default ConfirmModal;
