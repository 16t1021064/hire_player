import { FC, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import Button from "components/Button";
import { ChatbubbleEllipsesOutline } from "react-ionicons";
import HireModal from "components/HireModal";
import DonateModal from "components/DonateModal";
import MessageModal from "components/MessageModal";
import Avatar from "components/Avatar";

const Header: FC = () => {
  const [visibleHireModal, setVisibleHireModal] = useState<boolean>(false);
  const [visibleDonateModal, setVisibleDonateModal] = useState<boolean>(false);
  const [visibleMessageModal, setVisibleMessageModal] =
    useState<boolean>(false);

  const onHire = () => {
    setVisibleHireModal(true);
  };

  const onCancelHire = () => {
    setVisibleHireModal(false);
  };

  const onDonate = () => {
    setVisibleDonateModal(true);
  };

  const onCancelDonate = () => {
    setVisibleDonateModal(false);
  };

  const onMessage = () => {
    setVisibleMessageModal(true);
  };

  const onCancelMessage = () => {
    setVisibleMessageModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.details}>
          <Avatar
            className={styles.avatar}
            hasOutline
            online={true}
            size={"xl"}
          />
          <div className={styles.wrap}>
            <div className={clsx(styles.man, "h2", styles.confirm)}>
              Tuong Nguyen
            </div>
            <div className={styles.parameters}>
              <div className={styles.parameter}>
                {" "}
                <span>HAS BEEN HIRED</span>
                <strong>3000 hour</strong>
              </div>
              <div className={styles.parameter}>
                {" "}
                <span>COMPLETION RATE </span>
                <strong>93.67 %</strong>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <Button type={"primary"} size={"small"} onClick={onHire}>
            Hire
          </Button>
          <Button type={"ghost"} size={"small"} onClick={onDonate}>
            Donate
          </Button>
          <Button type={"ghost"} size={"small"} onClick={onMessage}>
            <ChatbubbleEllipsesOutline />
          </Button>
        </div>
      </div>
      <HireModal visible={visibleHireModal} onCancel={onCancelHire} />
      <DonateModal visible={visibleDonateModal} onCancel={onCancelDonate} />
      <MessageModal visible={visibleMessageModal} onCancel={onCancelMessage} />
    </div>
  );
};

export default Header;
