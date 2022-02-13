import { createDonateRequest } from "api/donates/requests";
import Button from "components/Button";
import Modal from "components/Modal";
import { FC, SyntheticEvent, useRef } from "react";
import { useMutation } from "react-query";
import { TUser } from "types";
import { notifySuccess } from "utils/notify";

interface DonateModalProps {
  player: TUser;
  visible: boolean;
  onClose: () => void;
}

const DonateModal: FC<DonateModalProps> = ({ player, visible, onClose }) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);

  const fnClose = () => {
    if (messageRef.current?.value) {
      messageRef.current.value = "";
    }
    if (amountRef.current?.value) {
      amountRef.current.value = "";
    }
    onClose();
  };

  const { mutate: donate, status: donateStatus } = useMutation(
    createDonateRequest,
    {
      onSuccess: () => {
        notifySuccess(`Your donate sent successfully`);
        fnClose();
      },
    }
  );

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const message = messageRef.current?.value;
    const amount = parseFloat(amountRef.current?.value || "0");
    if (message && amount > 0 && donateStatus !== "loading") {
      donate({
        amount: amount,
        message: message,
        toUser: player.id,
      });
    }
  };

  return (
    <Modal visible={visible} title={"Donate Player"} onCancel={fnClose}>
      <form onSubmit={onSubmit}>
        <div className="popup__fieldset">
          <div className="popup__row">
            <div className="popup__field field">
              <div className="field__label">Receiver</div>
              <div className="field__wrap">
                <span>{player.playerInfo?.playerName}</span>
              </div>
            </div>
            <div className="popup__field field">
              <div className="field__label">The amount</div>
              <div className="field__wrap">
                <input
                  type="number"
                  min={0}
                  step={1}
                  className="field__input"
                  defaultValue={0}
                  ref={amountRef}
                />
              </div>
            </div>
          </div>
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
        <Button
          htmlType="submit"
          className="popup__btn"
          type="primary"
          loading={donateStatus === "loading"}
        >
          Donate now
        </Button>
      </form>
    </Modal>
  );
};

export default DonateModal;
