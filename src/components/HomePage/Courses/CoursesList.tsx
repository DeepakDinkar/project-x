import { Empty, Flex, Image, Skeleton, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import styles from "../../../pages/home/Home.module.scss";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";
import { getVerticals } from "../../../services/verticalsApi";
import { Vertical } from "../../../models/Vertical";

function CoursesList() {
  const [courses, setCourses] = useState<Vertical[]>();
  const breakPoint = useBreakPoint();

  useEffect(() => {
    const getCourses = async () => {
      const coursesData = await getVerticals();
      coursesData && setCourses(coursesData);
    };

    getCourses();
  }, []);

  const getSmallCardHeight = (): number => {
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

  return (
    <div
      className={`${styles.titleWrapper} text-center`}
      style={{ paddingTop: 0 }}
    >
      <div className={styles.titleContent}>
        <LeftCurve />
        <p className="main-header font-bold">Courses</p>
        <p className={`${styles.subHeader} sub-header font-bold`}>
          Choose the latest courses offered
          <br /> curated by our professionals
        </p>
        <RightCurve />
      </div>

      <div className="w-100">
        <Flex
          gap={"2rem"}
          style={{ padding: "2.5rem 0", overflow: "auto", maxWidth: "100%" }}
        >
          {courses?.map((course, index) => (
            <div className="course-card small-card" key={index}>
              <Image
                height={getSmallCardHeight()}
                width={getSmallCardHeight()}
                src={course.imageURL}
                fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div className="card-bottom-wrapper">
                <span className="card-bottom-title">{course.title}</span>
                <span className="font-bold font-default">
                  {course.noOfCourses} Topics
                </span>
              </div>
            </div>
          ))}
        </Flex>
        <Empty />
        <Spin size="large" />
        <Space>
          <Skeleton.Button active />
          <Skeleton.Avatar active />
          <Skeleton.Input />
        </Space>
      </div>
    </div>
  );
}
export default CoursesList;
