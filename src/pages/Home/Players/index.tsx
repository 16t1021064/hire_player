import { Col, Row, Spin } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import Select, { Option } from "components/Form/Select";
import PlayerCard from "components/PlayerCard";
import SimplePanel from "components/SimplePanel";
import { getPlayersRequest } from "api/players/request";
import { useMutation } from "react-query";
import Pagination, { PaginationProps } from "components/Pagination";
import { TPlayerInfo, TPlayerType } from "types";

const playerTypes: Option[] = [
  { text: "Vip", value: 1 },
  { text: "Hot", value: 2 },
  { text: "New", value: 3 },
];

const Players: FC = () => {
  const [pagination, setPagination] = useState<PaginationProps>({
    total: 0,
    current: 1,
    pageSize: 12,
  });
  const [players, setPlayers] = useState<TPlayerInfo[]>([]);
  const [playerType, setPlayerType] = useState<TPlayerType | undefined>(
    undefined
  );

  const { mutate: fetch, status: fetchStatus } = useMutation(
    getPlayersRequest,
    {
      onSuccess: (data) => {
        setPagination({
          ...pagination,
          total: data.data.totalResults,
          pageSize: data.data.limit,
          current: data.data.page,
        });
        setPlayers([...data.data.results]);
      },
    }
  );

  const onChangeType = (newType: number) => {
    const converted: TPlayerType = newType as TPlayerType;
    setPlayerType(converted);
    fetch({
      limit: pagination.pageSize,
      page: 1,
      typePlayer: converted,
    });
  };

  const rightContent = (
    <Select
      className={styles.filter}
      items={playerTypes}
      value={playerType}
      onChange={onChangeType}
    />
  );

  useEffect(() => {
    fetch({
      limit: pagination.pageSize,
      page: 1,
      typePlayer: playerType,
    });
  }, []);

  const onPaginate = (page: number) => {
    fetch({ limit: pagination.pageSize, page: page, typePlayer: playerType });
  };

  const title = useMemo(() => {
    let t = " players";
    const configType = playerTypes.find((ele) => ele.value === playerType);
    if (configType) {
      t = configType.text + t;
    } else {
      t = "all" + t;
    }
    return <span className={styles.title}>{t}</span>;
  }, [playerType]);

  return (
    <SimplePanel title={title} rightContent={rightContent}>
      <Spin spinning={fetchStatus === "loading"}>
        <Row gutter={[24, 24]}>
          {pagination?.total ? (
            <>
              {players.map((player, pos: number) => (
                <Col key={pos} xs={12} lg={8} xxl={6}>
                  <PlayerCard player={player} />
                </Col>
              ))}
              <Col xs={24}>
                <Pagination
                  {...pagination}
                  align={"right"}
                  onChange={onPaginate}
                />
              </Col>
            </>
          ) : (
            <Col xs={24}>
              <p>No players</p>
            </Col>
          )}
        </Row>
      </Spin>
    </SimplePanel>
  );
};

export default Players;
