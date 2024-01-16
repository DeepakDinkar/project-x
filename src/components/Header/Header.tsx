import { DownOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Dropdown,
  Flex,
  Image,
  Input,
  Layout,
  MenuProps,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DRAWER } from "../../constants/drawer.constants";
import { USER } from "../../constants/endpoints.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { useDrawer } from "../../hooks/useDrawer";
import { logout } from "../../redux/reducers/userReducer";
import { axiosConfig } from "../../services/axios-config";
import { Cart } from "../../utils/svgs/Cart";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import { UserIcon } from "../../utils/svgs/UserIcon";
import CartDrawer from "./Drawer/CartDrawer";
import MobileDrawer from "./Drawer/MobileDrawer";
import styles from "./Header.module.scss";
import LoginWrapper from "./LoginWrapper";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();
  const { state, dispatch: drawerDispatch } = useDrawer();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const user = useSelector((state: { user: { login: boolean } }) => state.user);

  useEffect(() => {
    setIsModalOpen(false);
  }, [user, user.login]);

  useEffect(() => {
    axiosConfig
      .get(USER.LOGIN)
      .then((response) => {
        console.log("Response token", response);
      })
      .catch((error) => {
        console.log("Response error", error);
      });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openDrawer = (type: string): void => {
    drawerDispatch({
      type,
      payload: true,
    });
  };

  const closeDrawer = (type: string): void => {
    drawerDispatch({
      type,
      payload: false,
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "myProfile",
      label: <Button type="link">My Profile</Button>,
    },
    {
      key: "myCourses",
      label: (
        <Button type="link" onClick={() => navigate("/mycourses")}>
          My Courses
        </Button>
      ),
    },
    {
      key: "logOut",
      label: (
        <Button type="link" onClick={() => dispatch(logout())}>
          Log Out
        </Button>
      ),
    },
  ];

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

  const getUserInfo = () => {
    return user?.login ? (
      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow
        overlayClassName={styles.userDropdown}
      >
        <Flex className={styles.userDropdownWrapper}>
          <UserIcon className={styles.userIcon} />
          <Flex className={styles.userName}>
            <Button type="link" className={styles.linkButton}>
              {breakPoints?.md && "Deepak"} <DownOutlined />
            </Button>
          </Flex>
        </Flex>
      </Dropdown>
    ) : (
      <Button
        type="primary"
        className={styles.loginBtn}
        style={{ height: "56px !important" }}
        onClick={() => showModal()}
      >
        Log in
      </Button>
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
            {getUserInfo()}
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
