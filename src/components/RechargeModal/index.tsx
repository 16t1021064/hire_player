import { getPaymentSettingRequest } from "api/payments/requests";
import Button from "components/Button";
import Modal from "components/Modal";
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { TPaymentCard } from "types";

type TMethod = "1" | "2" | "3";
enum methodsEnum {
  PAYPAL = "1",
  CREDIT_CARD = "2",
  RAZORPAY = "3",
}

const fnMutateCardNumner = (card: any) => {
  card = "" + card;
  let c: string = card as string;
  if (c.length > 6) {
    c = c.slice(0, 2) + "****" + c.slice(-4);
  }
  return c;
};

interface RechargeModalProps {
  visible: boolean;
  onClose: () => void;
}

const RechargeModal: FC<RechargeModalProps> = ({ visible, onClose }) => {
  const [method, setMethod] = useState<TMethod>(methodsEnum.PAYPAL);
  const methodRef = useRef<HTMLSelectElement | null>(null);
  const cardRef = useRef<HTMLSelectElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const [cards, setCards] = useState<TPaymentCard[]>([]);
  const [card, setCard] = useState<string>("");

  const { mutate: getPaymentSetting, status: getPaymentSettingStatus } =
    useMutation(getPaymentSettingRequest, {
      onSuccess: (data) => {
        if (data.data.creditCardConfig?.paymentMethods) {
          setCards(data.data.creditCardConfig.paymentMethods);
        }
      },
    });

  useEffect(() => {
    if (methodRef.current) {
      methodRef.current.value = method;
    }
    if (amountRef.current) {
      amountRef.current.value = "0";
    }
    getPaymentSetting();
  }, []);

  const onChangeMethod = () => {
    if (!methodRef.current) {
      return;
    }
    let value = methodRef.current.value;
    setMethod(value as TMethod);
  };

  const onChangeCard = () => {
    if (!cardRef.current) {
      return;
    }
    let value = cardRef.current.value;
    setCard(value);
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

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const method = methodRef.current?.value;
    const amountValue = amountRef.current?.value;
    const amount = parseFloat(amountValue || "0");
    if (method && amount > 0 && getPaymentSettingStatus !== "loading") {
      console.log(method, amount);
    }
  };

  return (
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
        {method === methodsEnum.CREDIT_CARD && (
          <div className="popup__fieldset">
            <div className="popup__field field">
              <div className="field__label">Choose card</div>
              <div className="field__wrap">
                <select
                  className="field__select"
                  ref={cardRef}
                  onChange={onChangeCard}
                >
                  {cards.map((c, i: number) => (
                    <option key={i} value={c.paymentMethodId}>
                      {fnMutateCardNumner(c.card.number)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
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
        <Button htmlType="submit" className="popup__btn" type="primary">
          Recharge now
        </Button>
      </form>
    </Modal>
  );
};

export default RechargeModal;
