import { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import { Layout as AntdLayout } from "antd";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { ConfigProvider as AntdConfigProvider } from "antd";
import { TFunction, useTranslation } from "react-i18next";

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
        <NavBar />
        <main className={styles.wrapper}>
          <div className={styles.page}>{children}</div>
        </main>
        <Footer />
      </AntdLayout>
    </AntdConfigProvider>
  );
};
