import { FC, useEffect, useState } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";
import IonIcon from "@reacticons/ionicons";
import { TPaymentCard, TPaymentSetting } from "types";
import { getPaymentSettingRequest } from "api/payments/requests";
import { useMutation } from "react-query";
import styles from "./index.module.less";
import { Col, Row, Spin } from "antd";
import CreateCreditCardModal from "components/CreateCreditCardModal";

const Payments: FC = () => {
  const [cards, setCards] = useState<TPaymentCard[]>([]);
  const [visibleAddCard, setVisibleAddCard] = useState<boolean>(false);

  const { mutate: getPaymentSetting, status: getPaymentSettingStatus } =
    useMutation(getPaymentSettingRequest, {
      onSuccess: (data) => {
        if (data.data && data.data.creditCardConfig?.paymentMethods) {
          setCards(data.data.creditCardConfig.paymentMethods);
        }
      },
    });

  useEffect(() => {
    getPaymentSetting();
  }, []);

  const onAddCard = () => {
    setVisibleAddCard(true);
  };

  const onCloseAddCard = (paymentSetting?: TPaymentSetting) => {
    setVisibleAddCard(false);
    if (paymentSetting?.creditCardConfig?.paymentMethods) {
      setCards(paymentSetting.creditCardConfig.paymentMethods);
    }
  };

  return (
    <SettingsLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <div className="setting__title h5">Payment cards</div>
        </Col>
        <Col xs={24} lg={6} className={styles.right}>
          <Button type="primary" size="small" square onClick={onAddCard}>
            <IonIcon className="icon icon-add-outline" name="add-outline" />
          </Button>
        </Col>
      </Row>
      <div className="settings_row">
        <Spin spinning={getPaymentSettingStatus === "loading"}>
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
                {cards.map((c, i) => (
                  <tr key={i}>
                    <td className={styles.brand}>{c.card.brand}</td>
                    <td>{c.card.last4}</td>
                    <td>{`${c.card.expMonth}/${c.card.expYear}`}</td>
                    <td>
                      <Button type="primary" size="small" square>
                        <IonIcon
                          className="icon icon-trash-outline"
                          name="trash-outline"
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
                {cards.length === 0 && (
                  <tr>
                    <td colSpan={4}>You have not set up a credit card</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
      <CreateCreditCardModal
        visible={visibleAddCard}
        onClose={onCloseAddCard}
      />
    </SettingsLayout>
  );
};

export default Payments;
