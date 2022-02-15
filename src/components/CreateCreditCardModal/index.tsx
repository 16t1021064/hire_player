import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, PaymentMethod } from "@stripe/stripe-js";
import { Spin } from "antd";
import { updatePaymentMethodRequest } from "api/payments/requests";
import Modal from "components/Modal";
import { useAppSelector } from "hooks/useRedux";
import { FC } from "react";
import { useMutation } from "react-query";
import { TPaymentSetting } from "types";
import { notifySuccess } from "utils/notify";
import CardForm from "./CardForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

interface CreateCreditCardModalProps {
  visible: boolean;
  onClose: (isSuccess?: TPaymentSetting) => void;
}

const CreateCreditCardModal: FC<CreateCreditCardModalProps> = ({
  visible,
  onClose,
}) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  const { mutate: updatePaymentMethod, status: updatePaymentMethodStatus } =
    useMutation(updatePaymentMethodRequest, {
      onSuccess: (data) => {
        notifySuccess("Credit card has been updated successfully");
        onClose(data.data);
      },
    });

  const onSuccess = (pm: PaymentMethod) => {
    updatePaymentMethod({
      paymentMethodId: pm.id,
    });
  };

  return isLogin ? (
    <Modal
      visible={visible}
      title={"Add credit card"}
      onCancel={() => {
        onClose();
      }}
    >
      <Spin spinning={updatePaymentMethodStatus === "loading"}>
        <Elements stripe={stripePromise}>
          <CardForm onSuccess={onSuccess} />
        </Elements>
      </Spin>
    </Modal>
  ) : (
    <></>
  );
};

export default CreateCreditCardModal;
