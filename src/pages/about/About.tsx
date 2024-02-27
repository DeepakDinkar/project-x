import { Divider, Flex, Image } from "antd";
import { useTranslation } from "react-i18next";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import styles from "./About.module.scss";

function About() {
  const mentors = [...new Array(20)];
  const breakPoint = useBreakPoint();
  const { t } = useTranslation();

  return (
    <Flex vertical justify="center" className={styles.aboutUsWrapper}>
      <div className={styles.sectionHeaderWrapper}>
        <p className={styles.sectionHeader}>{t('aboutPage.title')}</p>
        <p className={styles.sectionSubHeader}>{t('aboutPage.subTitle')}</p>
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
              {t('aboutPage.para1')}
              </p>
              <p>&nbsp;</p>
              <p>
              {t('aboutPage.para2')}
              </p>
              <p>&nbsp;</p>
              <p>
              {t('aboutPage.para3')}
              </p>
              <p>&nbsp;</p>
              <p>
              {t('aboutPage.para4')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className="w-100">
        <Flex vertical justify="center">
          <p className={styles.sectionHeader}>{t('aboutPage.coreValuesTitle')}</p>
          <Flex className={styles.coreValuesWrapper} gap={25}>
            <div className={styles.coreValuesContainer}>
              <Image
                src="/images/about-us/idea 1.png"
                width={breakPoint?.md ? 100 : 40}
                height={breakPoint?.md ? 100 : 40}
                preview={false}
              />
              <span className="standard-font-bold text-center">
                {t('aboutPage.coreValuesSubTitle1')}
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
              {t('aboutPage.coreValuesSubTitle2')}
              </span>
            </div>
            <div className={styles.coreValuesContainer}>
              <Image
                src="/images/about-us/value-proposition.png"
                width={breakPoint?.md ? 100 : 40}
                height={breakPoint?.md ? 100 : 40}
                preview={false}
              />
              <span className="standard-font-bold text-center">
              {t('aboutPage.coreValuesSubTitle3')}
              </span>
            </div>
          </Flex>
        </Flex>
      </div>
      <Divider className={styles.divider} />
      <div className="w-100">
        <p className={styles.sectionHeader}>{t('aboutPage.boardAdvisors')}</p>
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
