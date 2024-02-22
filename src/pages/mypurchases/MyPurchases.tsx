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

export default function MyPurchases() {
  const breakPoints = useBreakPoint();
  const dispatch = useDispatch();
  const pageRef = useRef<number>(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getTrendingCourses);

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
    <div className={styles.myPurchasesWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"4.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Purchases</div>
          <Flex vertical gap={"1.5rem"}>
            <Flex gap={"1.5rem"}>
              <Image
                style={{ borderRadius: "10px" }}
                width={breakPoints?.md ? 132 : 64}
                height={breakPoints?.md ? 132 : 64}
                preview={false}
                src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
              />
              <Flex
                vertical
                style={{ flex: 1, justifyContent: "space-evenly" }}
              >
                <div className="font-sm text-uppercase">
                  leadership and business management
                </div>
                <div className="font-default font-bold">
                  International Leadership
                </div>
                <div>
                  <span className="font-sm" style={{ paddingRight: "10px" }}>
                    Qty: 10
                  </span>
                  <span className="font-sm">Price: $400</span>
                </div>
                <div className="font-sm">Dubai, UAE | Oct 7, 2023</div>
              </Flex>
            </Flex>
            <Flex gap={"1.5rem"}>
              <Image
                style={{ borderRadius: "10px" }}
                width={breakPoints?.md ? 132 : 64}
                height={breakPoints?.md ? 132 : 64}
                preview={false}
                src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
              />
              <Flex
                vertical
                style={{ flex: 1, justifyContent: "space-evenly" }}
              >
                <div className="font-sm text-uppercase">
                  leadership and business management
                </div>
                <div className="font-default font-bold">
                  International Leadership
                </div>
                <div>
                  <span className="font-sm" style={{ paddingRight: "10px" }}>
                    Qty: 10
                  </span>
                  <span className="font-sm">Price: $400</span>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Trending Topics</div>
        {getCoursesRenderer()}
      </div>
    </div>
  );
}
