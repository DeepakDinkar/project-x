import { Carousel, Col, Flex, Image, Layout, Row } from "antd";

import Explore from "../../components/HomePage/Explore/Explore";
import styles from "./Home.module.scss";
import CoursesList from "../../components/HomePage/Courses/CoursesList";
import { useBreakPoint } from "../../hooks/useBreakPoint";

function Home() {
  const breakPoint = useBreakPoint();

  return (
    <div>
      <Layout>
        <div className={`${styles.homeContainer} w-100`}>
          <div className={`${styles.titleWrapper} text-center`}>
            <p className="main-header font-bold">Want to upskill at work?</p>
            <p className={`${styles.subHeader} sub-header font-bold`}>
              Get started with our
              <span className="color-primary"> curated skill courses </span>
              based on your <br /> work needs and Scale up compared to your
              peers.
            </p>
            <div className={styles.mainCardWrapper}>
              <Row>
                <Col span={breakPoint?.md ? 18 : 24}>
                  <div>
                    <Carousel effect="fade">
                      <div className="course-card large-card">
                        <Image
                          height={breakPoint?.md ? 550 : 270}
                          width={"100%"}
                          src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                      </div>
                      <div className="course-card large-card">
                        <Image
                          height={breakPoint?.md ? 550 : 270}
                          width={"100%"}
                          src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                          preview={false}
                        />
                      </div>
                      <div className="course-card large-card">
                        <Image
                          height={breakPoint?.md ? 550 : 270}
                          width={"100%"}
                          src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
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
                    style={{ paddingLeft: "1rem" }}
                  >
                    <div className="course-card small-card">
                      <Image
                        height={330}
                        width={"100%"}
                        src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
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
                    <div className="course-card small-card">
                      <Image
                        height={205}
                        width={"100%"}
                        src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
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
