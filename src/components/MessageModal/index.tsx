import { message } from "antd";
import {
  checkExistRequest,
  createConversationRequest,
} from "api/conversations/request";
import { createMessageRequest } from "api/messages/request";
import Modal from "components/Modal";
import { useAppSelector } from "hooks/useRedux";
import { FC, SyntheticEvent, useRef } from "react";
import { useMutation } from "react-query";
import { TUser } from "types";

interface MessageModalProps {
  player: TUser;
  visible: boolean;
  onClose: () => void;
}

const MessageModal: FC<MessageModalProps> = ({ player, visible, onClose }) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const fnClose = () => {
    if (messageRef.current?.value) {
      messageRef.current.value = "";
    }
    onClose();
  };

  const { mutate: send, status: sendStatus } = useMutation(
    createMessageRequest,
    {
      onSuccess: () => {
        message.success("Message sent");
        fnClose();
      },
    }
  );

  const sendMessage = (convId: string | undefined) => {
    const message = messageRef.current?.value;
    if (!convId || !userInfo) return;
    send({
      id: convId,
      body: {
        content: message,
      },
      senderId: userInfo.id,
    });
  };

  const { mutate: create, status: createStatus } = useMutation(
    createConversationRequest,
    {
      onSuccess: (data) => {
        sendMessage(data.data.id);
      },
    }
  );

  const { mutate: check, status: checkStatus } = useMutation(
    checkExistRequest,
    {
      onSuccess: (data) => {
        if (data.data.isExist) {
          sendMessage(data.data.conversationId);
        } else {
          create({
            userId: player.id,
          });
        }
      },
    }
  );

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const message = messageRef.current?.value;
    if (
      message &&
      createStatus !== "loading" &&
      checkStatus !== "loading" &&
      sendStatus !== "loading"
    ) {
      check({
        userId: player.id,
      });
    }
  };

  return (
    <Modal visible={visible} title={"Send a message"} onCancel={fnClose}>
      <form onSubmit={onSubmit}>
        <div className="popup__fieldset">
          <div className="popup__field field">
            <div className="field__label">Message</div>
            <div className="field__wrap">
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                className="field__textarea"
                ref={messageRef}
              ></textarea>
            </div>
          </div>
        </div>
        <button className="popup__btn btn btn_primary">Send now</button>
      </form>
    </Modal>
  );
};

export default MessageModal;
