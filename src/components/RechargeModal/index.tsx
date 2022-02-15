import {
  getPaymentSettingRequest,
  rechargeByCreditCardRequest,
} from "api/payments/requests";
import Button from "components/Button";
import CreateCreditCardModal from "components/CreateCreditCardModal";
import Modal from "components/Modal";
import { useAppSelector } from "hooks/useRedux";
import {
  FC,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import { TPaymentCard, TPaymentSetting } from "types";
import { notifySuccess } from "utils/notify";

type TMethod = "1" | "2" | "3";
enum methodsEnum {
  PAYPAL = "1",
  CREDIT_CARD = "2",
  RAZORPAY = "3",
}

interface RechargeModalProps {
  visible: boolean;
  onClose: () => void;
}

const RechargeModal: FC<RechargeModalProps> = ({ visible, onClose }) => {
  const [method, setMethod] = useState<TMethod>(methodsEnum.PAYPAL);
  const methodRef = useRef<HTMLSelectElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const { isLogin } = useAppSelector((state) => state.auth);
  const [vsibleAddCreditCard, setVisibleAddCreditCard] =
    useState<boolean>(false);
  const amountRechargeRef = useRef<number>(0);
  const [recharging, setRecharging] = useState<boolean>(false);

  const {
    mutateAsync: getPaymentSettingAsync,
    status: getPaymentSettingStatus,
  } = useMutation(getPaymentSettingRequest);

  useEffect(() => {
    if (methodRef.current) {
      methodRef.current.value = method;
    }
    if (amountRef.current) {
      amountRef.current.value = "0";
    }
  }, []);

  const onChangeMethod = () => {
    if (!methodRef.current) {
      return;
    }
    let value = methodRef.current.value;
    setMethod(value as TMethod);
  };

  const fnClose = () => {
    if (methodRef.current?.value) {
      methodRef.current.value = methodsEnum.PAYPAL;
      setMethod(methodsEnum.PAYPAL);
    }
    if (amountRef.current?.value) {
      amountRef.current.value = "0";
    }
    onClose();
  };

  const { mutate: rechargeByCreditCard, status: rechargeByCreditCardStatus } =
    useMutation(rechargeByCreditCardRequest, {
      onSuccess: () => {
        notifySuccess("Recharge success");
      },
      onSettled: () => {
        setRecharging(false);
      },
    });

  const loading = useMemo(() => {
    return (
      getPaymentSettingStatus === "loading" ||
      recharging ||
      rechargeByCreditCardStatus === "loading"
    );
  }, [getPaymentSettingStatus, recharging, rechargeByCreditCardStatus]);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const method = methodRef.current?.value;
    const amountValue = amountRef.current?.value;
    const amount = parseFloat(amountValue || "0");
    if (!method || amount < 0 || loading) {
      return;
    }
    if (method === methodsEnum.CREDIT_CARD) {
      beforeRechargeCreditCard(amount);
    }
  };

  const rechargeCreditCard = (amount: number, paymentCard: TPaymentCard) => {
    if (paymentCard.paymentMethodId) {
      setRecharging(true);
      rechargeByCreditCard({
        amount: amount,
        paymentMethodId: paymentCard.paymentMethodId,
      });
    }
  };

  const beforeRechargeCreditCard = async (amount: number) => {
    const data = await getPaymentSettingAsync();
    if (data.data?.creditCardConfig?.paymentMethods?.[0]) {
      rechargeCreditCard(amount, data.data.creditCardConfig.paymentMethods[0]);
    } else {
      amountRechargeRef.current = amount;
      setVisibleAddCreditCard(true);
    }
  };

  const onCloseCreateCreditCardModal = (paymentSetting?: TPaymentSetting) => {
    setVisibleAddCreditCard(false);
    if (
      paymentSetting?.creditCardConfig?.paymentMethods?.[0] &&
      amountRechargeRef.current
    ) {
      rechargeCreditCard(
        amountRechargeRef.current,
        paymentSetting.creditCardConfig.paymentMethods[0]
      );
    }
  };

  return isLogin ? (
    <>
      <Modal visible={visible} title={"Recharge"} onCancel={fnClose}>
        <form onSubmit={onSubmit}>
          <div className="popup__fieldset">
            <div className="popup__field field">
              <div className="field__label">Withdraw Method</div>
              <div className="field__wrap">
                <select
                  className="field__select"
                  ref={methodRef}
                  onChange={onChangeMethod}
                >
                  <option value={methodsEnum.PAYPAL}>PayPal</option>
                  <option value={methodsEnum.CREDIT_CARD}>Credit card</option>
                  <option value={methodsEnum.RAZORPAY}>Razorpay</option>
                </select>
              </div>
            </div>
          </div>
          <div className="popup__fieldset">
            <div className="popup__field field">
              <div className="field__label">Amount</div>
              <div className="field__wrap">
                <input
                  className="field__input"
                  type="number"
                  ref={amountRef}
                  min={0}
                  step={0.01}
                />
              </div>
            </div>
          </div>
          <Button
            htmlType="submit"
            className="popup__btn"
            type="primary"
            loading={loading}
          >
            Recharge now
          </Button>
        </form>
      </Modal>
      <CreateCreditCardModal
        visible={vsibleAddCreditCard}
        onClose={onCloseCreateCreditCardModal}
      />
    </>
  ) : (
    <></>
  );
};

export default RechargeModal;
