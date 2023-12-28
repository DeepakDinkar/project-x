import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Input, Layout, Menu, Modal } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { Logo } from "../../utils/svgs/Logo";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./Header.module.scss";
import Login from "./Login/Login";

export type MenuMode = "horizontal" | "vertical" | "inline";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
    <nav>
      <Layout style={{ paddingBottom: "5rem" }}>
        <Layout.Header className={styles.header}>
          <Flex style={{ alignItems: "center", gap: "2.5rem" }}>
            <div className={styles.logoWrapper} onClick={() => navigate("/")}>
              <Logo />
            </div>
            {breakPoints?.md ? (
              <>
                <Input
                  placeholder="Search"
                  prefix={<SearchIcon />}
                  size="middle"
                  style={{
                    width: breakPoints?.md ? "380px" : "100%",
                    flexShrink: 0,
                  }}
                />
                <Button
                  type="link"
                  className={`${styles.linkButton} ${
                    location?.pathname.match("/courses") ? "active" : ""
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
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
          <Modal
            open={isModalOpen}
            centered
            closable={true}
            onCancel={() => handleCancel()}
            footer={null}
          >
            <Login />
          </Modal>
        </Layout.Header>
      </Layout>
    </nav>
  );
}

function LeftMenu({ mode }: { mode: MenuMode }) {
  return (
    <Menu mode={mode} >
      <Menu.Item key="courses">Courses</Menu.Item>
      <Menu.Item key="about">About Us</Menu.Item>
    </Menu>
  );
}

function RightMenu({ mode }: { mode: MenuMode }) {
  return (
    <Menu mode={mode}>
       <Button
          type="primary"
          className={`${styles.mobileLoginBtn} text-uppercase`}
        >
          Log in
        </Button>
      {/* <Menu.SubMenu
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
      </Menu.SubMenu> */}
    </Menu>
  );
}
