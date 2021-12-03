import { Form, Row, Col, Button, Input } from "antd";
import useWebSocket from "hooks/useWebSocket";
import React, { FC, useEffect, useState } from "react";

const sendTag = (message: any): any => <span>&#11014;: {message}</span>;
const receiveTag = (message: any): any => <span>&#11015;: {message}</span>;

const Socket: FC = () => {
  const [messagesList, setMessagesList] = useState<any[]>([]);

  const ws = useWebSocket({
    socketUrl: `${process.env.REACT_APP_SOCKET_URL}`,
  });

  useEffect(() => {
    if (ws.data) {
      const { message } = ws.data;
      messagesList.unshift(receiveTag(message));
      setMessagesList(messagesList);
    }
  }, [ws.data]);

  const onFinish = (values: any) => {
    const message = values.message;
    if (message) {
      messagesList.unshift(sendTag(message));
      setMessagesList(messagesList);
      ws.send(message);
    }
  };

  return (
    <div className={"container"}>
      <div>Connection State: {ws.readyState ? "Open" : "Closed"}</div>
      <hr />
      <Form onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col flex={"none"}>
            <Form.Item
              name="message"
              rules={[{ required: true }]}
              label="Message (string or json):"
            >
              <Input.TextArea cols={50} />
            </Form.Item>
          </Col>
          <Col flex={"none"}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {messagesList.map((Tag, i) => (
          <div key={i}>{Tag}</div>
        ))}
      </div>
    </div>
  );
};

export default Socket;
