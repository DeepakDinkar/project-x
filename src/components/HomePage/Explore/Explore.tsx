import { CloseCircleOutlined } from "@ant-design/icons";
import {
  DatePicker,
  DatePickerProps,
  Flex,
  Input,
  Select,
  Space,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { FormEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { STATUS } from "../../../constants/messages.constants";
import useFetch from "../../../hooks/useFetch";
import { Status } from "../../../models/ExceptionProps";
import { Vertical } from "../../../models/Vertical";
import styles from "../../../pages/home/Home.module.scss";
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
  DATE = "date",
}

type FilterOptions = {
  query?: string;
  slug?: string;
  location?: string;
  date?: string;
};

function Explore() {
  const filterOptions = useRef<FilterOptions>();

  const {
    loading: isCoursesLoading,
    data: courses,
    error: isCoursesError,
    fetch,
  } = useFetch(getExploreCourses);

  useEffect(() => {
    fetch();
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

  const getCoursesList = () => {
    return <GridCard courses={courses} />;
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
    fetch(filters);
  };

  const onSelectionChange = (value: string, key: string) => {
    filterOptions.current = {
      ...filterOptions.current,
      [key]: value,
    };
    updateFilterOptions();
  };

  const getRenderer = () => {
    if (isCoursesLoading) {
      return (
        <Space style={{ padding: "3rem 0"}}>
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

    if (courses?.length == 0 || courses?.length == 0) {
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
    filterOptions.current = {
      ...filterOptions.current,
      [FilterType.DATE]: date?.format(),
    };
    updateFilterOptions();
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
              placeholder="Search topics"
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
                className={`${filterOptions.current?.date ? "active" : ""} ${
                  styles.exploreFilterSelect
                }`}
              />
              <Select
                placeholder="Location"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
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
