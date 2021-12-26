import CardPlayer from "components/CardPlayer";
import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { getPlayersRequest } from "api/players/request";
import { TUser, TPlayerType } from "types";

const LIMIT: number = 8;

export const playerState: string = "playerProfile_player";

const Home: FC = () => {
  const typesRef = useRef<HTMLSelectElement>(null);
  const [players, setPlayers] = useState<TUser[]>([]);

  const { mutate: fetch } = useMutation(getPlayersRequest, {
    onSuccess: (data) => {
      setPlayers([...data.data.results]);
    },
  });

  const onChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    let type = undefined;
    if (typesRef.current?.value) {
      type = parseInt(typesRef.current.value) as TPlayerType;
    }
    fetch({
      ...(type && { typePlayer: type }),
      page: 1,
      limit: LIMIT,
    });
  };

  useEffect(() => {
    fetch({
      limit: LIMIT,
      page: 1,
    });
  }, []);

  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="page__center">
            <div className="collection">
              <div className="collection__head">
                <div className="collection__title h5">Vip Players</div>
                <div className="collection__field field">
                  <div className="field__wrap">
                    <select
                      className="field__select"
                      ref={typesRef}
                      onChange={onChange}
                    >
                      <option>All</option>
                      <option value="1">Vip</option>
                      <option value="2">Hot</option>
                      <option value="3">New</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="collection__list">
                {players.map((player: TUser) => (
                  <CardPlayer player={player} key={player.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
