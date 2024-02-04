import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  MenuProps,
  Modal,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DRAWER } from "../../constants/drawer.constants";
import { USER } from "../../constants/endpoints.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { useDrawer } from "../../hooks/useDrawer";
import { logout } from "../../redux/reducers/userReducer";
import { axiosConfig } from "../../services/axios-config";
import { Cart } from "../../utils/svgs/Cart";

import { googleLogout } from "@react-oauth/google";
import { closeModal, openModal } from "../../redux/reducers/loginModalReducer";
import { UserIcon } from "../../utils/svgs/UserIcon";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import CartDrawer from "./Drawer/CartDrawer";
import MobileDrawer from "./Drawer/MobileDrawer";
import styles from "./Header.module.scss";
import LoginWrapper from "./LoginWrapper";
import LoginModalReducerProps from "../../models/reducers/LoginModalReducerProps";
import { Course } from "../../models/Course";
import { closeCartDrawer } from "../../redux/reducers/cartReducer";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();
  const { state, dispatch: drawerDispatch } = useDrawer();
  const dispatch = useDispatch();
  const cartCourses: Course[] =
    useSelector((state: { cart: { items: Course[] } }) => state.cart)?.items ||
    [];
  const isModalOpen =
    useSelector(
      (state: { loginModal: LoginModalReducerProps }) => state?.loginModal
    )?.isModalOpen || false;

  const user = useSelector(
    (state: { user: { login: boolean; userName: string } }) => state.user
  );

  const isDrawerVisible = useSelector((state: { cart: {isDrawerVisible: boolean}}) => state.cart)?.isDrawerVisible ?? false;

  const logOut = () => {
    dispatch(logout());
    googleLogout();
  };

  useEffect(() => {}, [user, user.login]);

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
    dispatch(openModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
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
    dispatch(closeCartDrawer());
  };

  const items: MenuProps["items"] = [
    {
      key: "myProfile",
      label: (
        <Button type="link" onClick={() => navigate("/myprofile")}>
          My Profile
        </Button>
      ),
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
        <Button type="link" onClick={() => logOut()}>
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
              {breakPoints?.md && user?.userName} <DownOutlined />
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
      <Layout style={{ paddingBottom: "5rem" }}>
        <Layout.Header className={styles.header}>
          <Flex style={{ alignItems: "center", gap: "1.2rem" }}>
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
                width={0}
                src="/logo.png"
                preview={false}
                onClick={() => navigate("/")}
              />
            </span>
            <GlobalSearch />
            {breakPoints?.md && (
              <>
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
                <Badge count={cartCourses.length} status="default" showZero>
                  <Cart
                    onClick={() => {
                      openDrawer(DRAWER.SHOW_CART);
                    }}
                    className={styles.cartIcon}
                  />
                </Badge>
              </>
            )}
            {getUserInfo()}
          </Flex>
          <div>
            <CartDrawer
              isDrawerVisible={state.isCartDrawer || isDrawerVisible}
              closeDrawer={() => closeDrawer(DRAWER.SHOW_CART)}
            />
            <MobileDrawer
              isDrawerVisible={state.isMobileDrawer}
              openDrawer={() => openDrawer(DRAWER.SHOW_CART)}
              closeDrawer={() => closeDrawer(DRAWER.SHOW_MOBILE)}
            />
          </div>
        </Layout.Header>
        {getLoginModal()}
      </Layout>
    </nav>
  );
}
