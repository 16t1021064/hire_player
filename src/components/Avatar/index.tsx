import clsx from "clsx";
import { FC } from "react";
import styles from "./index.module.scss";
import DefaultImage from "assets/images/default-avatar.jpg";

interface AvatarProps {
  className?: string;
  src?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
  hasBorder?: boolean;
  hasOutline?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  className,
  src = DefaultImage,
  size = "sm",
  online = false,
  hasBorder = true,
  hasOutline = false,
}) => {
  return (
    <div
      className={clsx(
        styles.ava,
        styles[size],
        online ? styles.online : undefined,
        !hasBorder ? styles.noBorder : undefined,
        hasOutline ? styles.outline : undefined,
        className
      )}
    >
      <img className={styles.pic} src={src} alt={""} />
    </div>
  );
};

export default Avatar;
