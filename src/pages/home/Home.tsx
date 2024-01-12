import { Carousel, Col, Flex, Image, Layout, Row } from "antd";

import Explore from "../../components/HomePage/Explore/Explore";
import styles from "./Home.module.scss";
import CoursesList from "../../components/HomePage/Courses/CoursesList";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { LeftCurve } from "../../utils/svgs/LeftCurve";
import { RightCurve } from "../../utils/svgs/RightCurve";
import { useNavigate } from "react-router-dom";

function Home() {
  const breakPoint = useBreakPoint();
  const navigate = useNavigate();

  const getLargeCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 520;
    }
    if (breakPoint?.lg) {
      return 440;
    }
    if (breakPoint?.md) {
      return 330;
    }
    return 200;
  };

  const getMediumCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 300;
    }
    if (breakPoint?.lg) {
      return 250;
    }
    if (breakPoint?.md) {
      return 170;
    }
    return 130;
  };

  const getSmallCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 210;
    }
    if (breakPoint?.lg) {
      return 180;
    }
    if (breakPoint?.md) {
      return 155;
    }
    return 130;
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
                <span className="color-primary"> curated skill courses </span>
                based on your work needs and Scale up compared to your peers.
              </p>
              <RightCurve />
            </div>
            <div className={styles.mainCardWrapper}>
              <Row>
                <Col span={breakPoint?.md ? 18 : 24}>
                  <div>
                    <Carousel effect="fade">
                      <div
                        className="course-card large-card"
                        onClick={() => navigate("/courses/123")}
                        role="button"
                        onKeyDown={() => {}}
                      >
                        <Image
                          height={getLargeCardHeight()}
                          width={"100%"}
                          src="https://s3-alpha-sig.figma.com/img/c8c1/4bea/d0f0723266c0a364981ccf971f7c3c9c?Expires=1702252800&Signature=FLPaUjmBZxRIMKgVOXBfkGNNvBAj9X4a~P1t0cZWBswGemAxGn7je39ntVXiVI~4a7h5Bc5fggc0a8K2-VhAR0SZKdh~ktTEjIyoV82OoGm7hX0H1geiUSF3mVDHqUNapPVeEWMnZa1IyLpotEWMUH1nj8VknsJZKlhXVaBbAnuyf0pnvXyUo5GUBwx1FHUj8TtHjRfvb10YmnVsXIc-X1tTjER0tVytcFGeWwWBXxlq2Y-L7bf7F1480~4dIuME2PQg6rC2IdWEoKvS7CN33PGF-9GTVy7inF8dLY3Folen6Nqgx1L6vCca43H~eHVlqY~2DZ-om8MNfstMq8Vl6Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                          fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                        <div className="card-overlay-wrapper h-100">
                          <Flex
                            vertical
                            style={{
                              padding: breakPoint?.md
                                ? "3.5rem"
                                : "2.5rem 1.5rem",
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
                                Trending in{" "}
                              </span>
                              <span> courses</span>
                            </div>
                            <span className="card-primary-title">
                              TECHNOLOGY AND AI
                            </span>
                            <button className="button primary-button text-uppercase">
                              Explore Now
                            </button>
                          </Flex>
                        </div>
                      </div>
                      <div
                        className="course-card large-card"
                        onClick={() => navigate("/courses/123")}
                        role="button"
                        onKeyDown={() => {}}
                      >
                        <Image
                          height={getLargeCardHeight()}
                          width={"100%"}
                          src="https://s3-alpha-sig.figma.com/img/e954/683e/0689f3012a24a815bbfb9046d19eb63d?Expires=1702252800&Signature=pROpWE71ELLNXQddC7z277xXUVeLqPv9-xoBv3Qke8Vxa-QF5VICuLlgB6qPdg~WEJPkG9MRz2bT8u0AbJyLfiAWWPr4mOnSlnHE~RbwlSZRU6Yh3LVy9KBwow-tkadLtiVsM75hvGFqrb96G-58stvKnCJXSABsHEtGLSpufiGehdP6MPMmjC~w3zZGDhGaPB-gBIybTe3lWVkYTHQwMUlxOaQyKgts0f0P7Uta5k59C7D4dSEjjl0Q2puKipY7JaGF7YQMS0eW1CvySkGnvMWV-Usti6H5MUg6p4HbqN6TeWrdrND2yPqbHgwNSD-VncU-V3TsamttSIpUPa6CQg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                          fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                      </div>
                      <div className="course-card large-card">
                        <Image
                          height={getLargeCardHeight()}
                          width={"100%"}
                          src="https://s3-alpha-sig.figma.com/img/3aad/9e48/d040e2bdcfd23a58b785abb88960eb10?Expires=1702252800&Signature=h-EFBEMpW0WqkT3yfiQZQbqK97~qlCV2oWt24pnm0FlUiCFnPFOszVzBIWr8dmQnWvhwjt0jv7cq5za5k4insvzEJIDfZ2akPmkr1g~ws-pp19X0NNIvhWubi4mNxOAyuA5B17hW3ViZhUc6fgL2ex8SDJFK~12YFvhD760KJtJSRkqbIb1SupG1XiHZA5GvKRNkIBlgu6Z3D~8PO8zwRhYAQMowBB5Oj62F0biWHGIqr0c~UOsNyNLFJz88O5XWR3NbtsDvN3j73~7MjTNQZGt5ycsK0JnWz3kW~aHEYY8RUxfdSvl~uCiyOvh6JRP3XURfzPP7LNPTDAoIda-KRw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                          fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                      </div>
                    </Carousel>
                  </div>
                </Col>
                <Col span={breakPoint?.md ? 6 : 24}>
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
                      style={{ flexGrow: 1 }}
                    >
                      <Image
                        height={getMediumCardHeight()}
                        width={"100%"}
                        src="https://s3-alpha-sig.figma.com/img/e954/683e/0689f3012a24a815bbfb9046d19eb63d?Expires=1702252800&Signature=pROpWE71ELLNXQddC7z277xXUVeLqPv9-xoBv3Qke8Vxa-QF5VICuLlgB6qPdg~WEJPkG9MRz2bT8u0AbJyLfiAWWPr4mOnSlnHE~RbwlSZRU6Yh3LVy9KBwow-tkadLtiVsM75hvGFqrb96G-58stvKnCJXSABsHEtGLSpufiGehdP6MPMmjC~w3zZGDhGaPB-gBIybTe3lWVkYTHQwMUlxOaQyKgts0f0P7Uta5k59C7D4dSEjjl0Q2puKipY7JaGF7YQMS0eW1CvySkGnvMWV-Usti6H5MUg6p4HbqN6TeWrdrND2yPqbHgwNSD-VncU-V3TsamttSIpUPa6CQg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
                              Leadership and Business Management
                            </span>
                            <span className="sub-header font-bold">
                              International Leadership
                            </span>
                          </Flex>
                        </Flex>
                      </div>
                    </div>
                    <div
                      className="course-card small-card"
                      onClick={() => navigate("/courses/123")}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      <Image
                        height={getSmallCardHeight()}
                        width={"100%"}
                        src="https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
                              Leadership and Business Management
                            </span>
                            <span className="sub-header font-bold">
                              International Leadership
                            </span>
                          </Flex>
                        </Flex>
                      </div>
                    </div>
                  </Flex>
                </Col>
              </Row>
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
