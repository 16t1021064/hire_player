import { Button, message } from "antd";
import {
  playerAcceptHireRequest,
  playerCancelHireRequest,
} from "api/hires/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, THire, TUser } from "types";
import styles from "./styles.module.sass";

interface ActionPlayerOnRequestProps {
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const ActionPlayerOnRequest: FC<ActionPlayerOnRequestProps> = ({
  hire,
  onChangeHire,
}) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: accept, status: acceptStatus } = useMutation(
    playerAcceptHireRequest,
    {
      onSuccess: (data) => {
        message.success("You have accepted a hire");
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const { mutate: deny, status: denyStatus } = useMutation(
    playerCancelHireRequest,
    {
      onSuccess: (data) => {
        message.info("You have canceled a hire");
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const enable = useMemo((): boolean => {
    let hirePlayerId = hire?.player;
    if (hirePlayerId && typeof hirePlayerId !== "string") {
      hirePlayerId = (hire?.player as TUser).id;
    }
    if (
      hire &&
      hirePlayerId === userInfo?.id &&
      hire.hireStep === HireStepsEnum.USER_CREATED
    ) {
      return true;
    } else {
      return false;
    }
  }, [hire]);

  const disabled = useMemo((): boolean => {
    return acceptStatus === "loading" || denyStatus === "loading";
  }, [acceptStatus, denyStatus]);

  const onDeny = () => {
    if (!hire?.id) return;
    deny({ id: hire?.id, cancelReason: "busy" });
  };

  const onAccept = () => {
    if (!hire?.id) return;
    accept({ id: hire?.id });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={denyStatus === "loading"}
        onClick={onDeny}
        disabled={disabled}
        danger
      >
        Deny
      </Button>
      <Button
        className={styles.button}
        type="primary"
        loading={acceptStatus === "loading"}
        onClick={onAccept}
        disabled={disabled}
      >
        Accept
      </Button>
    </>
  ) : (
    <></>
  );
};

export default ActionPlayerOnRequest;
