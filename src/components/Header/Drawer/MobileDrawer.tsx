import { Badge, Button, Drawer, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Cart } from "../../../utils/svgs/Cart";
import styles from "../Header.module.scss";

type Props = {
  isDrawerVisible: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
};

export default function MobileDrawer({ isDrawerVisible, closeDrawer, openDrawer }: Props) {
  const navigate = useNavigate();

  const routeToPath = (path: string) => {
    navigate(path);
    closeDrawer();
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
            location?.pathname.match("/courses") ? "active" : ""
          }`}
          onClick={() => routeToPath("/courses")}
        >
          Courses
        </Button>
        <Button
          type="link"
          className={`${styles.drawerMenuBtn} ${styles.linkButton} ${
            location?.pathname.match("/about") ? "active" : ""
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
