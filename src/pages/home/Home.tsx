import { Carousel, Col, Flex, Image, Layout, Row, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoursesList from "../../components/HomePage/Courses/CoursesList";
import Explore from "../../components/HomePage/Explore/Explore";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { VerticalCourse } from "../../models/VerticalCourse";
import { getTrendingCourses } from "../../services/courseApi";
import { LeftCurve } from "../../utils/svgs/LeftCurve";
import { RightCurve } from "../../utils/svgs/RightCurve";
import styles from "./Home.module.scss";

function Home() {
  const breakPoint = useBreakPoint();
  const navigate = useNavigate();
  const {
    data: trendingCourses,
    loading: isLoading,
  }: { data: VerticalCourse[]; loading: boolean } =
    useFetchOnLoad(getTrendingCourses);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const onCarouselChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  const getLargeCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 560;
    }
    if (breakPoint?.lg) {
      return 460;
    }
    if (breakPoint?.md) {
      return 330;
    }
    return 250;
  };

  const getMediumCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 320;
    }
    if (breakPoint?.lg) {
      return 265;
    }
    if (breakPoint?.md) {
      return 170;
    }
    return 145;
  };

  const getSmallCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 230;
    }
    if (breakPoint?.lg) {
      return 187;
    }
    if (breakPoint?.md) {
      return 155;
    }
    return 145;
  };

  return (
    <div>
      <Layout>
        <div className={`${styles.homeContainer} w-100`}>
          <div className={`${styles.titleWrapper} text-center`}>
            <div className={styles.titleContent}>
              <LeftCurve />
              <p className="main-header font-bold">Want to upskill at work?</p>
              <p className={`${styles.subHeader} sub-header font-bold`}>
                Get started with our
                <span className="color-primary">
                  &nbsp;curated skill courses{" "}
                </span>
                based on your work needs and Scale up compared to your peers.
              </p>
              <RightCurve />
            </div>
            <div className={styles.mainCardWrapper}>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <Row>
                  <Col span={breakPoint?.md ? 17 : 24}>
                    <div>
                      <Carousel effect="scrollx" afterChange={onCarouselChange}>
                        {trendingCourses?.map((vertical: VerticalCourse) => (
                          <div
                            key={vertical.slug}
                            className="course-card large-card"
                            onClick={() =>
                              navigate(`/verticals/${vertical.slug}`)
                            }
                            role="button"
                            onKeyDown={() => {}}
                          >
                            <Image
                              height={getLargeCardHeight()}
                              width={"100%"}
                              src={vertical.imageUrl}
                              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                              preview={false}
                            />
                            <div className="card-overlay-wrapper h-100">
                              <Flex
                                vertical
                                style={{
                                  padding: breakPoint?.md
                                    ? "1.5rem"
                                    : "2.5rem 0.5rem",
                                  justifyContent: "flex-end",
                                }}
                                className="h-100"
                              >
                                <div className="text-uppercase sub-header font-bold align-center d-flex">
                                  <Image
                                    src="/images/icons/trending.png"
                                    height={breakPoint?.md ? 36 : 22}
                                    width={breakPoint?.md ? 36 : 22}
                                  />
                                  <span className="color-primary">
                                    Trending in &nbsp;
                                  </span>
                                  <span> verticals</span>
                                </div>
                                <span className="card-primary-title">
                                  {vertical.title}
                                </span>
                                <button className="button primary-button text-uppercase">
                                  Explore Now
                                </button>
                              </Flex>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </Col>
                  <Col span={breakPoint?.md ? 7 : 24}>
                    <Flex
                      vertical={breakPoint?.md}
                      gap={"1rem"}
                      style={{
                        paddingLeft: breakPoint?.md ? "1rem" : 0,
                        paddingTop: breakPoint?.md ? 0 : "1rem",
                      }}
                    >
                      <div
                        className="course-card small-card"
                        style={{ minWidth: "130px" }}
                        onClick={() =>
                          navigate(
                            `/courses/${trendingCourses?.[currentSlide]?.courses[0]?.id}`
                          )
                        }
                      >
                        <Image
                          height={getMediumCardHeight()}
                          width={"100%"}
                          src={
                            trendingCourses
                              ? trendingCourses[currentSlide]?.courses[0]
                                  ?.imageUrl
                              : ""
                          }
                          fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                        <div className="card-overlay-wrapper h-100">
                          <Flex
                            vertical
                            className="h-100"
                            justify="space-between"
                          >
                            <Flex>
                              <span className="card-chip font-bold">
                                New Topic
                              </span>
                            </Flex>
                            <Flex vertical align="baseline">
                              <span className="card-course-title">
                                {trendingCourses?.[currentSlide].slug}
                              </span>
                              <span className="sub-header font-bold">
                                {
                                  trendingCourses?.[currentSlide]?.courses[0]
                                    ?.campaignTemplateCourseName
                                }
                              </span>
                            </Flex>
                          </Flex>
                        </div>
                      </div>
                      <div
                        className="course-card small-card"
                        style={{ flexGrow: 2 }}
                        onClick={() =>
                          navigate(
                            `/courses/${trendingCourses?.[currentSlide]?.courses[1]?.id}`
                          )
                        }
                        role="button"
                        onKeyDown={() => {}}
                      >
                        <Image
                          height={getSmallCardHeight()}
                          width={"100%"}
                          src={
                            trendingCourses
                              ? trendingCourses[currentSlide]?.courses[1]
                                  ?.imageUrl
                              : ""
                          }
                          fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                        <div className="card-overlay-wrapper h-100">
                          <Flex
                            vertical
                            className="h-100"
                            justify="space-between"
                          >
                            <Flex>
                              <span className="card-chip font-bold">
                                New Topic
                              </span>
                            </Flex>
                            <Flex vertical align="baseline">
                              <span className="card-course-title">
                                {trendingCourses?.[currentSlide]?.slug}
                              </span>
                              <span className="sub-header font-bold">
                                {
                                  trendingCourses?.[currentSlide]?.courses[1]
                                    ?.campaignTemplateCourseName
                                }
                              </span>
                            </Flex>
                          </Flex>
                        </div>
                      </div>
                    </Flex>
                  </Col>
                </Row>
              )}
            </div>
          </div>
          <CoursesList />
          <Explore />
        </div>
      </Layout>
    </div>
  );
}

export default Home;
