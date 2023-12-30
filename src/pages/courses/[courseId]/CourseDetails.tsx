import { Button, Divider, Flex, Image, Rate, Select } from "antd";
import styles from "./CourseDetails.module.scss";
import { useBreakPoint } from "../../../hooks/useBreakPoint";

export default function CourseDetails() {
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

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} search-container`}
    >
      <div className="w-100">
        <div>
          <Flex vertical={!breakPoints?.md} gap={"2.5rem"}>
            <div
              className={`course-card small-card ${styles.exploreCard}`}
              style={{ width: "fit-content" }}
            >
              <Image
                height={getSmallCardHeight()}
                width={getSmallCardHeight()}
                src="https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1704672000&Signature=P-J9RNatJdCV9iXB27k52BDpHwzsf4n79V0xb-ZwZVH8em4g2~WsiV8TSYtLlPFPAX5HWHlhvh~p7gY6GtQqlltRhdo3-JPyIlBF-9Drb5Wo-fhLXjJwt6go52mL1WrUaxjh77YpKHTgbipXZxsHAotCsUHZj-tWTkdnY-0EhFY52Z0JdN2ghl8RYFPxOKYHrkrsWMN7546-YinlqBeAGYGSo1TOmvT3HkVq34XOIz~kSY8BJSYQRJNcHg0J-TE6X~4h5fGnkgXb2RoryGGb5ofYmVTTg8Hx7966eYxInZJWHvyc8biZSsdlYoLqyZULIcT4zj8k4aKSAKW7RNrmNw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
                </Flex>
              </div>
            </div>
            <Flex vertical gap={"1rem"}>
              <Rate allowHalf disabled defaultValue={4.5} />
              <div className="sub-header font-bold text-uppercase">
                Procurement and Contracting
              </div>
              <div style={{ fontSize: "2.5rem" }} className="font-bold">
                Advanced Negotiations Mastery
              </div>
              <p className="sub-header">
                People enter Contract and Commercial Management discipline from
                a wide variety of backgrounds, often with little or no specific
                training. They may be financial or legal professionals, they may
                have come from sales or from a market intelligence function. A
                key value offered is that the World CC learning provides
                everyone with a consistent base level of knowledge.
              </p>
            </Flex>
          </Flex>
          <Flex
            style={{
              flex: "row wrap",
              alignItems: "center",
              padding: "3.5rem 0",
            }}
            gap={"1.5rem"}
          >
            <span className="font-bold sub-header">Select Location & Date</span>
            <Select
              placeholder="Dubai, UAE | Nov 19 - 23, 2023"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </Flex>
          <Flex justify="end" style={{ paddingBottom: "2rem" }} gap={"1rem"}>
            <Button type="primary" className="text-uppercase">
              Add to cart
            </Button>
            <Button type="text" className="text-uppercase">
              DOWNLOAD BROCHURE
            </Button>
          </Flex>
          <div>
            <Flex className={styles.mentorCard} gap={"2rem"}>
              <div className={styles.mentorImageWrapper}>
                <Image
                  src="/images/about-us/pexels-tony-jamesandersson-1674752-removebg-preview1.png"
                  height={breakPoints?.md ? 250 : 100}
                  width={breakPoints?.md ? 250 : 100}
                />
                <div className={styles.mentorCardCircle}></div>
              </div>
              <Flex vertical className="font-bold" style={{ justifyContent: 'center'}} gap={"1rem"}>
                <span className="font-default text-uppercase">Trainer</span>
                <span className="sub-header">Jo Doe</span>
                <span className="sub-header">+971 4 447 57 11</span>
                <span className="sub-header">jodoe@gmail.com</span>
                <Button className="outline-btn">Reach Out</Button>
              </Flex>
             
            </Flex>
          </div>
        </div>
        <Divider className={styles.divider} />
        <div>
          <Flex
            vertical={!breakPoints?.md}
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
              </Flex>
            </Flex>
            <Flex vertical flex={1} gap={"1.5rem"}>
              <div className="common-header font-bold">Key Take Aways</div>
              <Flex vertical gap={".5rem"}>
                <Flex style={{ alignItems: "center" }} gap={"1rem"}>
                  <span className="color-primary font-bold main-header">1</span>
                  <span className="sub-header font-bold">
                    World Commerce And Contracting Association
                  </span>
                </Flex>
                <Flex style={{ alignItems: "center" }} gap={"1rem"}>
                  <span className="color-primary font-bold main-header">2</span>
                  <span className="sub-header font-bold">
                    World Commerce And Contracting Association
                  </span>
                </Flex>
                <Flex style={{ alignItems: "center" }} gap={"1rem"}>
                  <span className="color-primary font-bold main-header">3</span>
                  <span className="sub-header font-bold">
                    World Commerce And Contracting Association
                  </span>
                </Flex>
                <Flex style={{ alignItems: "center" }} gap={"1rem"}>
                  <span className="color-primary font-bold main-header">4</span>
                  <span className="sub-header font-bold">
                    World Commerce And Contracting Association
                  </span>
                </Flex>
                <Flex style={{ alignItems: "center" }} gap={"1rem"}>
                  <span className="color-primary font-bold main-header">5</span>
                  <span className="sub-header font-bold">
                    World Commerce And Contracting Association
                  </span>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Similar Topics</div>
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
