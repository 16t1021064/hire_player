import { FC, useEffect, useState } from "react";
import { Image } from "antd";
import styles from "./index.module.sass";
import clsx from "clsx";
import { CheckCircleTwoTone } from "@ant-design/icons";

interface ImageItemProps {
  src: string;
  enableSelect?: boolean;
  selected?: boolean;
  onChange?: (isSelected: boolean) => void;
}

const ImageItem: FC<ImageItemProps> = ({
  src,
  enableSelect = false,
  selected = false,
  onChange,
}) => {
  const onClick = () => {
    if (onChange) onChange(!selected);
  };

  return (
    <div className={styles.wrap}>
      <Image width={200} height={200} src={src} />
      {enableSelect && (
        <div
          className={clsx(styles.selector, selected && styles.selected)}
          onClick={onClick}
        >
          <CheckCircleTwoTone
            className={clsx(
              styles.icon,
              selected ? styles.visible : styles.hidden
            )}
            twoToneColor="#52c41a"
          />
        </div>
      )}
    </div>
  );
};

export interface TPhoto {
  src: string;
  name: string;
}

export interface TPhotoData extends TPhoto {
  selected: boolean;
}

interface TGalleryProps {
  photos: TPhoto[];
  enableSelect?: boolean;
  onChangeData?: (items: TPhotoData[]) => void;
}

const Gallery: FC<TGalleryProps> = ({
  photos,
  enableSelect = false,
  onChangeData,
}) => {
  const [items, setItems] = useState<TPhotoData[]>([]);

  useEffect(() => {
    setItems(
      photos.map(
        (photo): TPhotoData => ({
          ...photo,
          selected: false,
        })
      )
    );
  }, [photos, enableSelect]);

  const onChange = (pos: number, isSelected: boolean) => {
    const newItems = [...items];
    newItems[pos].selected = isSelected;
    setItems(newItems);
  };

  useEffect(() => {
    if (onChangeData) onChangeData(items);
  }, [items]);

  return (
    <div>
      <Image.PreviewGroup>
        {items.map((item, pos: number) => (
          <ImageItem
            key={pos}
            src={item.src}
            enableSelect={enableSelect}
            selected={item.selected}
            onChange={(isSelected) => {
              onChange(pos, isSelected);
            }}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default Gallery;
