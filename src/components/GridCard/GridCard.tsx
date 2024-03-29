import { Flex, Image } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Course } from "../../models/Course";
import { Vertical } from "../../models/Vertical";
import { isDatePassed30Days } from "../../utils/commonUtils";

type GridCardProps = {
  courses: Course[] | undefined;
};

export default function GridCard({ courses = [] }: Readonly<GridCardProps>) {
  const navigate = useNavigate();

  const getUniqueKey = () => {
    return crypto.randomUUID();
  };

  const verticals = useSelector(
    (state: { verticals: { verticals: Vertical[] } }) => state.verticals
  )?.verticals;

  const getVerticalTitle = (slug: string) => {
    return (
      verticals?.find((vertical) => vertical.slug === slug)?.title ??
      "Slug not found"
    );
  };

  const getCardContent = (course: Course) => {
    return (
      <div
        className="card-overlay-wrapper h-100 small-content"
        style={{ padding: 0 }}
      >
        <Flex
          vertical
          className="h-100"
          justify="space-between"
          style={{ padding: "1.5rem" }}
        >
          <Flex gap={5} wrap="wrap">
            {isDatePassed30Days(course.courseAddedDate) && (
              <span className="card-chip font-bold">New Course</span>
            )}

            {course?.isTrending && (
              <span className="card-chip font-bold">Trending</span>
            )}
          </Flex>
          <Flex vertical align="baseline">
            <span className="card-course-title">
              {course.campaignTemplateCourseName}
            </span>
            <span className="sub-header font-bold">
              {getVerticalTitle(course.slug)}
            </span>
          </Flex>
        </Flex>
      </div>
    );
  };

  return (
    <div className="grid-card-container">
      {courses.map((course: Course) => (
        <div
          className={`course-card small-card explore-card`}
          role="button"
          key={getUniqueKey()}
          onClick={() => navigate(`/course/${course.id}`)}
          onKeyDown={() => {}}
        >
          <Image
            width={"100%"}
            height={"100%"}
            src={course.imageUrl}
            fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
            preview={false}
          />
          {getCardContent(course)}
        </div>
      ))}
    </div>
  );
}
