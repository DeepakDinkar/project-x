import { MenuOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Drawer,
  Flex,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
} from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { Logo } from "../../utils/svgs/Logo";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./Header.module.scss";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { Cart } from "../../utils/svgs/Cart";
import { Dustbin } from "../../utils/svgs/Dustbin";
import { SearchIconHeader } from "../../utils/svgs/SearchIconHeader";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();

  const [visible, setVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsNextStep(false);
    setIsLogin(true);
  };

  const showDrawer = () => {
    setVisible(!visible);
  };

  const showCartDrawer = () => {
    setCartVisible(!cartVisible);
  };

  const mobileNavigate = (path: string) => {
    navigate(path);
    setVisible(false);
  };

  return (
    <nav>
      <Layout style={{ paddingBottom: "5rem" }}>
        <Layout.Header className={styles.header}>
          <Flex style={{ alignItems: "center", gap: "1.5rem" }}>
            {!breakPoints?.md && (
              <Button
                className={styles.menuBtn}
                type="text"
                onClick={showDrawer}
              >
                <MenuOutlined height={100} width={100} />
              </Button>
            )}
            <span
              className={styles.logoWrapper}
              onClick={() => navigate("/")}
              role="button"
              onKeyDown={() => {}}
            >
              <Logo />
            </span>
            {breakPoints?.md && (
              <>
                <Input
                  placeholder="Search"
                  prefix={<SearchIcon />}
                  size="middle"
                  style={{
                    width: "auto",
                    flexGrow: 1,
                  }}
                />
                <Button
                  type="link"
                  className={`${styles.linkButton} ${
                    RegExp(`/courses`).exec(location?.pathname) ? "active" : ""
                  }`}
                  onClick={() => navigate("/courses")}
                >
                  Courses
                </Button>
                <Button
                  type="link"
                  className={`${styles.linkButton} ${
                    location?.pathname.match("/about") ? "active" : ""
                  }`}
                  onClick={() => navigate("/about")}
                >
                  About us
                </Button>
                <Badge count={5} status="default">
                  <Cart onClick={showCartDrawer} />
                </Badge>
              </>
            )}
            {
               !breakPoints?.md && (
                <SearchIconHeader/>
               )
            }
            <Button
              type="primary"
              className="text-uppercase"
              onClick={() => showModal()}
            >
              Log in
            </Button>
          </Flex>
          <div>
            <Drawer
              placement="left"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99998 }}
            >
              <Menu mode="inline" className={styles.menu}>
                <Button
                  type="link"
                  className={`${styles.drawerMenuBtn} ${styles.linkButton} ${
                    location?.pathname.match("/courses") ? "active" : ""
                  }`}
                  onClick={() => mobileNavigate("/courses")}
                >
                  Courses
                </Button>
                <Button
                  type="link"
                  className={`${styles.drawerMenuBtn} ${styles.linkButton} ${
                    location?.pathname.match("/about") ? "active" : ""
                  }`}
                  onClick={() => mobileNavigate("/about")}
                >
                  About Us
                </Button>
                <Button
                  type="primary"
                  className={`${styles.mobileLoginBtn} text-uppercase`}
                  onClick={() => {
                    showModal();
                    showDrawer();
                  }}
                >
                  Log in
                </Button>
              </Menu>
            </Drawer>

            <Drawer
              size="default"
              className="cart-drawer"
              placement="right"
              closable={true}
              onClose={showCartDrawer}
              open={cartVisible}
              style={{ zIndex: 99999 }}
              title={
                <>
                  <span className="font-roboto-slab font-bold sub-header">
                    Add to Cart
                  </span>
                  <Badge count={5} offset={[10, -10]} />
                </>
              }
            >
              <div>
                <Flex vertical gap={"2.5rem"}>
                  <Flex gap={"1.5rem"}>
                    <Image
                      style={{ borderRadius: "10px" }}
                      width={56}
                      height={56}
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
                        <span className="font-sm">Price: $400</span>
                      </div>
                    </Flex>
                    <Dustbin />
                  </Flex>
                  <Flex>
                    <Image
                      width={56}
                      height={56}
                      preview={false}
                      src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1704672000&Signature=P0~M-qXMsTa5ucFR-qM66Ye4vwtJbifupT10AOGgMDW0CYgkZQqhlZInSRX-TbNYzn5Ru3A785pvaz3A~C~DGk7rkTJypT01skDcOwVenzAoJ3l-dx7YpuCoDgXiUHKQ25gzELJJMnnPxyMMPz00snHWt9SRBJZWm4-46kWlxjpjuid5GFe80mBmOa8RtLsOiPUAxOATe0tYpb-ctfrG86yGMsTids9djD6oRO5jKiGypLcj78xC3P2XNIRM-8OPtRxAfsA0qT29SEiWh6Y~VevDjJs77xW2Gq7fQgB6EdNwhmHRvIpK6kqZPIoq7EhnzlVZ8AJ7ZwSyIz-neNLzoA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    />
                  </Flex>
                  <Button
                    type="primary"
                    className="font-default font-bold text-uppercase"
                    style={{ alignSelf: "self-end", width: "fit-content" }}
                  >
                    Checkout
                  </Button>
                </Flex>
              </div>
            </Drawer>
          </div>
          <Modal
            open={isModalOpen}
            centered
            closable={true}
            onCancel={() => handleCancel()}
            footer={null}
          >
            {isLogin ? (
              <Login setIsLogin={setIsLogin} />
            ) : (
              <Register isNextStep={isNextStep} setIsNextStep={setIsNextStep} />
            )}
          </Modal>
        </Layout.Header>
      </Layout>
    </nav>
  );
}

{
  /* <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="project">
          <CodeOutlined /> Projects
        </Menu.Item>
        <Menu.Item key="about-us">
          <UserOutlined /> Profile
        </Menu.Item>
        <Menu.Item key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu> */
}
