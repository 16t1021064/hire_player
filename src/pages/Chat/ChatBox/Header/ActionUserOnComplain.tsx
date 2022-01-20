import { Button } from "antd";
import { userFinishRequest } from "api/hires/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, THire, TUser } from "types";
import styles from "./styles.module.sass";

interface ActionUserOnComplainProps {
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const ActionUserOnComplain: FC<ActionUserOnComplainProps> = ({
  hire,
  onChangeHire,
}) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: userFinish, status: userFinishStatus } = useMutation(
    userFinishRequest,
    {
      onSuccess: (data) => {
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const enable = useMemo((): boolean => {
    let userId = hire?.customer;
    if (userId && typeof userId !== "string") {
      userId = (hire?.customer as TUser).id;
    }
    if (
      hire &&
      userId === userInfo?.id &&
      hire.hireStep === HireStepsEnum.COMPLAIN
    ) {
      return true;
    } else {
      return false;
    }
  }, [hire]);

  const onUserFinish = () => {
    if (userFinishStatus === "loading" || !hire?.id) {
      return;
    }
    userFinish({ id: hire.id });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={userFinishStatus === "loading"}
        onClick={onUserFinish}
      >
        Finish
      </Button>
    </>
  ) : (
    <></>
  );
};

export default ActionUserOnComplain;
