import { FC, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import Button from "components/Button";
import { ChatbubbleEllipsesOutline } from "react-ionicons";
import HireModal from "components/HireModal";
import DonateModal from "components/DonateModal";
import MessageModal from "components/MessageModal";
import Avatar from "components/Avatar";
import { TPlayer } from "types";

interface HeaderProps {
  player: TPlayer;
}

const Header: FC<HeaderProps> = ({ player }) => {
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
            online={player?.isOnline ? true : undefined}
            size={"xl"}
          />
          <div className={styles.wrap}>
            <div
              className={clsx(
                styles.man,
                "h2",
                player?.playerVerified ? styles.confirm : undefined
              )}
            >
              {player.playerName}
            </div>
            <div className={styles.parameters}>
              <div className={styles.parameter}>
                {" "}
                <span>HAS BEEN HIRED</span>
                <strong>{player.totalTimeHired} hour</strong>
              </div>
              <div className={styles.parameter}>
                {" "}
                <span>COMPLETION RATE </span>
                <strong>{player.completionRate.toFixed(2)} %</strong>
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
