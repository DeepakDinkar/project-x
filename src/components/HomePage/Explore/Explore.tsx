import { Flex, Image } from "antd";
import styles from "../../../pages/home/Home.module.scss";
import { useBreakPoint } from "../../../hooks/useBreakPoint";

function Explore() {
  const courses = [...new Array(3)];
  const breakPoints = useBreakPoint();

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} text-center`}
    >
      <p className="main-header font-bold color-primary">Explore</p>
      <p className={`${styles.subHeader} sub-header font-bold color-white`}>
        Curated for you. Latest and trending <br /> topics to explore!
      </p>
      <div className="w-100">
        <Flex
          gap={breakPoints?.md ? "4rem" : "2rem"}
          style={{ margin: "2.5rem 0", maxWidth: "100%", flexFlow: 'row wrap' }}
        >
          {courses.map((_course, index) => (
            <div className="course-card small-card" key={index}>
              <Image
                height={breakPoints?.md ? 380 : 160}
                width={breakPoints?.md ? 380 : 160}
                src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div className="card-overlay-wrapper h-100">
                <Flex vertical className="h-100" justify="space-between">
                  <Flex>
                    <span className="card-chip font-bold">New Topic</span>
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
          ))}
        </Flex>
        <div>
          <div className="course-card large-card">
            <Image
              height={breakPoints?.md ? 650 : 350}
              width={"100%"}
              src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
          </div>
        </div>
        <Flex
          gap={breakPoints?.md ? "4rem" : "2rem"}
          style={{ margin: "2.5rem 0", maxWidth: "100%", flexFlow: 'row wrap' }}
        >
          {courses.map((_course, index) => (
            <div className="course-card small-card" key={index}>
              <Image
                height={breakPoints?.md ? 380 : 160}
                width={breakPoints?.md ? 380 : 160}
                src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div className="card-overlay-wrapper h-100">
                <Flex vertical className="h-100" justify="space-between">
                  <Flex>
                    <span className="card-chip font-bold">New Topic</span>
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
          ))}
        </Flex>
      </div>
    </div>
  );
}

export default Explore;
