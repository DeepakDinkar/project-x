import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Input, Layout, Menu, Modal } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { Logo } from "../../utils/svgs/Logo";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./Header.module.scss";
import Register from "./Register/Register";
import Login from "./Login/Login";

export type MenuMode = "horizontal" | "vertical" | "inline";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();

  const [visible, setVisible] = useState(false);
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

  const mobileNavigate = (path: string) => {
    navigate(path);
    setVisible(false);
  };

  return (
    <nav>
      <Layout style={{ paddingBottom: "5rem" }}>
        <Layout.Header className={styles.header}>
          <Flex style={{ alignItems: "center", gap: "2.5rem" }}>
            <span
              className={styles.logoWrapper}
              onClick={() => navigate("/")}
              role="button"
            >
              <Logo />
            </span>
            <Input
              placeholder="Search"
              prefix={<SearchIcon />}
              size="middle"
              style={{
                width: "auto",
                flexGrow: 1,
              }}
            />
            {breakPoints?.md ? (
              <>
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
                <Button
                  type="primary"
                  className="text-uppercase"
                  onClick={() => showModal()}
                >
                  Log in
                </Button>
              </>
            ) : (
              <Button
                className={styles.menuBtn}
                type="text"
                onClick={showDrawer}
              >
                <MenuOutlined height={100} width={100} />
              </Button>
            )}
          </Flex>
          <div>
            <Drawer
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
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
