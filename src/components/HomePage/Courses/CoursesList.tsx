import { Image, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../../constants/messages.constants";
import useFetchOnLoad from "../../../hooks/useFetchOnLoad";
import { Status } from "../../../models/ExceptionProps";
import { Vertical, VerticalData } from "../../../models/Vertical";
import styles from "../../../pages/home/Home.module.scss";
import { setVerticals } from "../../../redux/reducers/verticalsReducer";
import { getVerticals } from "../../../services/verticalsApi";
import Exception from "../../../utils/Exception/Exception";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";
import VerticalTag from "../../../utils/svgs/VerticalTag";

function CoursesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: isVerticalsLoading,
    data: verticals,
    error: isVerticalsError,
  }: VerticalData = useFetchOnLoad(getVerticals);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  const getVerticalsList = () => {
    return (
      <div className={styles.courseListWrapper}>
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
              Vertical
            </div>
            <Image
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
      </div>
    );
  };

  const getRenderer = () => {
    if (isVerticalsLoading) {
      return <Spin size="large" />;
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
          Our {verticals?.length || 0} Business Verticals
        </p>
        <RightCurve />
      </div>
      <div className="w-100">{getRenderer()}</div>
    </div>
  );
}
export default CoursesList;
