import { Col, Row } from "antd";
import clsx from "clsx";
import Avatar from "components/Avatar";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import Input from "components/Form/Input";
import Label from "components/Form/Label";
import Select from "components/Form/Select";
import Upload from "components/Form/Upload";
import { FC } from "react";
import styles from "./index.module.scss";

const UserInfo: FC = () => {
  return (
    <Form>
      <div className={clsx(styles.title, "h5")}>User Info</div>
      <div className={styles.user}>
        <div className={styles.category}>Your Avatar</div>
        <div className={styles.line}>
          <div>
            <Avatar size={"lg"} />
          </div>
          <div className={styles.details}>
            <div className={styles.btns}>
              <Upload>Change</Upload>
            </div>
            <div className={styles.text}>JPG, GIF OR PNG, 5 MB</div>
          </div>
        </div>
      </div>
      <div className={styles.fieldset}>
        <Row gutter={[15, 15]}>
          <Col sm={12}>
            <Label>Full Name</Label>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
          <Col sm={12}>
            <Label>Nickname</Label>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
          <Col sm={12}>
            <Label>Gender</Label>
            <FormItem>
              <Select
                items={[
                  { text: "Male", value: "male" },
                  { text: "Female", value: "female" },
                ]}
              />
            </FormItem>
          </Col>
        </Row>
      </div>
      <Button type={"primary"}>Update</Button>
    </Form>
  );
};

export default UserInfo;
