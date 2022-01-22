import Modal from "components/Modal";
import { FC, SyntheticEvent } from "react";
import { TUser } from "types";

interface DonateModalProps {
  player: TUser;
  visible: boolean;
  onClose: () => void;
}

const DonateModal: FC<DonateModalProps> = ({ player, visible, onClose }) => {
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Modal visible={visible} title={"Donate Player"} onCancel={onClose}>
      <form onSubmit={onSubmit}>
        <div className="popup__fieldset">
          <div className="popup__row">
            <div className="popup__field field">
              <div className="field__label">Receiver</div>
              <div className="field__wrap">
                <span>Tuong Nguyen</span>
              </div>
            </div>
            <div className="popup__field field">
              <div className="field__label">The amount</div>
              <div className="field__wrap">
                <input type="text" className="field__input" />
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
              ></textarea>
            </div>
          </div>
        </div>
        <button className="popup__btn btn btn_primary">Donate now</button>
      </form>
    </Modal>
  );
};

export default DonateModal;
