import { FC, useMemo } from "react";
import styles from "./index.module.scss";
import { Layout as AntdLayout } from "antd";
import { ConfigProvider as AntdConfigProvider } from "antd";
import { TFunction, useTranslation } from "react-i18next";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const getValidateMessages = (t: TFunction<"translation">) => ({
  required: `* \${label} ${t("form.validate.required")}`,
  whitespace: "${name} cannot be empty 123",
});

export const Layout: FC = ({ children }) => {
  const { t } = useTranslation();
  const validateMessages = useMemo(() => getValidateMessages(t), [t]);

  return (
    <AntdConfigProvider
      form={{
        validateMessages,
      }}
    >
      <AntdLayout className={styles.root}>
        <SideBar />
        <main className={styles.wrapper}>
          <TopBar />
          <div className={styles.page}>{children}</div>
        </main>
      </AntdLayout>
    </AntdConfigProvider>
  );
};
