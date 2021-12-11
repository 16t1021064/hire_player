import Gallery, { TPhoto } from "components/Gallery";
import { FC } from "react";
import styles from "./index.module.scss";

const Infomation: FC = () => {
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

  return (
    <div className={styles.content}>
      <p>I can play LOL, CSGO, F04, Confidentiality, Support consulting</p>
      <div>
        <Gallery photos={photos} />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        molestias minus repudiandae. Eum voluptate in perspiciatis nesciunt
        facere hic nemo deleniti ipsam rerum, nobis mollitia est atque placeat
        autem dolor.
      </p>
    </div>
  );
};

export default Infomation;
