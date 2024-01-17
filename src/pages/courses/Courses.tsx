import { Flex, Image, Input, Select, Tag } from "antd";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./Courses.module.scss";
import GridCard from "../../components/GridCard/GridCard";

function Courses() {
  const breakPoints = useBreakPoint();

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
              height={breakPoints?.md ? 380 : 180}
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
                <span className={styles.courseSubTitle}>
                  Choose the latest topics offered curated by our professionals
                </span>
              </Flex>
            </div>
          </div>
        </div>

        <div className={`${styles.exploreSearchWrapper}`}>
          <div className={styles.topicText}>20 Topics available</div>
          <Flex
            vertical
            style={{
              justifyContent: "space-between",
              gap: "2.5rem",
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
          </Flex>
        </div>
        <GridCard />
      </div>
    </div>
  );
}

export default Courses;
