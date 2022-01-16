import IonIcon from "@reacticons/ionicons";
import { FC } from "react";
import { TConvertedConversation, THire } from "types";
import ActionOnRequest from "./ActionOnRequest";
import ActionOnUserProcess from "./ActionOnUserProcess";

interface HeaderProps {
  conv: TConvertedConversation;
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const Header: FC<HeaderProps> = ({ conv, hire, onChangeHire }) => {
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
        <ActionOnUserProcess hire={hire} onChangeHire={onChangeHire} />
        <ActionOnRequest hire={hire} onChangeHire={onChangeHire} />
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
