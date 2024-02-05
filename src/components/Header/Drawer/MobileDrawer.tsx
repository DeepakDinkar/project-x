import { Badge, Button, Drawer, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Cart } from "../../../utils/svgs/Cart";
import styles from "../Header.module.scss";

type Props = {
  isDrawerVisible: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
};

export default function MobileDrawer({
  isDrawerVisible,
  closeDrawer,
  openDrawer,
}: Readonly<Props>) {
  const navigate = useNavigate();

  const routeToPath = (path: string) => {
    navigate(path);
    closeDrawer();
  };

  const isRouteActive = (pathName: string): boolean => {
    return new RegExp(pathName).test(location?.pathname);
  };

  return (
    <Drawer
      placement="left"
      closable={true}
      onClose={() => closeDrawer()}
      open={isDrawerVisible}
      style={{ zIndex: 99998 }}
    >
      <Menu mode="inline" className={styles.menu}>
        <Button
          type="link"
          className={`${styles.drawerMenuBtn} ${styles.linkButton} ${
            isRouteActive("/courses") ? "active" : ""
          }`}
          onClick={() => routeToPath("/courses")}
        >
          Verticals
        </Button>
        <Button
          type="link"
          className={`${styles.drawerMenuBtn} ${styles.linkButton} ${
            isRouteActive("/about") ? "active" : ""
          }`}
          onClick={() => routeToPath("/about")}
        >
          About Us
        </Button>
        <Badge count={5} status="default">
          <Cart onClick={() => openDrawer()} className={styles.cartIcon} />
        </Badge>
      </Menu>
    </Drawer>
  );
}
