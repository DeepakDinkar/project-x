import { Flex, Image } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../../constants/messages.constants";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import useFetchOnLoad from "../../../hooks/useFetchOnLoad";
import { Status } from "../../../models/ExceptionProps";
import { Vertical, VerticalData } from "../../../models/Vertical";
import styles from "../../../pages/home/Home.module.scss";
import { getVerticals } from "../../../services/verticalsApi";
import Exception from "../../../utils/Exception/Exception";
import Loader from "../../../utils/Loader/Loader";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";
import { setVerticals } from "../../../redux/reducers/verticalsReducer";

function CoursesList() {
  const navigate = useNavigate();
  const breakPoint = useBreakPoint();
  const dispatch = useDispatch();

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
      return 330;
    }
    if (breakPoint?.xl) {
      return 300;
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
    return 130;
  };

  const getVerticalsList = () => {
    return (
      <Flex
        gap={"2rem"}
        style={{ padding: "2.5rem 0", overflow: "auto", maxWidth: "100%" }}
      >
        {verticals?.map((vertical: Vertical) => (
          <div
            className="course-card small-card"
            role="button"
            key={vertical.id}
            onClick={() => navigate("/courses")}
            onKeyDown={() => {}}
          >
            <Image
              height={getSmallCardHeight()}
              width={getSmallCardHeight()}
              src={vertical.imageUrl}
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-bottom-wrapper">
              <span className="card-bottom-title">{vertical.title}</span>
              <span className="font-bold font-default">
                {vertical.noOfCourses || 0} Topics
              </span>
            </div>
          </div>
        ))}
      </Flex>
    );
  };

  const getRenderer = () => {
    if (isVerticalsLoading) {
      return <Loader />;
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
    <div
      className={`${styles.titleWrapper} text-center`}
      style={{ paddingTop: 0 }}
    >
      <div className={styles.titleContent}>
        <LeftCurve />
        <p className="main-header font-bold">Verticals</p>
        <p className={`${styles.subHeader} sub-header font-bold`}>
          Choose the latest courses offered
          <br /> curated by our professionals
        </p>
        <RightCurve />
      </div>
      <div className="w-100">{getRenderer()}</div>
    </div>
  );
}
export default CoursesList;
