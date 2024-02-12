import { Collapse, CollapseProps, Flex, Image, Layout, List } from "antd";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import styles from "./Footer.module.scss";
import RequestCallback from "./RequestCallback/RequestCallback";

const CONTACT_US = ["info@qomoi.com"];
const MENU = ["Explore", "About Us", "Sign Up"];
const SERVICES = [
  "Live virtual Training",
  "Class room face to face training",
  "Consulting",
  "Mentoring and coaching",
  "Auditing",
];
const LEGAL = ["Terms and Conditions", "Privacy and cookie policy", "FAQs"];
const QOMOI_INSTITUTE = ["Careers", "News"];

function Footer() {
  const breakPoints = useBreakPoint();

  const getCollapseItems = (items: string[]) => {
    return (
      <Flex vertical className={styles.collapseItem}>
        {items.map((item) => (
          <a href="#section" key={item}>
            {item}
          </a>
        ))}
      </Flex>
    );
  };

  const getContactUsMobile = () => {
    return (
      <Flex vertical className={`${styles.officeAddress} ${styles.officeAddressMobile}`}>
        <a href="#contact">{CONTACT_US[0]}</a>
        <span>Offices:</span>
        <span>
          Atlanta, GA, USA (North Americam HQ)<br/> San Diego, CA, USA <br/>Other offices
          coming soon!
        </span>
      </Flex>
    );
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Contact",
      children: getContactUsMobile(),
    },
    {
      key: "2",
      label: "Menu",
      children: getCollapseItems(MENU),
    },
    {
      key: "3",
      label: "Services",
      children: getCollapseItems(SERVICES),
    },
    {
      key: "4",
      label: "Legal",
      children: getCollapseItems(QOMOI_INSTITUTE),
    },
    {
      key: "5",
      label: "Qomoi Institute",
      children: getCollapseItems(QOMOI_INSTITUTE),
    },
  ];

  const getMobileFooterContent = () => {
    return (
      <Collapse
        items={items}
        className={styles.listCollapseContainer}
        defaultActiveKey={1}
        expandIconPosition="end"
      />
    );
  };

  const getFooterContent = () => {
    return (
      <Flex className={styles.menuListContainer}>
        <List
          size="small"
          header={<div>Contact</div>}
          bordered
          dataSource={CONTACT_US}
          renderItem={(item) => (
            <>
              <List.Item>{item}</List.Item>
              <List.Item>
                <Flex vertical className={styles.officeAddress}>
                  <span>Offices:</span>
                  <span>
                    Atlanta, GA, USA (North Americam HQ) San Diego, CA, USA
                    Other offices coming soon!
                  </span>
                </Flex>
              </List.Item>
            </>
          )}
        />
        <List
          size="small"
          header={<div>Menu</div>}
          bordered
          dataSource={MENU}
          renderItem={(item) => (
            <List.Item>
              <a href="#section">{item}</a>
            </List.Item>
          )}
        />
        <List
          size="small"
          header={<div>Services</div>}
          bordered
          dataSource={SERVICES}
          renderItem={(item) => (
            <List.Item>
              <a href="#section">{item}</a>
            </List.Item>
          )}
        />
        <List
          size="small"
          header={<div>Legal</div>}
          bordered
          dataSource={LEGAL}
          renderItem={(item) => (
            <List.Item>
              <a href="#section">{item}</a>
            </List.Item>
          )}
        />
        <List
          size="small"
          header={<div>Qomoi Institute</div>}
          bordered
          dataSource={QOMOI_INSTITUTE}
          renderItem={(item) => (
            <List.Item>
              <a href="#section">{item}</a>
            </List.Item>
          )}
        />
      </Flex>
    );
  };

  return (
    <Layout>
      <Flex className={styles.footerWrapper} vertical>
        <p>
        Become a member now!
        </p>
        <span>Receive course updates and discount codes</span>
        <span>Manage your profile </span>
        <button className={styles.signUp}>Get Membership</button>
      </Flex>
      <RequestCallback />
      <div className={styles.contactUsWrapper}>
        <Flex gap={"2rem"} justify="space-between" vertical={!breakPoints?.lg}>
          {breakPoints?.lg ? getFooterContent() : getMobileFooterContent()}
          <span className={styles.logoWrapper}>
            <Image src="/logo.png" preview={false} />
          </span>
        </Flex>
        <div className={styles.trademark}>
          © {new Date().getFullYear()} Qomoi
        </div>
      </div>
    </Layout>
  );
}

export default Footer;
