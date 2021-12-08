import { Col, Row } from "antd";
import { FC, useMemo } from "react";
import styles from "./index.module.scss";
import Select, { Option } from "components/Select";
import PlayerCard from "components/PlayerCard";
import { useAppSelector } from "hooks/useRedux";
import clsx from "clsx";

const VipPlayers: FC = () => {
  const types: Option[] = useMemo(() => {
    return [
      { text: "Vip", value: "vip" },
      { text: "Hot", value: "hot" },
      { text: "New", value: "new" },
    ];
  }, []);

  const { theme } = useAppSelector((state) => state.system);

  return (
    <div className={styles.wrapper}>
      <Row>
        <Col flex={"auto"}>
          <div
            className={clsx(
              theme === "DARK" ? styles.titleWhite : styles.titleBlack,
              "h5"
            )}
          >
            Vip Players
          </div>
        </Col>
        <Col flex={"none"}>
          <Select
            className={styles.filter}
            items={types}
            defaultValue={"vip"}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        {[...Array(10).keys()].map((num: number) => (
          <Col key={num} xs={12} lg={8} xxl={6}>
            <PlayerCard />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VipPlayers;
