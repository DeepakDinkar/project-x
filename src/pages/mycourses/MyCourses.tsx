import { Button, Collapse, CollapseProps, Divider, Flex } from "antd";
import GridCard from "../../components/GridCard/GridCard";
import styles from "./MyCourses.module.scss";

export default function MyCourses() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Previous",
      children: (
        <div>
          <Flex vertical gap={"1.5rem"}>
            <Flex
              justify="space-around"
              style={{ alignItems: "center" }}
              className={styles.myCourseContainer}
            >
              <div className={styles.dateWrapper}>
                <span className={`${styles.dateText} font-bold common-header`}>
                  20
                </span>
                <span className="font-default font-bold text-uppercase">
                  Nov
                </span>
              </div>
              <Flex vertical>
                <div
                  className={`${styles.courseTitle} text-uppercase font-bold`}
                >
                  leadership and business management
                </div>
                <div className={`${styles.courseSubTitle} font-bold`}>
                  International Leadership
                </div>
              </Flex>
              <div className={`${styles.courseSubTitle}`}>
                Dubai, UAE | Nov 20, 2023
              </div>
              <div>
                <Button type="link" className={styles.locationBtn}>
                  See Location
                </Button>
              </div>
            </Flex>
            <Flex
              justify="space-around"
              style={{ alignItems: "center" }}
              className={styles.myCourseContainer}
            >
              <div className={styles.dateWrapper}>
                <span className={`${styles.dateText} font-bold common-header`}>
                  20
                </span>
                <span className="font-default font-bold text-uppercase">
                  Nov
                </span>
              </div>
              <Flex vertical>
                <div
                  className={`${styles.courseTitle} text-uppercase font-bold`}
                >
                  leadership and business management
                </div>
                <div className={`${styles.courseSubTitle} font-bold`}>
                  International Leadership
                </div>
              </Flex>
              <div className={`${styles.courseSubTitle}`}>
                Dubai, UAE | Nov 20, 2023
              </div>
              <div>
                <Button type="link" className={styles.locationBtn}>
                  See Location
                </Button>
              </div>
            </Flex>
          </Flex>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.mycoursesWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"4.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Courses</div>

          <div>
            <Flex vertical gap={"1.5rem"}>
              <div className="font-default text-uppercase font-bold">
                <div className="green-dot"></div>HAPPENING NOW
              </div>
              <Flex
                justify="space-around"
                style={{ alignItems: "center" }}
                className={styles.myCourseContainer}
              >
                <div className={styles.dateWrapper}>
                  <span
                    className={`${styles.dateText} font-bold common-header`}
                  >
                    20
                  </span>
                  <span className="font-default font-bold text-uppercase">
                    Nov
                  </span>
                </div>
                <Flex vertical>
                  <div
                    className={`${styles.courseTitle} text-uppercase font-bold`}
                  >
                    leadership and business management
                  </div>
                  <div className={`${styles.courseSubTitle} font-bold`}>
                    International Leadership
                  </div>
                </Flex>
                <div className={`${styles.courseSubTitle}`}>
                  Dubai, UAE | Nov 20, 2023
                </div>
                <div>
                  <Button type="link" className={styles.locationBtn}>
                    See Location
                  </Button>
                </div>
              </Flex>
              <Flex
                justify="space-around"
                style={{ alignItems: "center" }}
                className={styles.myCourseContainer}
              >
                <div className={styles.dateWrapper}>
                  <span
                    className={`${styles.dateText} font-bold common-header`}
                  >
                    20
                  </span>
                  <span className="font-default font-bold text-uppercase">
                    Nov
                  </span>
                </div>
                <Flex vertical>
                  <div
                    className={`${styles.courseTitle} text-uppercase font-bold`}
                  >
                    leadership and business management
                  </div>
                  <div className={`${styles.courseSubTitle} font-bold`}>
                    International Leadership
                  </div>
                </Flex>
                <div className={`${styles.courseSubTitle}`}>
                  Dubai, UAE | Nov 20, 2023
                </div>
                <div>
                  <Button type="link" className={styles.locationBtn}>
                    See Location
                  </Button>
                </div>
              </Flex>
            </Flex>
          </div>
          <div>
            <div
              className="font-default text-uppercase font-bold"
              style={{ padding: "1rem 0" }}
            >
              UPCOMING
            </div>
            <Flex vertical gap={"1.5rem"}>
              <Flex
                justify="space-around"
                style={{ alignItems: "center" }}
                className={styles.myCourseContainer}
              >
                <div className={styles.dateWrapper}>
                  <span
                    className={`${styles.dateText} font-bold common-header`}
                  >
                    20
                  </span>
                  <span className="font-default font-bold text-uppercase">
                    Nov
                  </span>
                </div>
                <Flex vertical>
                  <div
                    className={`${styles.courseTitle} text-uppercase font-bold`}
                  >
                    leadership and business management
                  </div>
                  <div className={`${styles.courseSubTitle} font-bold`}>
                    International Leadership
                  </div>
                </Flex>
                <div className={`${styles.courseSubTitle}`}>
                  Dubai, UAE | Nov 20, 2023
                </div>
                <div>
                  <Button type="link" className={styles.locationBtn}>
                    See Location
                  </Button>
                </div>
              </Flex>
              <Flex
                justify="space-around"
                style={{ alignItems: "center" }}
                className={styles.myCourseContainer}
              >
                <div className={styles.dateWrapper}>
                  <span
                    className={`${styles.dateText} font-bold common-header`}
                  >
                    20
                  </span>
                  <span className="font-default font-bold text-uppercase">
                    Nov
                  </span>
                </div>
                <Flex vertical>
                  <div
                    className={`${styles.courseTitle} text-uppercase font-bold`}
                  >
                    leadership and business management
                  </div>
                  <div className={`${styles.courseSubTitle} font-bold`}>
                    International Leadership
                  </div>
                </Flex>
                <div className={`${styles.courseSubTitle}`}>
                  Dubai, UAE | Nov 20, 2023
                </div>
                <div>
                  <Button type="link" className={styles.locationBtn}>
                    See Location
                  </Button>
                </div>
              </Flex>
              <Flex
                justify="space-around"
                style={{ alignItems: "center" }}
                className={styles.myCourseContainer}
              >
                <div className={styles.dateWrapper}>
                  <span
                    className={`${styles.dateText} font-bold common-header`}
                  >
                    20
                  </span>
                  <span className="font-default font-bold text-uppercase">
                    Nov
                  </span>
                </div>
                <Flex vertical>
                  <div
                    className={`${styles.courseTitle} text-uppercase font-bold`}
                  >
                    leadership and business management
                  </div>
                  <div className={`${styles.courseSubTitle} font-bold`}>
                    International Leadership
                  </div>
                </Flex>
                <div className={`${styles.courseSubTitle}`}>
                  Dubai, UAE | Nov 20, 2023
                </div>
                <div>
                  <Button type="link" className={styles.locationBtn}>
                    See Location
                  </Button>
                </div>
              </Flex>
              <Flex
                justify="space-around"
                style={{ alignItems: "center" }}
                className={styles.myCourseContainer}
              >
                <div className={styles.dateWrapper}>
                  <span
                    className={`${styles.dateText} font-bold common-header`}
                  >
                    20
                  </span>
                  <span className="font-default font-bold text-uppercase">
                    Nov
                  </span>
                </div>
                <Flex vertical>
                  <div
                    className={`${styles.courseTitle} text-uppercase font-bold`}
                  >
                    leadership and business management
                  </div>
                  <div className={`${styles.courseSubTitle} font-bold`}>
                    International Leadership
                  </div>
                </Flex>
                <div className={`${styles.courseSubTitle}`}>
                  Dubai, UAE | Nov 20, 2023
                </div>
                <div>
                  <Button type="link" className={styles.locationBtn}>
                    See Location
                  </Button>
                </div>
              </Flex>
            </Flex>
          </div>
          <div style={{ padding: "1.5rem 0" }}>
            <Flex>
              <Collapse
                className="mycourses"
                defaultActiveKey={["1"]}
                ghost
                items={items}
                expandIconPosition="end"
              />
            </Flex>
          </div>

          <p className="sub-header font-bol">
            Uh oh! Looks like you have not enrolled in any of the courses yet.
          </p>
          <Button type="primary" style={{ margin: "3rem 0" }}>
            Explore Courses
          </Button>
        </Flex>
        <Divider className={styles.divider} />

        <div className="common-header font-bold">Trending Topics</div>
        <GridCard courses={[]}/>
      </div>
    </div>
  );
}
