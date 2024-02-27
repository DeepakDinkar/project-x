/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Space,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GridCard from "../../components/GridCard/GridCard";
import { STATUS } from "../../constants/messages.constants";
import useFetch from "../../hooks/useFetch";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Course } from "../../models/Course";
import { Status } from "../../models/ExceptionProps";
import { VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
import { getTrendingCourses } from "../../services/courseApi";
import { getUserCourses } from "../../services/userApi";
import { getVerticals } from "../../services/verticalsApi";
import Exception from "../../utils/Exception/Exception";
import {
  filterCurrentCourses,
  filterPreviousCourses,
  filterUpcomingCourses,
} from "../../utils/dateUtils";
import styles from "./MyCourses.module.scss";
import { useTranslation } from "react-i18next";

export default function MyCourses() {
  const pageRef = useRef<number>(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getTrendingCourses);
  const [courses, setCourses] = useState<Course[]>([]);
  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);
  const { data: mycourses, loading, error } = useFetchOnLoad(getUserCourses);

  const currentCourses = useMemo(() => {
    return filterCurrentCourses(mycourses);
  }, [mycourses]);
  const previouseCourses = useMemo(() => {
    return filterPreviousCourses(mycourses);
  }, [mycourses]);
  const upcomingCourses = useMemo(() => {
    return filterUpcomingCourses(mycourses);
  }, [mycourses]);

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

  const getMyCoursesRenderer = (courses: any[]) => {
    return courses?.map((course: any, index: number) => (
      <Flex
        key={index}
        justify="space-around"
        style={{ alignItems: "center" }}
        className={styles.myCourseContainer}
      >
        <div className={styles.dateWrapper}>
          <span className={`${styles.dateText} font-bold common-header`}>
            {dayjs(course?.courseDate).format("DD")}
          </span>
          <span className="font-default font-bold text-uppercase">
            {dayjs(course?.courseDate).format("MMM")}
          </span>
        </div>
        <Flex vertical>
          <div className={`${styles.courseTitle} text-uppercase font-bold`}>
            leadership and business management
          </div>
          <div className={`${styles.courseSubTitle} font-bold`}>
            {course?.coursesName}
          </div>
        </Flex>
        <div className={`${styles.courseSubTitle}`}>
          {course?.location ?? "Virtual"} |{" "}
          {dayjs(course?.courseDate).format("MMM DD, YYYY")}
        </div>
        <div>
          <Button type="link" className={styles.locationBtn}>
            See Location
          </Button>
        </div>
      </Flex>
    ));
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: t('userMyCoursesPage.previousCoursesText'),
      children: (
        <div>
          <Flex vertical gap={"1.5rem"}>
            {getMyCoursesRenderer(previouseCourses)}
          </Flex>
        </div>
      ),
    },
  ];

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    coursesFetch(pageRef.current);
  };

  const getRender = () => {
    if (loading) {
      return (
        <Flex justify="center" align="center" gap={10}>
          <Spin size="large" />
        </Flex>
      );
    }
    if (error) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
      );
    }
    if (mycourses?.length == 0) {
      return (
        <Flex vertical align="center">
          <Flex vertical>
            <p className="sub-header font-bol">
             {t('userMyCoursesPage.noPurchasesFoundText')}
            </p>
            <Button
              type="primary"
              style={{ margin: "3rem auto" }}
              onClick={() => navigate("/")}
            >
             {t('utils.exploreCoursesBtn')}
            </Button>
          </Flex>
        </Flex>
      );
    }
    return getMyCoursesList();
  };

  const getMyCoursesList = () => {
    return (
      <>
        {renderCurrentCourses()}
        {renderUpcomingCourses()}
        {renderPreviousCourses()}
      </>
    );
  };

  const renderCurrentCourses = () => {
    return currentCourses?.length > 0 ? (
      <div>
        <div
          className="font-default text-uppercase font-bold"
          style={{ padding: "1rem 0" }}
        >
         {t('userMyCoursesPage.currentCoursesText')}
        </div>
        <Flex vertical gap={"1.5rem"}>
          {getMyCoursesRenderer(currentCourses)}
        </Flex>
      </div>
    ) : null;
  };

  const renderUpcomingCourses = () => {
    return upcomingCourses?.length > 0 ? (
      <div>
        <div
          className="font-default text-uppercase font-bold"
          style={{ padding: "1rem 0" }}
        >
          {t('userMyCoursesPage.upcomingCoursesText')}
        </div>
        <Flex vertical gap={"1.5rem"}>
          {getMyCoursesRenderer(upcomingCourses)}
        </Flex>
      </div>
    ) : null;
  };

  const renderPreviousCourses = () => {
    return previouseCourses?.length > 0 ? (
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
    ) : null;
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
          <div className="main-header font-bold font-ubuntu">{t('userMyCoursesPage.title')}</div>
          {getRender()}
        </Flex>
        <Divider className={styles.divider} />

        <div className="common-header font-bold">{t('utils.trendingCourses')}</div>
        {getCoursesRenderer()}
      </div>
    </div>
  );
}
