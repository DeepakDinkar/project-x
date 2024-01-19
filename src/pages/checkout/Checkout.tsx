import {
  Button,
  Checkbox,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Select,
} from "antd";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { BillingIcon } from "../../utils/svgs/BillingIcon";
import styles from "./Checkout.module.scss";

export default function Checkout() {
  const breakPoint = useBreakPoint();

  const items: CollapseProps["items"] = [
    {
      key: "billingInfo",
      label: (
        <Flex className={styles.billingHeader} align="center">
          <BillingIcon />
          Billing Info
        </Flex>
      ),
      children: (
        <div>
          <Form name="billingForm" labelCol={{ span: 3 }}>
            <Form.Item name="addressName" label="Address Name*">
              <Input className={styles.input} placeholder="" />
            </Form.Item>
            <Form.Item label="Address">
              <Form.Item name="address1">
                <Input className={styles.input} placeholder="Street Name" />
              </Form.Item>
              <Form.Item name="address2">
                <Input
                  className={styles.input}
                  placeholder="Apartment, Suite, Unit etc.*"
                />
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Form.Item name="country" label="Country*">
                <Select
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="townCity" label="Town / City*">
                <Select
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="zipCode" label="Zip Code*">
                <Input className={styles.input} placeholder="" />
              </Form.Item>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Abu Dhabi, UAE | Nov 25 - 30, 2023</Checkbox>
            </Form.Item>
            <Button htmlType="submit" className={styles.formSubmitBtn}>
              Save Address
            </Button>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.checkoutWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"2.5rem"}>
          <div className="main-header font-bold font-ubuntu">Checkout</div>
          <div className="w-100">
            <Row>
              <Col span={breakPoint?.lg ? 12 : 24}>
                <div className={styles.billingFormWrapper}>
                  <Collapse
                    className={styles.billingFormCollapse}
                    defaultActiveKey={["billingInfo"]}
                    ghost
                    items={items}
                    expandIconPosition="end"
                  />
                </div>
              </Col>
              <Col span={breakPoint?.lg ? 12 : 24}>
                <div className={styles.checkoutCourseContainer}>
                  <Flex vertical gap={"1.5rem"}>
                    <Flex justify="space-between" align="center">
                      <Flex gap={"1.5rem"}>
                        <Image
                          style={{ borderRadius: "10px" }}
                          width={breakPoint?.md ? 110 : 64}
                          height={breakPoint?.md ? 110 : 64}
                          preview={false}
                          src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
                        />
                        <Flex
                          vertical
                          style={{ flex: 1, justifyContent: "space-evenly" }}
                        >
                          <div className="font-sm text-uppercase">
                            leadership and business management
                          </div>
                          <div className="font-default font-bold">
                            International Leadership
                          </div>
                          <div>
                            <span
                              className="font-sm"
                              style={{ paddingRight: "10px" }}
                            >
                              Qty: 10
                            </span>
                          </div>
                          <div className="font-sm">
                            Dubai, UAE | Oct 7, 2023
                          </div>
                        </Flex>
                      </Flex>
                      <div className="font-sm font-bold">$4000</div>
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Flex gap={"1.5rem"}>
                        <Image
                          style={{ borderRadius: "10px" }}
                          width={breakPoint?.md ? 110 : 64}
                          height={breakPoint?.md ? 110 : 64}
                          preview={false}
                          src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
                        />
                        <Flex
                          vertical
                          style={{ flex: 1, justifyContent: "space-evenly" }}
                        >
                          <div className="font-sm text-uppercase">
                            leadership and business management
                          </div>
                          <div className="font-default font-bold">
                            International Leadership
                          </div>
                          <div>
                            <span
                              className="font-sm"
                              style={{ paddingRight: "10px" }}
                            >
                              Qty: 10
                            </span>
                          </div>
                          <div className="font-sm">
                            Dubai, UAE | Oct 7, 2023
                          </div>
                        </Flex>
                      </Flex>
                      <div className="font-sm font-bold">$4000</div>
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Flex gap={"1.5rem"}>
                        <Image
                          style={{ borderRadius: "10px" }}
                          width={breakPoint?.md ? 110 : 64}
                          height={breakPoint?.md ? 110 : 64}
                          preview={false}
                          src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
                        />
                        <Flex
                          vertical
                          style={{ flex: 1, justifyContent: "space-evenly" }}
                        >
                          <div className="font-sm text-uppercase">
                            leadership and business management
                          </div>
                          <div className="font-default font-bold">
                            International Leadership
                          </div>
                          <div>
                            <span
                              className="font-sm"
                              style={{ paddingRight: "10px" }}
                            >
                              Qty: 10
                            </span>
                          </div>
                          <div className="font-sm">
                            Dubai, UAE | Oct 7, 2023
                          </div>
                        </Flex>
                      </Flex>
                      <div className="font-sm font-bold">$4000</div>
                    </Flex>
                  </Flex>
                  <Flex className={styles.couponCodeWrapper}>
                    <Input />
                    <Button>Apply Code</Button>
                  </Flex>
                  <Flex className={styles.totalWrapper}>
                    <table>
                      <tbody>
                        <tr>
                          <td>VAT</td>
                          <td>$0</td>
                        </tr>
                        <tr>
                          <td>
                            <span className={styles.totalText}>Total</span> (3
                            items)
                          </td>
                          <td>
                            <span className={styles.totalText}>$24,000</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Flex>
                </div>
              </Col>
            </Row>
          </div>
        </Flex>
      </div>
    </div>
  );
}
