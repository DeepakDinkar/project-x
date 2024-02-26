import { Button, Divider, Flex, Image, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GridCard from "../../components/GridCard/GridCard";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Course } from "../../models/Course";
import { VerticalData } from "../../models/Vertical";
import { getTrendingCourses } from "../../services/courseApi";
import { getVerticals } from "../../services/verticalsApi";
import styles from "./MyPurchases.module.scss";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
import Exception from "../../utils/Exception/Exception";
import { Status } from "../../models/ExceptionProps";
import { STATUS } from "../../constants/messages.constants";
import { getUserPurchases } from "../../services/userApi";
import dayjs from "dayjs";
import { MyPurchase } from "../../models/MyPurchase";
import { useNavigate } from "react-router-dom";

const COURSE_FALLBACK_URL = import.meta.env.VITE_COURSE_FALLBACK_URL;

export default function MyPurchases() {
  const breakPoints = useBreakPoint();
  const dispatch = useDispatch();
  const pageRef = useRef<number>(1);
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getTrendingCourses);

  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);

  const { data: purchases, loading, error } = useFetchOnLoad(getUserPurchases);

  const getFormattedDate = (date: string) => {
    return dayjs(date).format("MMM D, YYYY");
  };

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

  const getPurchaseList = () => {
    return (
      <Flex vertical gap={"1.5rem"}>
        {purchases?.map((purchase: MyPurchase, index: number) => (
          <Flex gap={"1.5rem"} key={index}>
            <Image
              style={{ borderRadius: "10px" }}
              width={breakPoints?.md ? 132 : 64}
              height={breakPoints?.md ? 132 : 64}
              preview={false}
              fallback={COURSE_FALLBACK_URL}
              src={purchase.imageUrl}
            />
            <Flex vertical style={{ flex: 1, justifyContent: "space-evenly" }}>
              <div className="font-sm text-uppercase">
                leadership and business management
              </div>
              <div className="font-default font-bold">
                {purchase?.coursesName}
              </div>
              <div>
                <span className="font-sm">Price: ${purchase?.courseAmt}</span>
              </div>
              <div className="font-sm">
                {purchase?.location ? purchase.location : "Virtual"}&nbsp; |
                &nbsp;
                {getFormattedDate(purchase?.purchasedDate)}
              </div>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
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
    if (purchases?.length == 0) {
      return (
        <Flex vertical align="center">
          <Flex vertical>
            <p className="sub-header font-bol">
              Uh oh! Looks like you have not purchased courses yet.
            </p>
            <Button type="primary" style={{ margin: "3rem auto" }} onClick={() => navigate('/')}>
              Explore Courses
            </Button>
          </Flex>
        </Flex>
      );
    }
    return getPurchaseList();
  };

  return (
    <div className={styles.myPurchasesWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"4.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Purchases</div>
          {getRender()}
        </Flex>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Trending Topics</div>
        {getCoursesRenderer()}
      </div>
    </div>
  );
}
