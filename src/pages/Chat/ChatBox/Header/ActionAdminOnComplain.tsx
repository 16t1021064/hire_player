import { Button } from "antd";
import { adminLeaveRequest } from "api/conversations/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, useMemo } from "react";
import { useMutation } from "react-query";
import { HireStepsEnum, TConvertedConversation, THire } from "types";
import { isAdmin } from "utils/auth";
import styles from "./styles.module.sass";

interface ActionAdminOnComplainProps {
  conv: TConvertedConversation;
  hire: THire;
  onChangeConv: (conv: TConvertedConversation | undefined) => void;
}

const ActionAdminOnComplain: FC<ActionAdminOnComplainProps> = ({
  conv,
  hire,
  onChangeConv,
}) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: adminLeave, status: adminLeaveStatus } = useMutation(
    adminLeaveRequest,
    {
      onSuccess: () => {
        onChangeConv(undefined);
      },
    }
  );

  const enable = useMemo((): boolean => {
    if (
      hire &&
      conv &&
      userInfo &&
      isAdmin(userInfo) &&
      hire.hireStep === HireStepsEnum.USER_COMPLAIN
    ) {
      return true;
    } else {
      return false;
    }
  }, [conv]);

  const onAdminLeave = () => {
    if (adminLeaveStatus === "loading" || !hire?.id) {
      return;
    }
    adminLeave({ conversationId: conv.id });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={adminLeaveStatus === "loading"}
        onClick={onAdminLeave}
      >
        Leave
      </Button>
    </>
  ) : (
    <></>
  );
};

export default ActionAdminOnComplain;
