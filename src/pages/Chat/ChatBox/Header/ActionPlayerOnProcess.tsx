import { Button } from "antd";
import { playerCompleteRequest } from "api/hires/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, THire, TUser } from "types";
import styles from "./styles.module.sass";

interface ActionPlayerOnProcessProps {
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const ActionPlayerOnProcess: FC<ActionPlayerOnProcessProps> = ({
  hire,
  onChangeHire,
}) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: playerComplete, status: playerCompleteStatus } = useMutation(
    playerCompleteRequest,
    {
      onSuccess: (data) => {
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const enable = useMemo((): boolean => {
    let playerId = hire?.player;
    if (playerId && typeof playerId !== "string") {
      playerId = (hire?.player as TUser).id;
    }
    if (
      hire &&
      playerId === userInfo?.id &&
      hire.hireStep === HireStepsEnum.PLAYER_ACCEPTED
    ) {
      return true;
    } else {
      return false;
    }
  }, [hire]);

  const onPlayerComplate = () => {
    if (playerCompleteStatus === "loading" || !hire?.id) {
      return;
    }
    playerComplete({ id: hire.id });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={playerCompleteStatus === "loading"}
        onClick={onPlayerComplate}
      >
        Complete
      </Button>
    </>
  ) : (
    <></>
  );
};

export default ActionPlayerOnProcess;
