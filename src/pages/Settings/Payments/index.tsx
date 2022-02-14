import { FC } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";
import Button from "components/Button";
import IonIcon from "@reacticons/ionicons";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const Payments: FC = () => {
  return (
    <SettingsLayout>
      <div className="setting__title h5">Payment cards</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>BRAND</th>
                <th>LAST 4 DIGITS</th>
                <th>EXPIRY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{}</td>
                <td>19/11/2021</td>
                <td>BLOCK USER</td>
                <td>
                  <Button type="gray" size="small" square>
                    <IonIcon
                      className="icon icon-trash-outline"
                      name="trash-outline"
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <Elements stripe={stripePromise}>
        <CardForm />
      </Elements> */}
    </SettingsLayout>
  );
};

export default Payments;
