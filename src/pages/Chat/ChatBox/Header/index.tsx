import IonIcon from "@reacticons/ionicons";
import { Button } from "antd";
import { userFinishRequest } from "api/hires/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, TConvertedConversation, THire, TUser } from "types";
import styles from "./index.module.sass";

interface HeaderProps {
  conv: TConvertedConversation;
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const Header: FC<HeaderProps> = ({ conv, hire, onChangeHire }) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: userFinish, status: userFinishLoading } = useMutation(
    userFinishRequest,
    {
      onSuccess: (data) => {
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const enableComplete = useMemo((): boolean => {
    let hireUserId = hire?.customer;
    if (hireUserId && typeof hireUserId !== "string") {
      hireUserId = (hire?.customer as TUser).id;
    }

    if (
      hire &&
      hireUserId === userInfo?.id &&
      hire.hireStep === HireStepsEnum.PLAYER_ACCEPT
    ) {
      return true;
    } else {
      return false;
    }
  }, [hire]);

  const onUserFinish = () => {
    if (userFinishLoading === "loading" || !hire?.id) {
      return;
    }
    userFinish({ id: hire.id });
  };

  return (
    <div className="chat_messenger__head">
      <div className="chat_messenger__title h6 mr-auto">
        {`${conv?.target?.userName}${
          conv?.target?.playerInfo?.playerName
            ? " - " + conv.target.playerInfo.playerName
            : ""
        }`}
      </div>
      <div className="chat__actions">
        {enableComplete && (
          <Button
            className={styles.finish}
            type="primary"
            loading={userFinishLoading === "loading"}
            onClick={onUserFinish}
          >
            Finish
          </Button>
        )}
        <button className="chat__action chat__action__btn__back__chat">
          <IonIcon
            className="icon icon-arrow-back-outline"
            name="arrow-back-outline"
          />
        </button>
        <button className="chat__action">
          <IonIcon
            className="icon icon-settings-outline"
            name="settings-outline"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
