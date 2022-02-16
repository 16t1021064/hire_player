import { Result } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import { routesEnum } from "pages/Routes";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.less";

const Cancel: FC = () => {
  const history = useHistory();

  const redirect = () => {
    history.push(routesEnum.settings_balance);
  };

  return (
    <div className="login">
      <div className={clsx("login__container", styles.wrap)}>
        <div>
          <Result
            status="warning"
            title="There are some problems with your recharges."
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

export default Cancel;
