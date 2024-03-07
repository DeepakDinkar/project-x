import { Button, Divider, Flex, Image, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { STATUS } from "../../constants/messages.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import { Status } from "../../models/ExceptionProps";
import { Trainer } from "../../models/Trainer";
import { getTrainers } from "../../services/courseApi";
import Exception from "../../utils/Exception/Exception";
import styles from "./About.module.scss";

function About() {
  const breakPoint = useBreakPoint();
  const { t } = useTranslation();
  const pageRef = useRef<number>(1);
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  const {
    loading: isTrainersLoading,
    data: trainerData,
    error: isTrainerError,
    fetch,
  } = useFetch(getTrainers);

  useEffect(() => {
    if (trainerData?.content) {
      pageRef.current === 1
        ? setTrainers(trainerData?.content ?? [])
        : setTrainers((trainers) => [
            ...trainers,
            ...(trainerData?.content ?? []),
          ]);
    }
  }, [trainerData, trainerData?.content]);

  useEffect(() => {
    const getData = async () => {
      await fetch(pageRef.current);
    };

    getData();
  }, [fetch]);

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    fetch(pageRef.current);
  };

  const getLoadMoreButton = () => {
    return (
      pageRef.current < trainerData?.totalPages && (
        <Button style={{ margin: "auto" }} onClick={() => loadMoreData()}>
          Load More
        </Button>
      )
    );
  };

  const getTrainersList = () => {
    return (
      <Flex className={styles.mentorWrapper}>
        {trainers?.map((trainer: Trainer) => (
          <Flex
            vertical
            key={crypto.randomUUID()}
            className={styles.mentorCard}
          >
            <div className={styles.mentorImageWrapper}>
              <Image
                src="/images/about-us/pexels-tony-jamesandersson-1674752-removebg-preview1.png"
                height={breakPoint?.md ? 250 : 100}
                width={breakPoint?.md ? 250 : 100}
                preview={false}
              />
              <div className={styles.mentorCardCircle}></div>
            </div>

            <span className="standard-font-bold text-center">
              {trainer?.trainerName}
            </span>
            <span className={styles.mentorUniversity}>
              Professor in Dubai University
            </span>
          </Flex>
        ))}
      </Flex>
    );
  };

  const getCoursesList = () => {
    return (
      <>
        {getTrainersList()}
        {isTrainersLoading ? (
          <Flex
            style={{ padding: "3rem 0" }}
            align="center"
            justify="center"
            className="w-100"
          >
            <Spin size="large" />
          </Flex>
        ) : (
          getLoadMoreButton()
        )}
      </>
    );
  };

  const getTainersRenderer = () => {
    if (isTrainersLoading && pageRef.current === 1) {
      return (
        <Flex style={{ padding: "3rem 0" }} justify="center">
          <Spin size="large" />
        </Flex>
      );
    }
    if (isTrainerError) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
      );
    }

    if (trainers?.length == 0) {
      return (
        <Exception
          status={Status.NOT_FOUND}
          subTitle={STATUS.NOT_FOUND}
          className={styles.exploreCoursesException}
        />
      );
    }

    return getCoursesList();
  };

  return (
    <Flex vertical justify="center" className={styles.aboutUsWrapper}>
      <div className={styles.sectionHeaderWrapper}>
        <p className={styles.sectionHeader}>{t("aboutPage.title")}</p>
        <p className={styles.sectionSubHeader}>{t("aboutPage.subTitle")}</p>
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
              <p>{t("aboutPage.para1")}</p>
              <p>&nbsp;</p>
              <p>{t("aboutPage.para2")}</p>
              <p>&nbsp;</p>
              <p>{t("aboutPage.para3")}</p>
              <p>&nbsp;</p>
              <p>{t("aboutPage.para4")}</p>
            </div>
          </div>
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className="w-100">
        <Flex vertical justify="center">
          <p className={styles.sectionHeader}>
            {t("aboutPage.coreValuesTitle")}
          </p>
          <Flex className={styles.coreValuesWrapper} gap={25}>
            <div className={styles.coreValuesContainer}>
              <Image
                src="/images/about-us/idea 1.png"
                width={breakPoint?.md ? 100 : 40}
                height={breakPoint?.md ? 100 : 40}
                preview={false}
              />
              <span className="standard-font-bold text-center">
                {t("aboutPage.coreValuesSubTitle1")}
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
                {t("aboutPage.coreValuesSubTitle2")}
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
                {t("aboutPage.coreValuesSubTitle3")}
              </span>
            </div>
          </Flex>
        </Flex>
      </div>
      {trainers.length > 0 && (
        <>
          <Divider className={styles.divider} />
          <div className="w-100">
            <p className={styles.sectionHeader}>
              {t("aboutPage.boardAdvisors")}
            </p>
            {getTainersRenderer()}
          </div>
        </>
      )}
    </Flex>
  );
}

export default About;
