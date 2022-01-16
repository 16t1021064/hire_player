import PlayerCard from "components/PlayerCard";
import { FC } from "react";

const Following: FC = () => {
  return (
    <div className="page__center">
      <div className="collection">
        <div className="collection__head">
          <div className="collection__title h5">From Player You Follow</div>
        </div>
        <div className="collection__list">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      </div>
    </div>
  );
};

export default Following;
