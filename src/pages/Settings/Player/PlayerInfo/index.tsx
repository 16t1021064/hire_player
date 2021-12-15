import { Col, Row } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import Form from "components/Form";
import FormItem from "components/Form/FormItem";
import Input from "components/Form/Input";
import Label from "components/Form/Label";
import TextArea from "components/Form/TextArea";
import { FC } from "react";
import styles from "./index.module.scss";

const PlayerInfo: FC = () => {
  return (
    <Form>
      <div className={clsx(styles.title, "h5")}>Player Info</div>
      <div className={styles.fieldset}>
        <Row gutter={[15, 15]}>
          <Col md={8}>
            <Label>GAME NAME</Label>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
          <Col md={8}>
            <Label>TITLE OR RANK</Label>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
          <Col md={8}>
            <Label>COST PER HOUR</Label>
            <FormItem>
              <Input />
            </FormItem>
          </Col>
          <Col md={24}>
            <Label>FULL DETAIL OF YOU</Label>
            <FormItem>
              <TextArea rows={4} />
            </FormItem>
          </Col>
        </Row>
      </div>
      <Button type={"primary"}>Update</Button>
    </Form>
  );
};

export default PlayerInfo;
