import { message } from "antd";
import { createHireRequest } from "api/hires/request";
import Modal from "components/Modal";
import { useAppSelector } from "hooks/useRedux";
import { FC, SyntheticEvent, useRef } from "react";
import { useMutation } from "react-query";
import { TUser } from "types";
import { formatMoney } from "utils/format";

interface HireModalProps {
  player: TUser;
  visible: boolean;
  onClose: () => void;
}

const HireModal: FC<HireModalProps> = ({ player, visible, onClose }) => {
  const hireHoursRef = useRef<HTMLSelectElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const { userInfo } = useAppSelector((state) => state.auth);

  const { mutate: createHire, status: createHireStatus } = useMutation(
    createHireRequest,
    {
      onSuccess: () => {
        message.success("Your request sent successful");
        onClose();
      },
    }
  );

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const hours = parseInt(`${hireHoursRef.current?.value}`) || 0;
    const message = messageRef.current?.value;
    if (createHireStatus !== "loading" && hours && message) {
      createHire({
        playerId: player?.id || "",
        timeRent: hours,
        customerNote: message,
      });
    }
  };

  return (
    <Modal visible={visible} title={"Hire Player"} onCancel={onClose}>
      <form onSubmit={onSubmit}>
        <div className="popup__fieldset">
          <div className="popup__row">
            <div className="popup__field field">
              <div className="field__label">Player</div>
              <div className="field__wrap"></div>
              <span>{player.playerInfo?.playerName}</span>
            </div>
            <div className="popup__field field">
              <div className="field__label">Time to rent</div>
              <div className="field__wrap">
                <select className="field__select" ref={hireHoursRef}>
                  {Array.from(
                    Array(player?.playerInfo?.timeMaxHire || 0).keys()
                  ).map((num) => (
                    <option key={num} value={num + 1}>
                      {num + 1} hour
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="popup__row">
            <div className="popup__field field">
              <div className="field__label">Cost</div>
              <div className="field__wrap">
                <span>${player.playerInfo?.costPerHour || 0}</span>
              </div>
            </div>
            <div className="popup__field field">
              <div className="field__label">Current balance</div>
              <div className="field__wrap">
                <span>{formatMoney(userInfo?.money || 0)}</span>
              </div>
            </div>
          </div>
          <div className="popup__field field">
            <div className="field__label">Message</div>
            <div className="field__wrap">
              <textarea
                cols={30}
                rows={10}
                className="field__textarea"
                ref={messageRef}
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="popup__btn btn btn_primary">
          Hire now
        </button>
      </form>
    </Modal>
  );
};

export default HireModal;
