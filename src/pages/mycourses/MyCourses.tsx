import {
  Button,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Space,
  Spin,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GridCard from "../../components/GridCard/GridCard";
import useFetch from "../../hooks/useFetch";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Course } from "../../models/Course";
import { VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
import { getTrendingCourses } from "../../services/courseApi";
import { getVerticals } from "../../services/verticalsApi";
import styles from "./MyCourses.module.scss";
import Exception from "../../utils/Exception/Exception";
import { Status } from "../../models/ExceptionProps";
import { STATUS } from "../../constants/messages.constants";

export default function MyCourses() {
  const pageRef = useRef<number>(1);
  const dispatch = useDispatch();
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getTrendingCourses);
  const [courses, setCourses] = useState<Course[]>([]);

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

  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  useEffect(() => {
    const getData = async () => {
      await coursesFetch(pageRef.current);
    };
    getData();
  }, [coursesFetch]);

  useEffect(() => {
    if (courseData?.content) {
      pageRef.current === 1
        ? setCourses(courseData?.content ?? [])
        : setCourses((courses) => [...courses, ...(courseData?.content ?? [])]);
    }
  }, [courseData, courseData?.content]);

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    coursesFetch(pageRef.current);
  };

  const getLoadMoreButton = () => {
    return (
      pageRef.current < courseData?.totalPages && (
        <Button style={{ margin: "auto" }} onClick={() => loadMoreData()}>
          Load More
        </Button>
      )
    );
  };

  const getCoursesList = () => {
    return (
      <>
        <GridCard courses={courses} />
        {isCoursesLoading ? (
          <Flex
            style={{ padding: "3rem 0" }}
            align="center"
            justify="center"
            className="w-100"
          >
            <Spin size="large" />
          </Flex>
        ) : (
          getLoadMoreButton()
        )}
      </>
    );
  };

  const getCoursesRenderer = () => {
    if (isCoursesLoading && pageRef.current === 1) {
      return (
        <Space style={{ padding: "3rem 0" }}>
          <Spin size="large" />
        </Space>
      );
    }
    if (isCoursesError) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
      );
    }

    if (courses?.length == 0) {
      return (
        <Exception
          status={Status.NOT_FOUND}
          subTitle={STATUS.NOT_FOUND}
          className={styles.exploreCoursesException}
        />
      );
    }

    return getCoursesList();
  };

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
        {getCoursesRenderer()}
      </div>
    </div>
  );
}
