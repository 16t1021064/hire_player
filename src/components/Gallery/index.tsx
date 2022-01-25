import { FC } from "react";
import { Image } from "antd";

interface GalleryProps {
  photos: string[];
}

const Gallery: FC<GalleryProps> = ({ photos }) => {
  return (
    <div>
      <Image.PreviewGroup>
        {photos.map((image, index) => (
          <Image key={index} width={200} height={200} src={image} />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default Gallery;
