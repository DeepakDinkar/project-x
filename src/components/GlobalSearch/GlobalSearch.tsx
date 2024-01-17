import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Drawer, Input } from "antd";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./GlobalSearch.module.scss";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { useState } from "react";

export default function GlobalSearch() {
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const breakPoints = useBreakPoint();

  return (
    <>
      {breakPoints?.lg ? (
        <Input
          placeholder="Search"
          prefix={<SearchIcon />}
          size="middle"
          className={styles.globalSearchInput}
        />
      ) : (
        <SearchOutlined
          className={styles.headerIcon}
          onClick={() => setIsDrawerVisible(true)}
        />
      )}
      <Drawer
        height={"auto"}
        placement="top"
        size="default"
        closable={true}
        styles={{ header: { display: "none" } }}
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        style={{ zIndex: 99998 }}
      >
        <div className={styles.searchText}>Search</div>
        <Input
          placeholder="Courses, topics, mentors...."
          size="middle"
          className={`${styles.globalSearchInput} ${styles.mobileSearch}`}
          suffix={<CloseOutlined onClick={() => setIsDrawerVisible(false)} />}
        />
      </Drawer>
    </>
  );
}
