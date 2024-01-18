import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Form,
  Image,
  Input,
  Row,
} from "antd";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import styles from "./Checkout.module.scss";

export default function Checkout() {
  const breakPoint = useBreakPoint();

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Previous",
      children: (
        <div>
          <Form name="loginForm">
          <Form.Item
            name="email"
            label="email"
          >
            <Input
              className={styles.input}
              placeholder="Email ID"
              size="middle"
              style={{
                flexShrink: 0,
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="email"
          >
            <Input
              className={styles.input}
              placeholder="Email ID"
              size="middle"
           
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="email"
          >
            <Input
              className={styles.input}
              placeholder="Email ID"
              size="middle"
            />
          </Form.Item>
          </Form>
          <Flex vertical gap={"1.5rem"}>
            <Flex
              justify="space-around"
              style={{ alignItems: "center" }}
              className={styles.myCourseContainer}
            >
              <div className={styles.dateWrapper}>
                <span className={`${styles.dateText} font-bold common-header`}>
                  20
                </span>
                <span className="font-default font-bold text-uppercase">
                  Nov
                </span>
              </div>
              <Flex vertical>
                <div
                  className={`${styles.courseTitle} text-uppercase font-bold`}
                >
                  leadership and business management
                </div>
                <div className={`${styles.courseSubTitle} font-bold`}>
                  International Leadership
                </div>
              </Flex>
              <div className={`${styles.courseSubTitle}`}>
                Dubai, UAE | Nov 20, 2023
              </div>
              <div>
                <Button type="link" className={styles.locationBtn}>
                  See Location
                </Button>
              </div>
            </Flex>
            <Flex
              justify="space-around"
              style={{ alignItems: "center" }}
              className={styles.myCourseContainer}
            >
              <div className={styles.dateWrapper}>
                <span className={`${styles.dateText} font-bold common-header`}>
                  20
                </span>
                <span className="font-default font-bold text-uppercase">
                  Nov
                </span>
              </div>
              <Flex vertical>
                <div
                  className={`${styles.courseTitle} text-uppercase font-bold`}
                >
                  leadership and business management
                </div>
                <div className={`${styles.courseSubTitle} font-bold`}>
                  International Leadership
                </div>
              </Flex>
              <div className={`${styles.courseSubTitle}`}>
                Dubai, UAE | Nov 20, 2023
              </div>
              <div>
                <Button type="link" className={styles.locationBtn}>
                  See Location
                </Button>
              </div>
            </Flex>
          </Flex>
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
              <Col
                span={breakPoint?.lg ? 12 : 24}
                order={breakPoint?.lg ? 1 : 2}
              >
                <div>
                  <Collapse
                    className="mycourses"
                    defaultActiveKey={["1"]}
                    ghost
                    items={items}
                    expandIconPosition="end"
                  />
                  <Flex vertical className={styles.modalWrapper}>
                    <>
                      <Input
                        className={styles.input}
                        placeholder="Enter Password"
                        size="middle"
                        style={{
                          flexShrink: 0,
                        }}
                      />
                      <Input
                        className={styles.input}
                        placeholder="Confirm Password"
                        size="middle"
                        style={{
                          flexShrink: 0,
                        }}
                      />
                      <Button
                        type="primary"
                        className={styles.btn}
                        style={{ margin: "1.5rem auto 0" }}
                      >
                        Sign Up
                      </Button>
                    </>
                  </Flex>
                </div>
              </Col>
              <Col
                span={breakPoint?.lg ? 12 : 24}
                order={breakPoint?.lg ? 2 : 1}
              >
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
