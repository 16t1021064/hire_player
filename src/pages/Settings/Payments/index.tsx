import { FC } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const Payments: FC = () => {
  return (
    <SettingsLayout>
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
    </SettingsLayout>
  );
};

export default Payments;
