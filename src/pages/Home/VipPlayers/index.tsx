import { Col, Row } from "antd";
import { FC, useMemo } from "react";
import styles from "./index.module.scss";
import Select, { Option } from "components/Select";
import PlayerCard from "components/PlayerCard";
import SimplePanel from "components/SimplePanel";

const VipPlayers: FC = () => {
  const types: Option[] = useMemo(() => {
    return [
      { text: "Vip", value: "vip" },
      { text: "Hot", value: "hot" },
      { text: "New", value: "new" },
    ];
  }, []);

  const rightContent = (
    <Select className={styles.filter} items={types} defaultValue={"vip"} />
  );

  return (
    <SimplePanel title={"Vip Players"} rightContent={rightContent}>
      <Row gutter={[24, 24]}>
        {[...Array(10).keys()].map((num: number) => (
          <Col key={num} xs={12} lg={8} xxl={6}>
            <PlayerCard />
          </Col>
        ))}
      </Row>
    </SimplePanel>
  );
};

export default VipPlayers;
