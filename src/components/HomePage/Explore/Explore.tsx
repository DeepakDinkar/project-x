import { Flex, Image, Input, Rate, Select } from "antd";
import styles from "../../../pages/home/Home.module.scss";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";
import { SearchIcon } from "../../../utils/svgs/SearchIcon";

function Explore() {
  const courses = [
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
    return 200;
  };

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} text-center`}
    >
      <div className={styles.titleContent}>
        <LeftCurve />
        <p className="main-header font-bold color-primary">Explore</p>
        <p className={`${styles.subHeader} sub-header font-bold color-white`}>
          Curated for you. Latest and trending <br /> topics to explore!
        </p>
        <RightCurve />
      </div>
      <div className="w-100">
        <div className={`primary-container ${styles.exploreSearchWrapper}`}>
          <Flex
            style={{
              flexFlow: "row wrap",
              justifyContent: "space-between",
              gap: "2.5rem",
            }}
          >
            <Input
              placeholder="Search topics"
              prefix={<SearchIcon />}
              size="middle"
              style={{
                width: "auto",
                flexGrow: 1,
                maxWidth: "380px",
              }}
            />
            <Flex flex={"row wrap"} gap={"1.5rem"}>
              <Select
                placeholder="Categories"
                className="active"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
              <Select
                placeholder="Date"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
              <Select
                placeholder="Location"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Flex>
          </Flex>
        </div>
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
              height={getLargeCardHeight()}
              width={"100%"}
              src="https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1704672000&Signature=P-J9RNatJdCV9iXB27k52BDpHwzsf4n79V0xb-ZwZVH8em4g2~WsiV8TSYtLlPFPAX5HWHlhvh~p7gY6GtQqlltRhdo3-JPyIlBF-9Drb5Wo-fhLXjJwt6go52mL1WrUaxjh77YpKHTgbipXZxsHAotCsUHZj-tWTkdnY-0EhFY52Z0JdN2ghl8RYFPxOKYHrkrsWMN7546-YinlqBeAGYGSo1TOmvT3HkVq34XOIz~kSY8BJSYQRJNcHg0J-TE6X~4h5fGnkgXb2RoryGGb5ofYmVTTg8Hx7966eYxInZJWHvyc8biZSsdlYoLqyZULIcT4zj8k4aKSAKW7RNrmNw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-overlay-wrapper h-100">
              <Flex vertical className="h-100" justify="space-between">
                <Flex>
                  <span className="card-chip font-bold">New Topic</span>
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
