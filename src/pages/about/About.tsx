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
        <p className={styles.sectionSubHeader}>
          We aim to set a new era of sustainable <br /> personal development and
          corporate
        </p>
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
                Through instructor-led sessions, in-company training and
                coaching, our faculty of experts deliver over 1200+ programs
                annually, while 25,000+ professionals are equipped with
                up-to-date relevant education and the latest tech solutions
                across the EMEA region.
              </p>
              <p>&nbsp;</p>
              <p>
                We support our valued clients with a wide range of services,
                including Training Needs Analysis, Competency Development and
                Assessment, and custom-built e-Learning solutions that cater to
                specific industries and knowledge areas.
              </p>
              <p>&nbsp;</p>
              <p>
                The LEORON mission is boosting the competitiveness of our
                clients worldwide through continuous learning, while stiving to
                achieve our vision of becoming the best quality corporate
                training and EdTech Company in the EMEA and the world. Whether
                our clients are facing difficulties re-organising their brand,
                equipping their workforce with an extra set of skills or aiming
                to assess competencies within an existing structure, our
                development planning is a great solution.
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
        <p className={styles.sectionHeader}>Key Mentors</p>
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
