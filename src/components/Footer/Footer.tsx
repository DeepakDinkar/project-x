import { Collapse, CollapseProps, Flex, Image, Layout, List } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import styles from "./Footer.module.scss";
import RequestCallback from "./RequestCallback/RequestCallback";
import { openModal } from "../../redux/reducers/loginModalReducer";

function Footer() {
  const breakPoints = useBreakPoint();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const CONTACT_US = [t("footer.footerLinks.contact.email")];
  const MENU = [
    t("footer.footerLinks.menu.explore"),
    t("footer.footerLinks.menu.aboutUs"),
    t("footer.footerLinks.menu.signup"),
  ];
  const SERVICES = [
    t("footer.footerLinks.services.liveVirtualTraining"),
    t("footer.footerLinks.services.face2faceTraining"),
    t("footer.footerLinks.services.consulting"),
    t("footer.footerLinks.services.mentorCoaching"),
    t("footer.footerLinks.services.auditing"),
  ];
  const LEGAL = [
    t("footer.footerLinks.legal.termsAndConditions"),
    t("footer.footerLinks.legal.privacyAndPolicy"),
    t("footer.footerLinks.legal.faqs"),
  ];
  const QOMOI_INSTITUTE = [
    t("footer.footerLinks.institute.careers"),
    t("footer.footerLinks.institute.news"),
  ];
  const isUserLoggedIn =
    useSelector((state: { user: { login: boolean } }) => state.user)?.login ??
    false;

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

  const openSignInModal = () => {
    dispatch(openModal());
  };

  const getContactUsMobile = () => {
    return (
      <Flex
        vertical
        className={`${styles.officeAddress} ${styles.officeAddressMobile}`}
      >
        <a href="#contact">{CONTACT_US[0]}</a>
        <span>{t("footer.footerLinks.contact.offices")}</span>
        <span>{t("footer.footerLinks.contact.officePlaces")}</span>
      </Flex>
    );
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: t("footer.footerLinks.contact.title"),
      children: getContactUsMobile(),
    },
    {
      key: "2",
      label: t("footer.footerLinks.menu.title"),
      children: getCollapseItems(MENU),
    },
    {
      key: "3",
      label: t("footer.footerLinks.services.title"),
      children: getCollapseItems(SERVICES),
    },
    {
      key: "4",
      label: t("footer.footerLinks.legal.title"),
      children: getCollapseItems(QOMOI_INSTITUTE),
    },
    {
      key: "5",
      label: t("footer.footerLinks.institute.title"),
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
          header={<div>{t("footer.footerLinks.contact.title")}</div>}
          bordered
          dataSource={CONTACT_US}
          renderItem={(item) => (
            <>
              <List.Item>{item}</List.Item>
              <List.Item>
                <Flex vertical className={styles.officeAddress}>
                  <span>{t("footer.footerLinks.contact.offices")}</span>
                  <span>{t("footer.footerLinks.contact.officePlaces")}</span>
                </Flex>
              </List.Item>
            </>
          )}
        />
        <List
          size="small"
          header={<div>{t("footer.footerLinks.menu.title")}</div>}
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
          header={<div>{t("footer.footerLinks.services.title")}</div>}
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
          header={<div>{t("footer.footerLinks.legal.title")}</div>}
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
          header={<div>{t("footer.footerLinks.institute.title")}</div>}
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
      {!isUserLoggedIn && (
        <Flex className={styles.footerWrapper} vertical>
          <p>{t("footer.membership.title")}</p>
          <span>{t("footer.membership.subTitle")}</span>
          <span>{t("footer.membership.profileText")}</span>
          <button className={styles.signUp} onClick={openSignInModal}>
            {t("footer.membership.membershipBtn")}
          </button>
        </Flex>
      )}
      <RequestCallback />
      <div className={styles.contactUsWrapper}>
        <Flex gap={"2rem"} justify="space-between" vertical={!breakPoints?.lg}>
          {breakPoints?.lg ? getFooterContent() : getMobileFooterContent()}
          <span className={styles.logoWrapper}>
            <Image src="/logo.png" preview={false} />
          </span>
        </Flex>
        <div className={styles.trademark}>
          © {new Date().getFullYear()} {t("misc.footerAppText")}
        </div>
      </div>
    </Layout>
  );
}

export default Footer;
