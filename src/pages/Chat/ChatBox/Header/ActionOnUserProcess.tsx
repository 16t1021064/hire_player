import { Button } from "antd";
import { userComplainRequest, userFinishRequest } from "api/hires/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, THire, TUser } from "types";
import styles from "./styles.module.sass";

interface ActionOnUserProcessProps {
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const ActionOnUserProcess: FC<ActionOnUserProcessProps> = ({
  hire,
  onChangeHire,
}) => {
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

  const { mutate: userComplain, status: userComplainLoading } = useMutation(
    userComplainRequest,
    {
      onSuccess: (data) => {
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const enable = useMemo((): boolean => {
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

  const onUserComplain = () => {
    if (userComplainLoading === "loading" || !hire?.id) {
      return;
    }
    // userComplain({ id: hire.id });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={userFinishLoading === "loading"}
        onClick={onUserFinish}
      >
        Finish
      </Button>
      <Button
        className={styles.button}
        type="primary"
        loading={userComplainLoading === "loading"}
        onClick={onUserComplain}
      >
        Complain
      </Button>
    </>
  ) : (
    <></>
  );
};

export default ActionOnUserProcess;
