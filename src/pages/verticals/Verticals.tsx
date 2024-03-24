import { Flex, Image, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../constants/messages.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Status } from "../../models/ExceptionProps";
import { Vertical, VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
import { getVerticals } from "../../services/verticalsApi";
import Exception from "../../utils/Exception/Exception";
import styles from "./Verticals.module.scss";
import VerticalTag from "../../utils/svgs/VerticalTag";
import { useTranslation } from "react-i18next";

export default function Verticals() {
  const navigate = useNavigate();
  const breakPoint = useBreakPoint();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    loading: isVerticalsLoading,
    data: verticals,
    error: isVerticalsError,
  }: VerticalData = useFetchOnLoad(getVerticals);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  const getSmallCardHeight = (): number => {
    if (breakPoint?.xxl) {
      return 450;
    }
    if (breakPoint?.xl) {
      return 350;
    }
    if (breakPoint?.lg) {
      return 270;
    }
    if (breakPoint?.md) {
      return 240;
    }
    if (breakPoint?.sm) {
      return 210;
    }
    return 150;
  };

  const getVerticalsList = () => {
    return (
      <div className={styles.verticalListWrapper}>
        {verticals?.map((vertical: Vertical) => (
          <div
            className="course-card small-card"
            role="button"
            key={vertical.id}
            onClick={() => navigate(`/verticals/${vertical.slug}`)}
            onKeyDown={() => {}}
            tabIndex={0}
          >
            <div className={styles.verticalTag}>
              <VerticalTag />
              {t("verticalsPage.verticalsText")}
            </div>
            <Image
              src={vertical.imageUrl}
              height={getSmallCardHeight()}
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-bottom-wrapper">
              <span className="card-bottom-title">{vertical.title}</span>
              <span className="font-bold font-default">
                {vertical.noOfCourses || 0} {t("verticalsPage.topicsText")}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getRenderer = () => {
    if (isVerticalsLoading) {
      return (
        <Flex
          style={{ padding: "3rem 0", height: "70vh" }}
          justify="center"
          align="center"
        >
          <Spin size="large" />
        </Flex>
      );
    }
    if (isVerticalsError) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
      );
    }

    if (verticals.length == 0) {
      return (
        <Exception status={Status.NOT_FOUND} subTitle={STATUS.NOT_FOUND} />
      );
    }

    return getVerticalsList();
  };

  return (
    <div className={styles.verticalsWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"1.5rem"}>
          <div className="main-header font-bold font-ubuntu">
            {t("verticalsPage.title")}
          </div>
          <p className={`${styles.subHeader} sub-header font-bold`}>
            {t("verticalsPage.subTitle")}
          </p>
          <div
            className={`${styles.titleWrapper} text-center`}
            style={{ paddingTop: 0 }}
          >
            <div className="w-100">{getRenderer()}</div>
          </div>
        </Flex>
      </div>
    </div>
  );
}
