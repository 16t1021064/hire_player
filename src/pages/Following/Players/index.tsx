import { Col, Row } from "antd";
import { FC } from "react";
import styles from "./index.module.scss";
import PlayerCard from "components/PlayerCard";
import SimplePanel from "components/SimplePanel";

const Players: FC = () => {
  return (
    <SimplePanel className={styles.wrapper} title={"Vip Players"}>
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

export default Players;
