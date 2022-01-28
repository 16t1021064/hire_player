import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  getReceivedDonatesRequest,
  replyDonateRequest,
} from "api/donates/requests";
import { TDonate, TPagination, TUser } from "types";
import moment from "moment";
import { DATE_FORMAT, formatMoney } from "utils/format";
import { Button, Col, Form, Input, message, Pagination, Row } from "antd";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "components/Modal";
import SettingsLayout from "components/Layout/SettingsLayout";

const PlayerDonates: FC = () => {
  const [donates, setDonates] = useState<TDonate[]>([]);
  const [pagination, setPagination] = useState<TPagination>({
    limit: 10,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [repliedDonate, setRepliedDonate] = useState<TDonate | undefined>(
    undefined
  );
  const [replyForm] = Form.useForm();

  const { mutate: getReceivedDonates, status: getReceivedDonatesStatus } =
    useMutation(getReceivedDonatesRequest, {
      onSuccess: (data) => {
        setDonates(data.data.results);
        setPagination({
          ...pagination,
          limit: data.data.limit,
          page: data.data.page,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
        });
      },
    });

  useEffect(() => {
    getReceivedDonates({
      page: 1,
      limit: pagination.limit,
      populate: "fromUser",
      sortBy: "createdAt:desc",
    });
  }, []);

  const onPaginate = (page: number) => {
    if (getReceivedDonatesStatus !== "loading") {
      getReceivedDonates({
        page: page,
        limit: pagination.limit,
        populate: "fromUser",
        sortBy: "createdAt:desc",
      });
    }
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  const { mutate: replyDonate, status: replyDonateStatus } = useMutation(
    replyDonateRequest,
    {
      onSuccess: () => {
        setVisible(false);
        message.success("message sent");
        getReceivedDonates({
          page: pagination.page,
          limit: pagination.limit,
          populate: "fromUser",
        });
      },
    }
  );

  const onFinish = (values: any) => {
    if (repliedDonate && replyDonateStatus !== "loading") {
      replyDonate({
        id: repliedDonate.id,
        replyMessage: values.message,
      });
    }
  };

  const fnReply = (donate: TDonate) => {
    setRepliedDonate(donate);
    setVisible(true);
  };

  return (
    <SettingsLayout>
      <div className="setting__title h5">Received Donate</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>DONATED AT</th>
                <th>FROM USER</th>
                <th>AMOUNT</th>
                <th>MESSAGE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {donates.map((donate, pos: number) => (
                <tr key={pos}>
                  <td>{moment(donate.createdAt).format(DATE_FORMAT)}</td>
                  <td>{(donate.fromUser as TUser).userName}</td>
                  <td>{formatMoney(donate.amount || 0)}</td>
                  <td>{donate.message}</td>
                  <td>
                    {!donate.replyMessage && (
                      <a
                        className="btn btn__small btn_gray btn_square"
                        onClick={() => {
                          fnReply(donate);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faReply}
                          className="icon icon-trash-outline"
                        />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.totalResults}
            onChange={onPaginate}
          />
        </div>
      </div>
      <Modal
        visible={visible}
        title={`Reply to ${(repliedDonate?.fromUser as TUser)?.userName}`}
        onCancel={onCloseModal}
      >
        <Form form={replyForm} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <div>
                {(repliedDonate?.fromUser as TUser)?.userName}:{" "}
                {repliedDonate?.message}
              </div>
            </Col>
            <Col xs={24}>
              <label>Reply:</label>
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Message is required",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                loading={replyDonateStatus === "loading"}
              >
                Reply
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </SettingsLayout>
  );
};

export default PlayerDonates;
