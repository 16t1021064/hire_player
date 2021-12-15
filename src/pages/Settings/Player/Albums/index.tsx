import clsx from "clsx";
import Upload from "components/Form/Upload";
import Gallery, { TPhoto } from "components/Gallery";
import { FC } from "react";
import styles from "./index.module.scss";

const photos: TPhoto[] = [
  {
    key: "1",
    src: "https://source.unsplash.com/BhcutpohYwg/800x800",
    width: 1,
    height: 1,
  },
  {
    key: "2",
    src: "https://source.unsplash.com/j5KAuRrYX7g/800x800",
    width: 1,
    height: 1,
  },
  {
    key: "3",
    src: "https://source.unsplash.com/pQyIutdScOY/800x800",
    width: 1,
    height: 1,
  },
  {
    key: "4",
    src: "https://source.unsplash.com/55JRsxcAiWE/800x800",
    width: 1,
    height: 1,
  },
  {
    key: "5",
    src: "https://source.unsplash.com/BhcutpohYwg/800x800",
    width: 1,
    height: 1,
  },
  {
    key: "6",
    src: "https://source.unsplash.com/j5KAuRrYX7g/800x800",
    width: 1,
    height: 1,
  },
];

const Albums: FC = () => {
  return (
    <div>
      <div className={clsx(styles.title, "h5")}>Albums Player</div>
      <div className={styles.bottom}>
        <Upload>Upload images</Upload>
      </div>
      <div>
        <Gallery photos={photos} />
      </div>
    </div>
  );
};

export default Albums;
