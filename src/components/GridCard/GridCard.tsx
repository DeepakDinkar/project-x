import { Flex, Image, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { Course } from "../../models/Course";
import { useSelector } from "react-redux";
import { Vertical } from "../../models/Vertical";

type GridCardProps = {
  courses: Course[] | undefined;
};

export default function GridCard({ courses = [] }: Readonly<GridCardProps>) {
  const navigate = useNavigate();

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
      <>
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
            <Flex>
              <span className="card-chip font-bold">New Topic</span>
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
        <div
          className="card-overlay-wrapper large-content h-100"
          style={{ padding: 0 }}
        >
          <Flex
            vertical
            className="h-100"
            justify="space-between"
            style={{ padding: "1.5rem" }}
          >
            <Flex>
              <span className="card-chip font-bold">New Topic</span>
            </Flex>
            <Flex vertical gap={"1rem"}>
              <Rate
                allowHalf
                disabled
                defaultValue={course.campaignTemplateRating}
              />
              <div className="font-sm font-bold text-uppercase">
                {course.campaignTemplateCourseName}
              </div>
              <div style={{ fontSize: "2rem" }} className="font-bold">
                {getVerticalTitle(course.slug)}
              </div>
              <p className="sub-header text-ellipsis">{course.courseContent}</p>
              <button className="button primary-button text-uppercase">
                Register Now
              </button>
            </Flex>
          </Flex>
        </div>
      </>
    );
  };

  return (
    <div className="grid-card-container">
      {courses.map((course: Course) => (
        <div
          className={`course-card small-card explore-card`}
          role="button"
          key={course.id}
          onClick={() => navigate(`/courses/${course.id}`)}
          onKeyDown={() => {}}
        >
          <Image
            width={"100%"}
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
