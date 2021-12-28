import CardPlayer from "components/CardPlayer";
import { FC } from "react";

const Following: FC = () => {
  return (
    <div className="page__center">
      <div className="collection">
        <div className="collection__head">
          <div className="collection__title h5">From Player You Follow</div>
        </div>
        <div className="collection__list">
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
        </div>
      </div>
    </div>
  );
};

export default Following;
