import { Col, Row } from "antd";
import clsx from "clsx";
import Button from "components/Button";
import Checkbox from "components/Form/Checkbox";
import FormItem from "components/Form/FormItem";
import Label from "components/Form/Label";
import Select from "components/Form/Select";
import { FC } from "react";
import styles from "./index.module.scss";

const HireSetting: FC = () => {
  return (
    <div>
      <div className={clsx(styles.title, "h5")}>Setting Hire</div>
      <div className={styles.fieldset}>
        <Row gutter={[15, 15]}>
          <Col xs={24}>
            <Row>
              <Col md={12}>
                <div className={styles.line}>
                  <Label>You Want To Receive Hire Rental Request:</Label>
                  <Checkbox size={"lg"}></Checkbox>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row>
              <Col md={12}>
                <Label>Time Frame For Receiving The Hire</Label>
                <div>
                  {[...Array(24).keys()].map((num: number) => (
                    <Checkbox
                      key={num}
                      className={styles.checkbox}
                      value={num + 1}
                      size={"md"}
                    >
                      {num + 1}:00
                    </Checkbox>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row>
              <Col md={12}>
                <Label>Maximum hours can hire in one time:</Label>
                <FormItem>
                  <Select
                    items={[
                      { text: "1 Hour", value: "1" },
                      { text: "2 Hours", value: "2" },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Button type={"primary"}>Update</Button>
    </div>
  );
};

export default HireSetting;
