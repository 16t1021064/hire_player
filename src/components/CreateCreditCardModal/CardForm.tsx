import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  PaymentMethod,
  StripeCardNumberElement,
  StripeElementStyleVariant,
} from "@stripe/stripe-js";
import { Spin } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import { FC, SyntheticEvent, useRef, useState } from "react";
import { notifyDanger } from "utils/notify";
import styles from "./CardForm.module.less";

const baseStyle: StripeElementStyleVariant = {
  color: "#11142D",
  fontWeight: "600",
  fontSize: "14px",
};

interface CardFormProps {
  onSuccess: (card: PaymentMethod) => void;
}

const CardForm: FC<CardFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    if (!elements || !stripe) return;
    const number = elements.getElement(
      CardNumberElement
    ) as StripeCardNumberElement;

    setLoading(true);
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: number,
    });
    setLoading(false);
    if (paymentMethod) {
      onSuccess(paymentMethod);
    } else {
      notifyDanger("Invalid credit card");
    }
  };

  return (
    <Spin spinning={loading}>
      <form className="setting__form" onSubmit={onSubmit}>
        <div className="setting__title h5">Setting Payments</div>
        <div className="setting__fieldset">
          <div className="field__label">Card Number</div>
          <div className="field__wrap">
            <div
              className={clsx("field__input", styles.input)}
              ref={cardNumberRef}
            >
              <CardNumberElement
                options={{
                  style: {
                    base: baseStyle,
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="setting__fieldset">
          <div className="setting__row">
            <div className="setting__field field">
              <div className="field__label">Card Expire</div>
              <div className="field__wrap">
                <div className={clsx("field__input", styles.input)}>
                  <CardExpiryElement
                    options={{
                      style: {
                        base: baseStyle,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="setting__field field">
              <div className="field__label">Card Number</div>
              <div className="field__wrap">
                <div className={clsx("field__input", styles.input)}>
                  <CardCvcElement
                    options={{
                      style: {
                        base: baseStyle,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button type="primary" htmlType="submit" className="popup__btn">
          Update
        </Button>
      </form>
    </Spin>
  );
};

export default CardForm;
