import Gallery, { TPhoto } from "components/Gallery";
import { FC, useMemo } from "react";
import { TPlayer } from "types";
import styles from "./index.module.scss";

interface InfomationProps {
  player: TPlayer;
}

const Infomation: FC<InfomationProps> = ({ player }) => {
  const photos: TPhoto[] = useMemo(() => {
    return (
      player?.images?.map((image, pos: number) => ({
        key: `${pos}`,
        src: image.link,
        width: 1,
        height: 1,
      })) || []
    );
  }, [player]);

  return (
    <div className={styles.content}>
      <p>{player?.gameName}</p>
      <div>
        <Gallery photos={photos} />
      </div>
      <p>{player?.description}</p>
    </div>
  );
};

export default Infomation;
