import {
  Button,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Image,
  Rate,
} from "antd";
import styles from "./MyCourses.module.scss";
import { useBreakPoint } from "../../hooks/useBreakPoint";

export default function MyCourses() {
  const courses = [
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/70f0/1df2/ddff25983b73d4379d1b71cdc76a3303?Expires=1702252800&Signature=QBVG9eVOWG~EMIeLYAGuuqUGfEKq838CZQyWfaUpaI3peMAtrtUVDc23cgi0xgGobYp7CK1IP05vQ3iZ7L81yq~TDtIxPRWldc5ojygQjMeo2oJQ9yRyEy9l-iS~s-O1vQY9QtfSVAv4isjzncApDS~LLiJbpfLI4dlQk-aLnH3YJwLLPzOjYLOjFqvsWhs7ZxB~d0O-HzZCXzrlREZ8vf8U7rMRcKBgkFvuOfEr9iV9aQeVcO4hKEo-1viuRbMwnbxiu7nux8q4ULf3dKLGGPEfwqzulZH1pFxg6ujPoHSsbVy7M55NcTJz1NQv7PLJsqJHNHFf9kypLNAU3GhZ8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/70f0/1df2/ddff25983b73d4379d1b71cdc76a3303?Expires=1702252800&Signature=QBVG9eVOWG~EMIeLYAGuuqUGfEKq838CZQyWfaUpaI3peMAtrtUVDc23cgi0xgGobYp7CK1IP05vQ3iZ7L81yq~TDtIxPRWldc5ojygQjMeo2oJQ9yRyEy9l-iS~s-O1vQY9QtfSVAv4isjzncApDS~LLiJbpfLI4dlQk-aLnH3YJwLLPzOjYLOjFqvsWhs7ZxB~d0O-HzZCXzrlREZ8vf8U7rMRcKBgkFvuOfEr9iV9aQeVcO4hKEo-1viuRbMwnbxiu7nux8q4ULf3dKLGGPEfwqzulZH1pFxg6ujPoHSsbVy7M55NcTJz1NQv7PLJsqJHNHFf9kypLNAU3GhZ8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  ];
  const breakPoints = useBreakPoint();

  const getSmallCardHeight = (): number => {
    if (breakPoints?.xl) {
      return 300;
    }
    if (breakPoints?.lg) {
      return 270;
    }
    if (breakPoints?.md) {
      return 240;
    }
    if (breakPoints?.sm) {
      return 210;
    }
    return 130;
  };

  const getLargeCardHeight = (): number => {
    if (breakPoints?.xl) {
      return 500;
    }
    if (breakPoints?.lg) {
      return 450;
    }
    if (breakPoints?.md) {
      return 400;
    }
    if (breakPoints?.sm) {
      return 350;
    }
    return 220;
  };

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
        <Flex vertical style={{ alignItems: "center" }} gap={"1.5rem"}>
          <div className="main-header font-bold">My Courses</div>

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
            <Collapse
              className="mycourses"
              defaultActiveKey={["1"]}
              ghost
              items={items}
              expandIconPosition="end"
            />
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
        <Flex
          gap={"2rem"}
          style={{ margin: "2.5rem 0", maxWidth: "100%", flexFlow: "row wrap" }}
        >
          {courses.map((course, index) => (
            <div
              className={`course-card small-card ${styles.exploreCard}`}
              key={index}
            >
              <Image
                height={getSmallCardHeight()}
                width={getSmallCardHeight()}
                src={course}
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
                    <span className="card-chip font-bold">New Topic</span>
                    <span className="card-chip font-bold">Trending</span>
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
              height={getLargeCardHeight()}
              width={"100%"}
              src="https://s3-alpha-sig.figma.com/img/e954/683e/0689f3012a24a815bbfb9046d19eb63d?Expires=1704672000&Signature=NwHKXHf4a~ZUvk2HY4xDMsfs5w6m67l72UlZf1DZaDF7k173mRemr6VXO3WWl0r8R4B0PS-Lk7N4XGpN5HQFt0Jdu77-I8Pjtus4gyozyOXjIAI26upH6CxFxyqizoUEX9cGky4h~YOplAD-kgAI~G9f6r-JQuLKhwPBOljQnXVz7iowHr4FacBrsnEVAG0bSALev41WahIePeUjf4t6oAn3c5~npUpe6EozR-1JtnuTySs1mx~dX0to0T1VDynd9iaFqTE48uu3Lknl8MiohK9~cfkKCWsdrZZTrtF0ICYTMvkOtVJvl1ETn3n8~SwT1V1lzaFb-Ktvv3NXE9q4KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-overlay-wrapper h-100" style={{ padding: 0 }}>
              <Flex
                vertical
                className="h-100"
                justify="space-between"
                style={{ padding: "2.5rem" }}
              >
                <Flex gap={".5rem"}>
                  <span className="card-chip font-bold">New Topic</span>
                  <span className="card-chip font-bold">Trending</span>
                </Flex>
                <Flex vertical gap={"1rem"}>
                  <Rate allowHalf disabled defaultValue={4.5} />
                  <div className="sub-header font-bold text-uppercase">
                    FINANCE AND ACCOUNTING
                  </div>
                  <div style={{ fontSize: "2.5rem" }} className="font-bold">
                    Financial Reporting Mastery
                  </div>
                  <p className="sub-header text-ellipsis">
                    Get in the world of cooking with our beginner friendly
                    basics of cooking 101. Join the class...
                  </p>
                  <button className="button primary-button text-uppercase">
                    Register Now
                  </button>
                </Flex>
              </Flex>
            </div>
          </div>
        </div>
        <Flex
          gap={"2rem"}
          style={{ margin: "2.5rem 0", maxWidth: "100%", flexFlow: "row wrap" }}
        >
          {courses.map((course, index) => (
            <div className="course-card small-card" key={index}>
              <Image
                height={getSmallCardHeight()}
                width={getSmallCardHeight()}
                src={course}
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
