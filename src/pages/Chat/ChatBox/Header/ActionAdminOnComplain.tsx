import { Button } from "antd";
import { adminLeaveRequest } from "api/conversations/request";
import { adminRefundRequest } from "api/hires/request";
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
  onChangeHire?: (hire: THire) => void;
}

const ActionAdminOnComplain: FC<ActionAdminOnComplainProps> = ({
  conv,
  hire,
  onChangeConv,
  onChangeHire,
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

  const { mutate: adminRefund, status: adminRefundStatus } = useMutation(
    adminRefundRequest,
    {
      onSuccess: (data) => {
        if (onChangeHire) {
          onChangeHire(data.data);
        }
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
    if (
      adminLeaveStatus === "loading" ||
      adminRefundStatus === "loading" ||
      !hire?.id
    ) {
      return;
    }
    adminLeave({ conversationId: conv.id });
  };

  const onAdminRefund = () => {
    if (
      adminLeaveStatus === "loading" ||
      adminRefundStatus === "loading" ||
      !hire?.id
    ) {
      return;
    }
    adminRefund({
      id: hire.id,
    });
  };

  return enable ? (
    <>
      <Button
        className={styles.button}
        type="primary"
        loading={adminRefundStatus === "loading"}
        onClick={onAdminRefund}
      >
        Refund
      </Button>
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
