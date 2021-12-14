import { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useLocation, useHistory } from "react-router";
import SideBar, { settingKeys } from "./SideBar";

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
        {activeKey === settingKeys.user.index && (
          <div>{settingKeys.user.index}</div>
        )}
        {activeKey === settingKeys.user.info && (
          <div>{settingKeys.user.info}</div>
        )}
        {activeKey === settingKeys.user.hired && (
          <div>{settingKeys.user.hired}</div>
        )}
        {activeKey === settingKeys.user.donated && (
          <div>{settingKeys.user.donated}</div>
        )}
        {activeKey === settingKeys.user.balance && (
          <div>{settingKeys.user.balance}</div>
        )}

        {activeKey === settingKeys.player.index && (
          <div>{settingKeys.player.index}</div>
        )}
        {activeKey === settingKeys.player.info && (
          <div>{settingKeys.player.info}</div>
        )}
        {activeKey === settingKeys.player.hire_setting && (
          <div>{settingKeys.player.hire_setting}</div>
        )}
        {activeKey === settingKeys.player.albumns && (
          <div>{settingKeys.player.albumns}</div>
        )}
        {activeKey === settingKeys.player.received_hire && (
          <div>{settingKeys.player.received_hire}</div>
        )}
        {activeKey === settingKeys.player.received_donate && (
          <div>{settingKeys.player.received_donate}</div>
        )}

        {activeKey === settingKeys.payment.index && (
          <div>{settingKeys.payment.index}</div>
        )}

        {activeKey === settingKeys.balance.index && (
          <div>{settingKeys.balance.index}</div>
        )}

        {activeKey === settingKeys.security.index && (
          <div>{settingKeys.security.index}</div>
        )}
        {activeKey === settingKeys.security.blocks && (
          <div>{settingKeys.security.blocks}</div>
        )}
        {activeKey === settingKeys.security.password && (
          <div>{settingKeys.security.password}</div>
        )}
      </div>
    </div>
  );
};

export default Settings;
