import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Image, Input, Layout, Modal } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DRAWER } from "../../constants/drawer.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { useDrawer } from "../../hooks/useDrawer";
import { Cart } from "../../utils/svgs/Cart";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import CartDrawer from "./Drawer/CartDrawer";
import MobileDrawer from "./Drawer/MobileDrawer";
import styles from "./Header.module.scss";
import LoginWrapper from "./LoginWrapper";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();
  const { state, dispatch } = useDrawer();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openDrawer = (type: string): void => {
    dispatch({
      type,
      payload: true,
    });
  };

  const closeDrawer = (type: string): void => {
    dispatch({
      type,
      payload: false,
    });
  };

  const getLoginModal = () => {
    return (
      <Modal
        destroyOnClose={true}
        open={isModalOpen}
        centered
        closable={true}
        onCancel={() => handleCancel()}
        footer={null}
      >
        <LoginWrapper />
      </Modal>
    );
  };

  return (
    <nav>
      <Layout style={{ paddingBottom: "6rem" }}>
        <Layout.Header className={styles.header}>
          <Flex style={{ alignItems: "center", gap: "1.5rem" }}>
            {!breakPoints?.md && (
              <Button
                className={styles.menuBtn}
                type="text"
                onClick={() => openDrawer(DRAWER.SHOW_MOBILE)}
              >
                <MenuOutlined className={styles.headerIcon} />
              </Button>
            )}
            <span className={styles.logoWrapper}>
              <Image
                src="/logo.png"
                preview={false}
                onClick={() => navigate("/")}
              />
            </span>
            {breakPoints?.md && (
              <>
                <Input
                  placeholder="Search"
                  prefix={<SearchIcon />}
                  size="middle"
                  className={styles.globalSearchInput}
                />
                <Button
                  type="link"
                  className={`${styles.linkButton} ${
                    RegExp(`/courses`).exec(location?.pathname) ? "active" : ""
                  }`}
                  onClick={() => navigate("/courses")}
                >
                  Verticals
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
                  <Cart
                    onClick={() => {
                      openDrawer(DRAWER.SHOW_CART);
                    }}
                    className={styles.cartIcon}
                  />
                </Badge>
              </>
            )}
            {!breakPoints?.md && (
              <SearchOutlined className={styles.headerIcon} />
            )}
            <Button
              type="primary"
              className={styles.loginBtn}
              style={{ height: "56px !important" }}
              onClick={() => showModal()}
            >
              Log in
            </Button>
          </Flex>
          <div>
            <MobileDrawer
              isDrawerVisible={state.isMobileDrawer}
              openDrawer={() => openDrawer(DRAWER.SHOW_CART)}
              closeDrawer={() => closeDrawer(DRAWER.SHOW_MOBILE)}
            />
            <CartDrawer
              isDrawerVisible={state.isCartDrawer}
              closeDrawer={() => closeDrawer(DRAWER.SHOW_CART)}
            />
          </div>
        </Layout.Header>
        {getLoginModal()}
      </Layout>
    </nav>
  );
}
