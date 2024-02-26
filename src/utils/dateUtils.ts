/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

const currentDate = dayjs();

export const filterCurrentCourses = (courses: any[]) => {
  const filterCourses = courses?.filter((course) =>
    dayjs(course.courseDate).isSame(currentDate)
  );
  return sortCoursesByDate(filterCourses) ?? [];
};

export const filterUpcomingCourses = (courses: any[]) => {
  const filterCourses = courses?.filter((course) =>
    dayjs(course.courseDate).isAfter(currentDate)
  );
  return sortCoursesByDate(filterCourses) ?? [];
};

export const filterPreviousCourses = (courses: any[]) => {
  const filterCourses = courses?.filter((course) =>
    dayjs(course.courseDate).isBefore(currentDate)
  );
  return sortCoursesByDate(filterCourses) ?? [];
};

const sortCoursesByDate = (courses: any[]) => {
  return courses?.sort((a, b) => dayjs(a.courseDate).diff(dayjs(b.courseDate)));
};
