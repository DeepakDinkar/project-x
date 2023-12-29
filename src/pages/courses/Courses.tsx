import { Flex, Image, Input, Select, Tag } from "antd";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import styles from "./Courses.module.scss";
import { SearchIcon } from "../../utils/svgs/SearchIcon";

function Courses() {
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
      className={`${styles.titleWrapper} ${styles.exploreWrapper} search-container`}
    >
      <div className="w-100">
        <div>
          <div
            className={`course-card large-card ${styles.courseBannerContainer}`}
          >
            <Image
              height={breakPoints?.md ? 380 : 180}
              width={"100%"}
              src="https://s3-alpha-sig.figma.com/img/3aad/9e48/d040e2bdcfd23a58b785abb88960eb10?Expires=1704672000&Signature=q4vQ9IqSUxaBCYfa2qeKqnOkuIs263OYsy4X56DFiJEb~8eIH55pZCSgIK0oc9g5kChQZg1BlxrQgae5LHH4i5TUZHBrGbYClSuQQLzfu5PnAgejst9r0yibOrM3zAIakoA0Tr-DBhLimXdf2snform8gHJsUFPaRhOr0KhKxwfevkptBcgfG6Mlx~5XNpQH4g7rGeYrYjo~Zsy-nwTAusotiuXDvxK3YONBixm2PCL7DAG091~h71dJM31w7E6~BV3qnMN1Xkx5gjQ~dvdqDzmm~1kfne64i7HeWQ5S0uFP2CxVELcld8Ddz5bkJPIxvU1NIbKf4KUuoN~pcBzIcg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-overlay-wrapper h-100" style={{ padding: 0 }}>
              <Flex
                vertical
                className="h-100 text-center"
                style={{
                  padding: "1.5rem",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <span className={styles.courseTitle}>
                  Artificial Intelligence
                </span>
                <span className={styles.courseSubTitle}>
                  Choose the latest topics offered curated by our professionals
                </span>
              </Flex>
            </div>
          </div>
        </div>

        <div className={`${styles.exploreSearchWrapper}`}>
          <div className={styles.topicText}>20 Topics available</div>
          <Flex
            vertical
            style={{
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
            <Flex gap={"1.5rem"} style={{ flexFlow: "row wrap" }}>
              <Select
                placeholder="Sort By"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
              <Select
                placeholder="Filter by Dates"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
              <Select
                placeholder="Filter by Delivery Modes"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
              <Select
                placeholder="Filter by Knowledge Area"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
              <Select
                placeholder="Filter by Location"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Flex>
            <Flex gap={"1.5rem"} style={{ flexFlow: "row wrap" }}>
              <Tag closeIcon>Next Week</Tag>
              <Tag closeIcon>Dubai</Tag>
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
        <div>
          <div className="course-card large-card">
            <Image
              height={getLargeCardHeight()}
              width={"100%"}
              src="https://s3-alpha-sig.figma.com/img/68b2/bf5d/cf8f6597a2d3d8ecde08aca46bd7302b?Expires=1702252800&Signature=R7SBA~eLFb9enUPeb0w9g9ZsmyLTmB5YTZP3o5zAVOQ1GweVtoaoo4Gf2e-SbHs4J6hTfIQL6Ue4ZLeTKkVhHkp3HsrtdJU~AnGfBWyzIyFFLpKRZeUdwMxeiisEnashOZy0hWIi9nb9yuIdcnFsHb~axG4mQXaphLtdseYVGFJO~2VwjGkUIUzRS7RBnBxQKYxpfwptbxnMs~QGqfEfALCFy98m0bupRdp-yvXkMVGWTlsfzaYoNZIuwbMfMv-3j9xfakovRXJOOhzdd-1OU0gmJqfPjOrVyW2KeGIrxoVQggNb~W3-eBaqocTqi7ljgCNCM1PDk4K-2rwvO4WW~w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-overlay-wrapper h-100" style={{ padding: 0 }}>
              <Flex
                vertical
                className="h-100"
                justify="space-between"
                style={{ padding: "1.5rem" }}
              >
                <Flex>
                  <span className="card-chip font-bold">New Topic</span>
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

export default Courses;
