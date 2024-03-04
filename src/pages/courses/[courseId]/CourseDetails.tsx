/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Divider, Flex, Image, Rate, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import GridCard from "../../../components/GridCard/GridCard";
import { STATUS } from "../../../constants/messages.constants";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import useFetch from "../../../hooks/useFetch";
import useFetchOnLoad from "../../../hooks/useFetchOnLoad";
import { Course } from "../../../models/Course";
import { Status } from "../../../models/ExceptionProps";
import { VerticalData } from "../../../models/Vertical";
import { setVerticals } from "../../../redux/reducers/verticalsReducer";
import {
  getCourseByCourseId,
  getSimilarCourses,
} from "../../../services/courseApi";
import { getVerticals } from "../../../services/verticalsApi";
import Exception from "../../../utils/Exception/Exception";
import { isDatePassed30Days } from "../../../utils/commonUtils";
import styles from "./CourseDetails.module.scss";
import useCart from "../../../hooks/useCart";

export default function CourseDetails() {
  const breakPoints = useBreakPoint();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const pageRef = useRef<number>(1);
  const { addItemsToCart, loading } = useCart();

  const [courses, setCourses] = useState<Course[]>([]);
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getSimilarCourses);

  const {
    data: courseDetails,
    loading: isLoading,
    error: isCourseDetailsError,
    fetch,
  } = useFetch(getCourseByCourseId);
  const locationRef = useRef(0);
  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);

  const slug = courseDetails?.slug ?? "";

  useEffect(() => {
    const getData = async () => {
      await fetch(courseId);
    };
    getData();
  }, [courseId, fetch]);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  useEffect(() => {
    const getData = async () => {
      await coursesFetch(slug, pageRef.current);
    };

    slug && getData();
  }, [coursesFetch, slug]);

  useEffect(() => {
    if (courseData?.content) {
      pageRef.current === 1
        ? setCourses(courseData?.content ?? [])
        : setCourses((courses) => [...courses, ...(courseData?.content ?? [])]);
    }
  }, [courseData, courseData?.content]);

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    coursesFetch(slug, pageRef.current);
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
        <Flex style={{ padding: "3rem 0" }} justify="center">
          <Spin size="large" />
        </Flex>
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

  const addCourseToCart = () => {
    const details = { ...courseDetails };
    details.locationIndex = locationRef.current;
    // dispatch(addToCart(details));
    addItemsToCart(details);
  };

  const onSelectionChange = (locationIndex: number) => {
    locationRef.current = locationIndex;
  };

  const getFormattedDate = (date: string) => {
    return dayjs(date).format("MMM D, YYYY");
  };

  const getRenderer = () => {
    if (isLoading) {
      return (
        <Flex style={{ padding: "3rem 0" }} justify="center">
          <Spin size="large" />
        </Flex>
      );
    }
    if (isCourseDetailsError) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
      );
    }

    const getLocationOptions = () => {
      if (courseDetails?.location) {
        return courseDetails?.location.map((loc: any, index: number) => {
          return {
            value: index,
            label: (
              <Flex className={styles.dropdown} key={index}>
                {loc?.locationName ? loc?.locationName + " | " : ""}{" "}
                {getFormattedDate(loc?.date)}
                <Flex
                  className={loc?.locationName ? styles.face2face : styles.live}
                >
                  <Badge color={loc?.locationName ? "purple" : "green"} />
                  {loc?.locationName ? "Live Virtual Training" : "Face 2 Face"}
                </Flex>
              </Flex>
            ),
          };
        });
      }
      return [];
    };

    const getSelectLocationContent = () => {
      if (courseDetails?.location && courseDetails?.location?.length > 0) {
        return (
          <>
            <span className="font-bold sub-header">Select Location & Date</span>
            <Select
              defaultValue={courseDetails?.location ? 0 : undefined}
              placeholder="Choose Location & Date"
              options={getLocationOptions()}
              onChange={(value) => onSelectionChange(value)}
            />
          </>
        );
      } else {
        return (
          <span className="font-bold sub-header">No Locations Available</span>
        );
      }
    };

    const getMentorInformation = () => {
      const mentor = courseDetails?.trainer ? courseDetails?.trainer[0] : null;

      return (
        mentor && (
          <div style={{ marginTop: "1.5rem" }}>
            <Flex className={styles.mentorCard} gap={"2rem"}>
              <div className={styles.mentorImageWrapper}>
                <Image
                  src="/images/about-us/pexels-tony-jamesandersson-1674752-removebg-preview1.png"
                  height={breakPoints?.md ? 250 : 100}
                  width={breakPoints?.md ? 250 : 100}
                  preview={false}
                />
                <div className={styles.mentorCardCircle}></div>
              </div>
              <Flex
                vertical
                className="font-bold"
                style={{ justifyContent: "center" }}
                gap={"1rem"}
              >
                <span className="font-default text-uppercase">Trainer</span>
                <span className="sub-header">{mentor?.trainerName}</span>
                <span className="sub-header">{mentor?.phoneNumber}</span>
                <span className="sub-header">{mentor?.email}</span>
                <Button className="outline-btn">Reach Out</Button>
              </Flex>
            </Flex>
          </div>
        )
      );
    };

    return (
      <div className="w-100">
        <div>
          <Flex vertical={!breakPoints?.md} gap={"2.5rem"}>
            <div
              className={`course-card small-card ${styles.exploreCard} h-100`}
              style={{ width: "fit-content" }}
            >
              <Image
                className={styles.courseDetailImage}
                src={courseDetails?.imageUrl}
                fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div
                className="card-overlay-wrapper h-100"
                style={{ padding: 0 }}
              >
                <Flex
                  vertical
                  className="h-100"
                  justify="space-between"
                  style={{ padding: "1.5rem" }}
                >
                  <Flex gap={".5rem"}>
                    {isDatePassed30Days(courseDetails?.courseAddedDate) && (
                      <span className="card-chip font-bold">New Course</span>
                    )}

                    {courseDetails?.isTrending && (
                      <span className="card-chip font-bold">Trending</span>
                    )}
                  </Flex>
                </Flex>
              </div>
            </div>
            <Flex vertical gap={"1rem"}>
              <Rate allowHalf disabled defaultValue={4.5} />
              <div className="sub-header font-bold text-uppercase">
                {courseDetails?.slug}
              </div>
              <div style={{ fontSize: "2.5rem" }} className="font-bold">
                {courseDetails?.campaignTemplateCourseName}
              </div>
              <p className="sub-header">{courseDetails?.courseContent}</p>
            </Flex>
          </Flex>
          <Flex
            style={{
              flexFlow: "row wrap",
              width: "100%",
              alignItems: "center",
              padding: "3.5rem 0",
            }}
            justify={breakPoints?.md ? "start" : "center"}
            gap={"1.5rem"}
          >
            {getSelectLocationContent()}
          </Flex>
          <Flex
            justify={breakPoints?.md ? "end" : "center"}
            style={{
              paddingBottom: "2rem",
              flexFlow: breakPoints?.md ? "row nowrap" : "row wrap",
            }}
            gap={"1rem"}
          >
            <Button
              type="primary"
              className="text-uppercase"
              onClick={() => addCourseToCart()}
              disabled={courseDetails?.location?.length == 0}
              loading={loading}
            >
              Add to cart
            </Button>
            <Button type="text" className="text-uppercase">
              DOWNLOAD BROCHURE
            </Button>
          </Flex>
        </div>
        <Divider className={styles.divider} />
        <div>
          <Flex
            vertical={!breakPoints?.lg}
            gap={"3rem"}
            style={{ padding: "2rem 0" }}
          >
            <Flex vertical gap={"1.5rem"} flex={1}>
              <div className="common-header font-bold">Accredited by</div>
              <Flex vertical gap={"1rem"}>
                <Image
                  height={breakPoints?.md ? 60 : 30}
                  width={breakPoints?.md ? 195 : 110}
                  style={{ padding: ".5rem 0" }}
                  src="https://s3-alpha-sig.figma.com/img/f2e2/47f3/e7ec3a77e2b669846e2d582131f3f8de?Expires=1704672000&Signature=mSysxUFo0LrgJWZhwBsf3W6OoWbLJ5WKVIl0BZAEA3uFG-o45W6naQ1c7kGvdHCcUlsmH0ShJQkyaMdNecKSbnKT~1WKa6U6iBU7X0q59Bq0c-pJ5RYbsl8Rwlk4jZOZJ701Me6PJqJ2SOAU3xObwuK~MJ8llkPd3GCziBHxUUEmaW8XjipVJAXUFO5oGFtmxqCvcfVUbUixJtJzUqOqdr1h7g5M6XGsxPhFP71h5UEdwvNjyJubB0sWiCINzS19cLw8eFAwe3x7oay9r-kUVe0uVQlRutq5~JOpoE4JS02ckZ8EKeI3dKx1g-q58VSmhs0o-6LFn9oQQlkhp4ob9Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                  preview={false}
                />
                <div className="sub-header font-bold">
                  World Commerce And Contracting Association
                </div>
                <p className="font-default">
                  World Commerce & Contracting is an association dedicated to
                  helping our members from all around the world, achieve high
                  performing and trusted trading relationships. We are committed
                  to researching, advocating, improving capabilities and helping
                  our members to connect to share knowledge and leading
                  practice. We address the growing need across all private and
                  public organizations for everyone to be able to prepare,
                  understand and manage contracts, and be skilled at managing
                  commercial relationships. Get ready to embrace change and
                  innovation.
                </p>
                {getMentorInformation()}
              </Flex>
            </Flex>
            <Flex vertical flex={1} gap={"1.5rem"}>
              <div className="common-header font-bold">Key Take Aways</div>
              <Flex vertical gap={".5rem"}>
                {courseDetails?.keyTakeAway.map(
                  (key: string, index: number) => (
                    <Flex
                      key={key}
                      style={{ alignItems: "center" }}
                      gap={"1rem"}
                    >
                      <span
                        className="color-primary font-bold main-header"
                        style={{ minWidth: "25px" }}
                      >
                        {index + 1}
                      </span>
                      <span className="sub-header font-bold">{key}</span>
                    </Flex>
                  )
                )}
              </Flex>
            </Flex>
          </Flex>
        </div>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Similar Topics</div>
        {getCoursesRenderer()}
      </div>
    );
  };

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} search-container`}
    >
      {getRenderer()}
    </div>
  );
}
