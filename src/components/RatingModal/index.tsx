import { Col, Form, Input, Modal, Rate, Row } from "antd";
import { createReviewRequest } from "api/reviews/request";
import { TCreateReviewRequest } from "api/reviews/types";
import { useAppSelector } from "hooks/useRedux";
import { FC, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { SocketListeners } from "socket";
import { Socket } from "socket.io-client";
import { TListenerData_OnHires } from "socket/types";
import { HireStepsEnum, THire, TUser } from "types";
import { notifySuccess } from "utils/notify";
import styles from "./index.module.sass";

interface RatingModalProps {
  socketInstance: Socket | undefined;
  socketConnected: boolean;
}

const tooltips = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

const RatingModal: FC<RatingModalProps> = ({
  socketInstance,
  socketConnected,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [player, setPlayer] = useState<TUser | undefined>(undefined);
  const [hire, setHire] = useState<THire | undefined>(undefined);
  const handleOnHiresRef = useRef<
    ((data: TListenerData_OnHires) => void) | null
  >(null);
  const [value, setValue] = useState<number>(3);
  const [form] = Form.useForm();
  const { userInfo } = useAppSelector((state) => state.auth);

  const handleOnHires = (data: TListenerData_OnHires) => {
    let userId = data?.customer;
    if (typeof data?.customer === "object") {
      userId = (data.customer as TUser).id;
    }
    if (
      !userInfo ||
      userId !== userInfo.id ||
      !data ||
      data.hireStep !== HireStepsEnum.HIRE_COMPLETED
    ) {
      return;
    }
    setHire(data);
    if (typeof data.player === "undefined" || typeof data.player === "string") {
      setPlayer(undefined);
    } else {
      setPlayer({ ...data.player } as TUser);
    }
    if (!visible && data) {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (!socketConnected) {
      return;
    }
    if (handleOnHiresRef.current) {
      socketInstance?.removeListener(
        SocketListeners.onHires,
        handleOnHiresRef.current
      );
    }
    handleOnHiresRef.current = handleOnHires;
    socketInstance?.on(SocketListeners.onHires, handleOnHiresRef.current);
  }, [socketConnected, setHire, setPlayer, visible, setVisible]);

  const onCancel = () => {
    setVisible(false);
  };

  const { mutate: createReview, status: createReviewStatus } = useMutation(
    createReviewRequest,
    {
      onSuccess: () => {
        notifySuccess("Thanks for your feedback");
        setVisible(false);
      },
    }
  );

  const onFinish = (values: any) => {
    if (!hire || createReviewStatus === "loading") return;
    const data: TCreateReviewRequest = { id: hire.id, starPoint: value };
    if (values.message) {
      data.content = values.message;
    }
    createReview(data);
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      visible={visible}
      title={`Rate for ${player?.playerInfo?.playerName}`}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={createReviewStatus === "loading"}
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <label>Rating</label>
              </Col>
              <Col xs={24} lg={16}>
                <Rate tooltips={tooltips} onChange={setValue} value={value} />
                {value ? (
                  <span className={styles.desc}>{tooltips[value - 1]}</span>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <label>Message</label>
              </Col>
              <Col xs={24} lg={16}>
                <Form.Item name="message">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RatingModal;
