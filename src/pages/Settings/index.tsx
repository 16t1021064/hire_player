import { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useLocation, useHistory } from "react-router";
import SideBar, { settingKeys } from "./SideBar";
import UserInfo from "./User/UserInfo";
import HiredList from "./User/HiredList";
import DonatedList from "./User/DonatedList";
import BalanceTransactions from "./User/BalanceTransactions";
import PlayerInfo from "./Player/PlayerInfo";
import Payment from "./Payment";
import Balance from "./Balance";
import UserBlocks from "./Security/UserBlocks";
import Password from "./Security/Password";
import ReceivedDonate from "./Player/ReceivedDonate";
import ReceivedHire from "./Player/ReceivedHire";
import Albums from "./Player/Albums";
import HireSetting from "./Player/HireSetting";

const Settings: FC = () => {
  const location = useLocation();
  const history = useHistory();

  const [activeKey, setActiveKey] = useState<string>(settingKeys.user.info);

  useEffect(() => {
    if (location?.state && (location.state as any).settingKey) {
      const value = (location.state as any).settingKey;
      if (typeof value === "string") {
        setActiveKey(value);
      }
      history.replace({ ...location, state: undefined });
    }
  }, [location]);

  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <SideBar activeKey={activeKey} onChangeKey={setActiveKey} />
      </div>
      <div className={styles.content}>
        {(activeKey === settingKeys.user.index ||
          activeKey === settingKeys.user.info) && <UserInfo />}
        {activeKey === settingKeys.user.hired && <HiredList />}
        {activeKey === settingKeys.user.donated && <DonatedList />}
        {activeKey === settingKeys.user.balance && <BalanceTransactions />}

        {(activeKey === settingKeys.player.index ||
          activeKey === settingKeys.player.info) && <PlayerInfo />}
        {activeKey === settingKeys.player.hire_setting && <HireSetting />}
        {activeKey === settingKeys.player.albumns && <Albums />}
        {activeKey === settingKeys.player.received_hire && <ReceivedHire />}
        {activeKey === settingKeys.player.received_donate && <ReceivedDonate />}

        {activeKey === settingKeys.payment.index && <Payment />}

        {activeKey === settingKeys.balance.index && <Balance />}

        {(activeKey === settingKeys.security.index ||
          activeKey === settingKeys.security.blocks) && <UserBlocks />}
        {activeKey === settingKeys.security.password && <Password />}
      </div>
    </div>
  );
};

export default Settings;
