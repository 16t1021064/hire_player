import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  StripeCardNumberElement,
  StripeElementStyleVariant,
} from "@stripe/stripe-js";
import clsx from "clsx";
import Button from "components/Button";
import { FC, SyntheticEvent, useRef } from "react";
import styles from "./CardForm.module.less";

const baseStyle: StripeElementStyleVariant = {
  color: "#11142D",
  fontWeight: "600",
  fontSize: "14px",
};

const CardForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cardNumberRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!elements || !stripe) return;
    const number = elements.getElement(
      CardNumberElement
    ) as StripeCardNumberElement;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: number,
    });
    console.log(error, paymentMethod);
  };

  return (
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
  );
};

export default CardForm;
