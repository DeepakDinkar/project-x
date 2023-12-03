import { Flex, Image } from "antd";
import styles from "../../../pages/home/Home.module.scss";
import { useBreakPoint } from "../../../hooks/useBreakPoint";

function CoursesList() {
  const courses = [...new Array(5)];
  const breakPoint = useBreakPoint();

  return (
    <div className={`${styles.titleWrapper} text-center`} style={{ paddingTop: 0}}>
      <p className="main-header font-bold">Courses</p>
      <p className={`${styles.subHeader} sub-header font-bold`}>
        Choose the latest courses offered
        <br /> curated by our professionals
      </p>
      <div className="w-100">
        <Flex gap={"2rem"} style={{ margin: "2.5rem 0", overflow: "auto", maxWidth: "100%" }}>
          {courses.map((_course, index) => (
            <div className="course-card small-card" key={index}>
              <Image
                height={breakPoint?.md ? 360 : 180}
                width={breakPoint?.md ? 360 : 180}
                src="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div className="card-bottom-wrapper">
                <span className="card-bottom-title">Leadership and Business Management</span>
                <span className="font-bold">20 Topics</span>
              </div>
            </div>
          ))}
        </Flex>
      </div>
    </div>
  );
}
export default CoursesList;
