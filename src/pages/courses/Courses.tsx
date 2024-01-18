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
import { useLayoutEffect, useState } from "react";

function Courses() {
  const breakPoints = useBreakPoint();
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false);

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
              src="https://s3-alpha-sig.figma.com/img/3aad/9e48/d040e2bdcfd23a58b785abb88960eb10?Expires=1704672000&Signature=q4vQ9IqSUxaBCYfa2qeKqnOkuIs263OYsy4X56DFiJEb~8eIH55pZCSgIK0oc9g5kChQZg1BlxrQgae5LHH4i5TUZHBrGbYClSuQQLzfu5PnAgejst9r0yibOrM3zAIakoA0Tr-DBhLimXdf2snform8gHJsUFPaRhOr0KhKxwfevkptBcgfG6Mlx~5XNpQH4g7rGeYrYjo~Zsy-nwTAusotiuXDvxK3YONBixm2PCL7DAG091~h71dJM31w7E6~BV3qnMN1Xkx5gjQ~dvdqDzmm~1kfne64i7HeWQ5S0uFP2CxVELcld8Ddz5bkJPIxvU1NIbKf4KUuoN~pcBzIcg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
                  Artificial Intelligence
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
          <div className={styles.topicText}>20 Topics available</div>
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
        <GridCard />
      </div>
    </div>
  );
}

export default Courses;
