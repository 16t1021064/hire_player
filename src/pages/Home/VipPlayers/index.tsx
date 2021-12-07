import { Col, Row } from "antd";
import { FC, useMemo } from "react";
import styles from "./index.module.scss";
import Select, { Option } from "components/Select";
import PlayerCard from "components/PlayerCard";

const VipPlayers: FC = () => {
  const types: Option[] = useMemo(() => {
    return [
      { text: "Vip", value: "vip" },
      { text: "Hot", value: "hot" },
      { text: "New", value: "new" },
    ];
  }, []);

  return (
    <div className={styles.wrapper}>
      <Row>
        <Col flex={"auto"}>
          <div className={"h5"}>Vip Players</div>
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
          <Col key={num} md={6}>
            <PlayerCard />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VipPlayers;
