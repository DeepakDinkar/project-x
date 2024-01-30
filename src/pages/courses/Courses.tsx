import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Flex,
  Image,
  Input,
  Radio,
  Select,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import GridCard from "../../components/GridCard/GridCard";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./Courses.module.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerticalCourse } from "../../models/VerticalCourse";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { getVerticalCourses, getVerticals } from "../../services/verticalsApi";
import { useDispatch } from "react-redux";
import { VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";

function Courses() {
  const breakPoints = useBreakPoint();
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);
  const { data: verticalCourse }: { data: VerticalCourse } = useFetchOnLoad(
    getVerticalCourses,
    slug
  );

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  useLayoutEffect(() => {
    setIsFilterDrawerVisible(false);
  }, [breakPoints?.md]);

  const items: TabsProps["items"] = [
    {
      key: "sortBy",
      label: "Sort by",
      children: (
        <Radio.Group className="radio-select">
          <Radio.Button value="topLeft">
            <Flex justify="space-between" className="w-100">
              A - Z
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="topRight">
            <Flex justify="space-between" className="w-100">
              Z - A
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="bottomLeft">
            <Flex justify="space-between" className="w-100">
              Trending
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="bottomRight">
            <Flex justify="space-between" className="w-100">
              New topic
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
        </Radio.Group>
      ),
    },
    {
      key: "filterByDates",
      label: "Filter By Dates",
      children: "Content of Tab Pane 1",
    },
    {
      key: "filterByDeliveryModes",
      label: "Filter by Delivery Modes",
      children: "Content of Tab Pane 2",
    },
    {
      key: "filterByKnowledgeArea",
      label: "Filter by Knowledge Area",
      children: "Content of Tab Pane 3",
    },
    {
      key: "filterByLocation",
      label: "Filter Location",
      children: "Content of Tab Pane 3",
    },
  ];

  const getFilters = () => {
    return (
      breakPoints?.md && (
        <>
          <Flex gap={"1.5rem"} style={{ flexFlow: "row wrap" }}>
            <Select
              onClick={() => console.log("selected filters..")}
              placeholder="Sort By"
              className="active"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
            <Select
              placeholder="Filter by Dates"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
            <Select
              placeholder="Filter by Delivery Modes"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
            <Select
              placeholder="Filter by Knowledge Area"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
            <Select
              placeholder="Filter by Location"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </Flex>
          <Flex gap={"0.5rem"} style={{ flexFlow: "row wrap" }}>
            <Tag closeIcon>Next Week</Tag>
            <Tag closeIcon>Dubai</Tag>
          </Flex>
        </>
      )
    );
  };

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} search-container`}
    >
      <div className="w-100">
        <div>
          <div
            className={`course-card large-card ${styles.courseBannerContainer}`}
          >
            <Image
              height={breakPoints?.md ? 380 : 150}
              width={"100%"}
              src={verticalCourse?.imageUrl}
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-overlay-wrapper h-100" style={{ padding: 0 }}>
              <Flex
                vertical
                className="h-100 text-center"
                style={{
                  padding: "1.5rem",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <span className={styles.courseTitle}>
                  {verticalCourse?.title}
                </span>
                {breakPoints?.md && (
                  <span className={styles.courseSubTitle}>
                    Choose the latest topics offered curated by our
                    professionals
                  </span>
                )}
              </Flex>
            </div>
          </div>
        </div>

        <div className={`${styles.exploreSearchWrapper}`}>
          <div className={styles.topicText}>{verticalCourse?.courses?.length || 0} Topics available</div>
          <Flex vertical gap={"2rem"}>
            <Flex
              vertical={breakPoints?.md}
              style={{
                justifyContent: "space-between",
                gap: breakPoints?.md ? "2.5rem" : "1.5rem ",
              }}
            >
              <Input
                placeholder="Search topics"
                prefix={<SearchIcon />}
                size="middle"
                style={{
                  width: "auto",
                  flexGrow: 1,
                  maxWidth: "380px",
                }}
              />
              {!breakPoints?.md && (
                <Button
                  className={styles.outlineBtn}
                  onClick={() => setIsFilterDrawerVisible(true)}
                >
                  Filter <DownOutlined />
                </Button>
              )}
            </Flex>
            {getFilters()}
          </Flex>
        </div>

        <Drawer
          size="default"
          className="cart-drawer"
          placement="bottom"
          destroyOnClose={true}
          closable={true}
          styles={{ header: { display: "none" } }}
          onClose={() => setIsFilterDrawerVisible(false)}
          open={isFilterDrawerVisible}
          style={{ zIndex: 99999 }}
        >
          <Flex vertical className="h-100" justify="space-between">
            <Tabs defaultActiveKey="1" items={items} />
            <Button
              type="primary"
              style={{ justifyContent: "center" }}
              onClick={() => setIsFilterDrawerVisible(false)}
            >
              Apply
            </Button>
          </Flex>
        </Drawer>
        <GridCard courses={verticalCourse?.courses || []} />
      </div>
    </div>
  );
}

export default Courses;
