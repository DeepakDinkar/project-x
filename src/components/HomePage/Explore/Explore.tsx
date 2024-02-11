import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Input,
  Select,
  Space,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { STATUS } from "../../../constants/messages.constants";
import useFetch from "../../../hooks/useFetch";
import useFetchOnLoad from "../../../hooks/useFetchOnLoad";
import { Course } from "../../../models/Course";
import { Status } from "../../../models/ExceptionProps";
import { Vertical } from "../../../models/Vertical";
import styles from "../../../pages/home/Home.module.scss";
import { getAllCourseLocations } from "../../../services/courseApi";
import { getExploreCourses } from "../../../services/exploreCoursesApi";
import Exception from "../../../utils/Exception/Exception";
import debounce from "../../../utils/debounceSearch";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";
import { SearchIcon } from "../../../utils/svgs/SearchIcon";
import GridCard from "../../GridCard/GridCard";

enum FilterType {
  SEARCH = "query",
  SLUG = "slug",
  LOCATION = "location",
  FROM_DATE = "fromDate",
  TO_DATE = "toDate",
}

type FilterOptions = {
  [key: string]: string;
};

function Explore() {
  const filterOptions = useRef<FilterOptions>();
  const pageRef = useRef<number>(1);
  const { data: locations }: { data: string[] } = useFetchOnLoad(
    getAllCourseLocations
  );

  const {
    loading: isCoursesLoading,
    data,
    error: isCoursesError,
    fetch,
  } = useFetch(getExploreCourses);

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (data?.content) {
      pageRef.current === 1
        ? setCourses(data?.content ?? [])
        : setCourses((courses) => [...courses, ...(data?.content ?? [])]);
    }
  }, [data, data?.content]);

  useEffect(() => {
    const getData = async () => {
      await fetch(pageRef.current);
    };
    getData();
  }, [fetch]);

  const verticals = useSelector(
    (state: { verticals: { verticals: Vertical[] } }) => state.verticals
  )?.verticals;

  const getVerticalOptions = () => {
    return verticals?.map((vertical) => ({
      value: vertical.slug,
      label: vertical.title,
    }));
  };

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    const filters = filterOptions.current;
    fetch(pageRef.current, filters);
  };

  const getLoadMoreButton = () => {
    return (
      pageRef.current < data?.totalPages && (
        <Button style={{ margin: "auto" }} onClick={() => loadMoreData()}>
          Load More
        </Button>
      )
    );
  };

  const getCoursesList = () => {
    return (
      <>
        <GridCard courses={courses} />
        {isCoursesLoading ? (
          <Space style={{ padding: "3rem 0" }}>
            <Spin size="large" />
          </Space>
        ) : (
          getLoadMoreButton()
        )}
      </>
    );
  };

  const searchCourses = (searchQuery: string) => {
    searchQuery = searchQuery.trim().toLowerCase();
    filterOptions.current = {
      ...filterOptions.current,
      [FilterType.SEARCH]: searchQuery,
    };
    updateFilterOptions();
  };

  const debouncedSearch = debounce(searchCourses, 300);

  const inputSearch = (event: FormEvent<HTMLInputElement>) => {
    const query = (event.target as HTMLInputElement).value;
    debouncedSearch(query);
  };

  const updateFilterOptions = () => {
    const filters = filterOptions.current;
    pageRef.current = 1;
    fetch(pageRef.current, filters);
  };

  const onSelectionChange = (value: string, key: string) => {
    filterOptions.current = {
      ...filterOptions.current,
      [key]: value,
    };
    updateFilterOptions();
  };

  const getRenderer = () => {
    if (isCoursesLoading && pageRef.current === 1) {
      return (
        <Space style={{ padding: "3rem 0" }}>
          <Spin size="large" />
        </Space>
      );
    }
    if (isCoursesError) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
      );
    }

    if (courses?.length == 0) {
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

  const disabledDate = (current: dayjs.Dayjs) => {
    const currentYear = new Date().getFullYear();
    return current && current.year() !== currentYear;
  };

  const onDateChange: DatePickerProps["onChange"] = (
    date: dayjs.Dayjs | null
  ) => {
    const options = filterOptions.current ?? {};
    if (date) {
      const fromDate = date?.startOf("month").format("YYYY-MM-DD");
      const toDate = date?.endOf("month").format("YYYY-MM-DD");

      options[FilterType.FROM_DATE] = fromDate;
      options[FilterType.TO_DATE] = toDate;
    } else {
      delete options.fromDate;
      delete options.toDate;
    }

    filterOptions.current = options;

    updateFilterOptions();
  };

  const getLocationOptions = () => {
    if (locations) {
      return locations.map((location) => {
        return {
          value: location,
          label: location,
        };
      });
    }
    return [];
  };

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} text-center`}
    >
      <div className={styles.titleContent}>
        <LeftCurve />
        <p className="main-header font-bold color-primary">Explore</p>
        <p className={`${styles.subHeader} sub-header font-bold color-white`}>
          Latest and trending topics to explore
        </p>
        <RightCurve />
      </div>
      <div className="w-100">
        <div className={`primary-container ${styles.exploreSearchWrapper}`}>
          <Flex
            style={{
              flexFlow: "row wrap",
              justifyContent: "space-between",
              gap: "2.5rem",
            }}
          >
            <Input
              placeholder="Search courses"
              onInput={(event) => inputSearch(event)}
              prefix={<SearchIcon />}
              size="middle"
              style={{
                width: "auto",
                flexGrow: 1,
                maxWidth: "380px",
              }}
            />
            <Flex
              gap={".875rem"}
              style={{ flexFlow: "row wrap", justifyContent: "flex-start" }}
              className={styles.exploreDateFilter}
            >
              <Select
                placeholder="Verticals"
                options={getVerticalOptions()}
                onChange={(value) => onSelectionChange(value, FilterType.SLUG)}
                allowClear={{ clearIcon: <CloseCircleOutlined /> }}
                listHeight={150}
                className={`${filterOptions.current?.slug ? "active" : ""} ${
                  styles.exploreFilterSelect
                }`}
              />
              <DatePicker
                picker="month"
                placeholder="Date"
                allowClear={{ clearIcon: <CloseCircleOutlined /> }}
                format={"MMM, YYYY"}
                disabledDate={disabledDate}
                onChange={onDateChange}
                className={`${
                  filterOptions.current?.fromDate ? "active" : ""
                } ${styles.exploreFilterSelect}`}
              />
              <Select
                placeholder="Location"
                allowClear={{ clearIcon: <CloseCircleOutlined /> }}
                className={`${
                  filterOptions.current?.location ? "active" : ""
                } ${styles.exploreFilterSelect}`}
                onChange={(value) =>
                  onSelectionChange(value, FilterType.LOCATION)
                }
                options={getLocationOptions()}
              />
            </Flex>
          </Flex>
        </div>
        {getRenderer()}
      </div>
    </div>
  );
}

export default Explore;
