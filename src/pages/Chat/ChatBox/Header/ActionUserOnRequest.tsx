import { Button, message } from "antd";
import { userCancelRequest } from "api/hires/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, THire, TUser } from "types";
import styles from "./styles.module.sass";

interface ActionUserOnRequestProps {
  hire?: THire;
  onChangeHire?: (hire: THire) => void;
}

const ActionUserOnRequest: FC<ActionUserOnRequestProps> = ({
  hire,
  onChangeHire,
}) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: cancel, status: cancelStatus } = useMutation(
    userCancelRequest,
    {
      onSuccess: (data) => {
        message.success("You have canceled hire");
        if (onChangeHire) {
          onChangeHire(data.data);
        }
      },
    }
  );

  const enable = useMemo((): boolean => {
    let hireCustomerId = hire?.customer;
    if (hireCustomerId && typeof hireCustomerId !== "string") {
      hireCustomerId = (hire?.customer as TUser).id;
    }
    if (
      hire &&
      hireCustomerId === userInfo?.id &&
      hire.hireStep === HireStepsEnum.USER_CREATED
    ) {
      return true;
    } else {
      return false;
    }
  }, [hire]);

  const disabled = useMemo((): boolean => {
    return cancelStatus === "loading";
  }, [cancelStatus]);

  const onCancel = () => {
    if (!hire?.id) return;
    cancel({ id: hire?.id });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={cancelStatus === "loading"}
        onClick={onCancel}
        disabled={disabled}
      >
        Cancel
      </Button>
    </>
  ) : (
    <></>
  );
};

export default ActionUserOnRequest;
