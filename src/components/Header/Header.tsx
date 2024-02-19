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
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { useDrawer } from "../../hooks/useDrawer";
import { logout } from "../../redux/reducers/userReducer";
import { Cart } from "../../utils/svgs/Cart";

import { googleLogout } from "@react-oauth/google";
import { ModalView, useModalContext } from "../../context/ModalContext";
import useFetch from "../../hooks/useFetch";
import { Course } from "../../models/Course";
import LoginModalReducerProps from "../../models/reducers/LoginModalReducerProps";
import { closeCartDrawer } from "../../redux/reducers/cartReducer";
import { closeModal, openModal } from "../../redux/reducers/loginModalReducer";
import { logoutUser } from "../../services/userApi";
import { UserIcon } from "../../utils/svgs/UserIcon";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import CartDrawer from "./Drawer/CartDrawer";
import MobileDrawer from "./Drawer/MobileDrawer";
import styles from "./Header.module.scss";
import LoginWrapper from "./LoginWrapper";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakPoints = useBreakPoint();
  const dispatch = useDispatch();
  const { state, dispatch: drawerDispatch } = useDrawer();
  const { setView } = useModalContext();
  const { fetch } = useFetch(logoutUser);
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

  const isDrawerVisible =
    useSelector((state: { cart: { isDrawerVisible: boolean } }) => state.cart)
      ?.isDrawerVisible ?? false;

  const logOut = async () => {
    await fetch();
    dispatch(logout());
    googleLogout();
  };

  useEffect(() => {}, [user, user.login]);

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
      key: "myPurchases",
      label: (
        <Button type="link" onClick={() => navigate("/mypurchases")}>
          My Purchases
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
        afterClose={() => setView(ModalView.Login)}
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

  const isRouteActive = (pathName: string): boolean => {
    return new RegExp(pathName).test(location?.pathname);
  };

  return (
    <nav>
      <Layout style={{ paddingBottom: "4rem" }}>
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
                    isRouteActive("/courses") ? "active" : ""
                  }`}
                  onClick={() => navigate("/courses")}
                >
                  Verticals
                </Button>
                <Button
                  type="link"
                  className={`${styles.linkButton} ${
                    isRouteActive("/about") ? "active" : ""
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
