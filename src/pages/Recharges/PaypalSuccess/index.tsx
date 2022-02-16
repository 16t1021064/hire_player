import { Result } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import { routesEnum } from "pages/Routes";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.less";

const PaypalSuccess: FC = () => {
  const history = useHistory();

  const redirect = () => {
    history.push(routesEnum.settings_balance);
  };

  return (
    <div className="login">
      <div className={clsx("login__container", styles.wrap)}>
        <div>
          <Result
            status="success"
            title="Recharges success"
            subTitle="You have recharged by paypal successfully, coins added to your wallet. Thanks for your recharge !"
            extra={[
              <Button type="primary" key="console" onClick={redirect}>
                Go to transaction pages
              </Button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PaypalSuccess;
