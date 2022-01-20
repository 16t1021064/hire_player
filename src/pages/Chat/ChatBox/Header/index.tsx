import IonIcon from "@reacticons/ionicons";
import { FC } from "react";
import { TConvertedConversation, THire } from "types";
import ActionAdminOnComplain from "./ActionAdminOnComplain";
import ActionPlayerOnRequest from "./ActionPlayerOnRequest";
import ActionUserOnComplain from "./ActionUserOnComplain";
import ActionUserOnProcess from "./ActionUserOnProcess";
import ActionUserOnRequest from "./ActionUserOnRequest";

interface HeaderProps {
  conv: TConvertedConversation;
  hire?: THire;
  onChangeHire: (hire: THire) => void;
  onChangeConv: (conv: TConvertedConversation | undefined) => void;
}

const Header: FC<HeaderProps> = ({
  conv,
  hire,
  onChangeHire,
  onChangeConv,
}) => {
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
        <ActionUserOnRequest hire={hire} onChangeHire={onChangeHire} />
        <ActionPlayerOnRequest hire={hire} onChangeHire={onChangeHire} />
        <ActionUserOnProcess hire={hire} onChangeHire={onChangeHire} />
        <ActionUserOnComplain hire={hire} onChangeHire={onChangeHire} />
        {hire && (
          <ActionAdminOnComplain
            conv={conv}
            hire={hire}
            onChangeConv={onChangeConv}
          />
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
