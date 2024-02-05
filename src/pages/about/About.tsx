import { Divider, Flex, Image } from "antd";
import styles from "./About.module.scss";
import { useBreakPoint } from "../../hooks/useBreakPoint";

function About() {
  const mentors = [...new Array(20)];
  const breakPoint = useBreakPoint();

  return (
    <Flex vertical justify="center" className={styles.aboutUsWrapper}>
      <div className={styles.sectionHeaderWrapper}>
        <p className={styles.sectionHeader}>About Us</p>
        <p className={styles.sectionSubHeader}>Your Success is Our Mission!”</p>
        <div className={styles.detailsWrapper}>
          <div className={styles.flexWrapper}>
            <div className={styles.detailsImageWrapper}>
              <div>
                <Image
                  src="/images/about-us/pexels-pavel-danilyuk-8438979.png"
                  width={breakPoint?.md ? 280 : 200}
                  height={breakPoint?.md ? 280 : 200}
                />
              </div>
              <div className={styles.outerDetailImage}>
                <Image
                  src="/images/about-us/pexels-cottonbro-studio-4253320 1.png"
                  width={breakPoint?.md ? 280 : 200}
                  height={breakPoint?.md ? 280 : 200}
                />
              </div>
            </div>
            <div>
              <p>
                We are a growing international training and consulting company
                with world-class trainers. Established in 2010, Qomo Institute
                has been upskilling and rebranding organizations and individuals
                through auditing and needs analysis services, and training
                deliveries throughout the world.
              </p>
              <p>&nbsp;</p>
              <p>
                We understand that the business community is highly competitive
                and continuous learning delivered by world-class practitioners
                to you/your organization will help brand success. Our services
                are a great solution to creating a “5% culture!
              </p>
              <p>&nbsp;</p>
              <p>
                Years ago, an international study was performed, and it was
                discovered that 95% of employees ranged from poor to adequate
                [“meets expectations’]. The inverse of this demonstrates that
                only 5% of us care to do more. These 5% will offer propositions
                of value, that go above and beyond, in order to make the
                company, the governmental agency, the department, the team, the
                business unit, the individual better! Thus, it is our goal to
                reach out to 5% CLUB members and make their brand strong
              </p>
              <p>&nbsp;</p>
              <p>
                Beyond training, our subject-matter experts within our 5
                verticals, are available for: Consulting, Coaching, Mentoring, Auditing services. Please contact us if you
                have project needs that fit within any of these service buckets.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className="w-100">
        <Flex vertical justify="center">
          <p className={styles.sectionHeader}>Our Core Values</p>
          <Flex className={styles.coreValuesWrapper}>
            <div className={styles.coreValuesContainer}>
              <Image
                src="/images/about-us/idea 1.png"
                width={breakPoint?.md ? 100 : 40}
                height={breakPoint?.md ? 100 : 40}
                preview={false}
              />
              <span className="standard-font-bold text-center">
                We celebrate knowledge <br /> and Idea sharing
              </span>
            </div>
            <div className={styles.coreValuesContainer}>
              <Image
                src="/images/about-us/teacher.png"
                width={breakPoint?.md ? 100 : 40}
                height={breakPoint?.md ? 100 : 40}
                preview={false}
              />
              <span className="standard-font-bold text-center">
                We believe in quality <br /> teaching
              </span>
            </div>
            <div className={styles.coreValuesContainer}>
              <Image
                src="/images/about-us/value-proposition.png"
                width={breakPoint?.md ? 100 : 40}
                height={breakPoint?.md ? 100 : 40}
              />
              <span className="standard-font-bold text-center">
                We value education as the <br /> highest form of wealth
              </span>
            </div>
          </Flex>
        </Flex>
      </div>
      <Divider className={styles.divider} />
      <div className="w-100">
        <p className={styles.sectionHeader}>Board of Advisors</p>
        <Flex className={styles.mentorWrapper}>
          {mentors.map((_mentor, index) => (
            <Flex vertical key={index} className={styles.mentorCard}>
              <div className={styles.mentorImageWrapper}>
                <Image
                  src="/images/about-us/pexels-tony-jamesandersson-1674752-removebg-preview1.png"
                  height={breakPoint?.md ? 250 : 100}
                  width={breakPoint?.md ? 250 : 100}
                  preview={false}
                />
                <div className={styles.mentorCardCircle}></div>
              </div>

              <span className="standard-font-bold text-center">Dr. Jo Doe</span>
              <span className={styles.mentorUniversity}>
                Professor in Dubai University
              </span>
            </Flex>
          ))}
        </Flex>
      </div>
    </Flex>
  );
}

export default About;
