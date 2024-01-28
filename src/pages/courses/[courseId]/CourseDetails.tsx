import { Button, Divider, Flex, Image, Rate, Select } from "antd";
import GridCard from "../../../components/GridCard/GridCard";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import styles from "./CourseDetails.module.scss";

export default function CourseDetails() {
  const breakPoints = useBreakPoint();

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} search-container`}
    >
      <div className="w-100">
        <div>
          <Flex vertical={!breakPoints?.md} gap={"2.5rem"}>
            <div
              className={`course-card small-card ${styles.exploreCard} h-100`}
              style={{ width: "fit-content" }}
            >
              <Image
                className={styles.courseDetailImage}
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
              flexFlow: "row wrap",
              width: "100%",
              alignItems: "center",
              padding: "3.5rem 0",
            }}
            justify={breakPoints?.md ? "start" : "center"}
            gap={"1.5rem"}
          >
            <span className="font-bold sub-header">Select Location & Date</span>
            <Select
              placeholder="Dubai, UAE | Nov 19 - 23, 2023"
              options={[
                { value: "jack", label: "Dubai, UAE | Nov 19 - 23, 2023" },
                { value: "lucy", label: "Nov 25 - 30, 2023" },
                {
                  value: "Yiminghe",
                  label: "Abu Dhabi, UAE | Nov 27 - Dec 02, 2023",
                },
                { value: "Yiming", label: "Dec 01 - 06, 2023" },
              ]}
            />
            <Flex gap={"1.5rem"} align="center">
              <span className="font-bold sub-header">Qty</span>
              <Select
                placeholder="4"
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                ]}
              />
            </Flex>
          </Flex>
          <Flex
            justify={breakPoints?.md ? "end" : "center"}
            style={{
              paddingBottom: "2rem",
              flexFlow: breakPoints?.md ? "row nowrap" : "row wrap",
            }}
            gap={"1rem"}
          >
            <Button type="primary" className="text-uppercase">
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
                <div style={{ marginTop: "1.5rem" }}>
                  <Flex className={styles.mentorCard} gap={"2rem"}>
                    <div className={styles.mentorImageWrapper}>
                      <Image
                        src="/images/about-us/pexels-tony-jamesandersson-1674752-removebg-preview1.png"
                        height={breakPoints?.md ? 250 : 100}
                        width={breakPoints?.md ? 250 : 100}
                      />
                      <div className={styles.mentorCardCircle}></div>
                    </div>
                    <Flex
                      vertical
                      className="font-bold"
                      style={{ justifyContent: "center" }}
                      gap={"1rem"}
                    >
                      <span className="font-default text-uppercase">
                        Trainer
                      </span>
                      <span className="sub-header">Jo Doe</span>
                      <span className="sub-header">+971 4 447 57 11</span>
                      <span className="sub-header">jodoe@gmail.com</span>
                      <Button className="outline-btn">Reach Out</Button>
                    </Flex>
                  </Flex>
                </div>
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
        <GridCard courses={[]} />
      </div>
      {/* <Empty description="No courses found" /> */}
    </div>
  );
}
