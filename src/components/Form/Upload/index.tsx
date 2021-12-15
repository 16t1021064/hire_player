import { FC } from "react";
import styles from "./index.module.scss";
import { Upload as AntdUpload, UploadProps as AntdUploadProps } from "antd";

interface UploadProps extends AntdUploadProps {}

const Upload: FC<UploadProps> = ({ children, ...props }) => {
  return (
    <AntdUpload {...props}>
      <div className={styles.wrap}>{children}</div>
    </AntdUpload>
  );
};

export default Upload;
