import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Drawer,
  Flex,
  Image,
  Input,
  Select,
  Spin,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GridCard from "../../components/GridCard/GridCard";
import MobileFilter from "../../components/MobileFilter/MobileFilter";
import { STATUS } from "../../constants/messages.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Course } from "../../models/Course";
import { Status } from "../../models/ExceptionProps";
import { VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
import { getAllCourseLocations } from "../../services/courseApi";
import {
  getVerticalCourses,
  getVerticalDetails,
  getVerticals,
} from "../../services/verticalsApi";
import Exception from "../../utils/Exception/Exception";
import debounce from "../../utils/debounceSearch";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./Courses.module.scss";

enum FilterType {
  SEARCH = "query",
  SLUG = "slug",
  LOCATION = "location",
  FROM_DATE = "fromDate",
  TO_DATE = "toDate",
  SORT = "sortBy",
  DELIVERY_MODE = "deliveryMode",
}

type FilterOptions = {
  [key: string]: string;
};

function Courses() {
  const breakPoints = useBreakPoint();
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);
  const {
    data: verticalCourse,
    fetch,
    loading: isLoading,
    error: isVerticalError,
  } = useFetch(getVerticalDetails);
  const [courses, setCourses] = useState<Course[]>([]);
  const filterOptions = useRef<FilterOptions>();
  const pageRef = useRef<number>(1);
  const {
    loading: isCoursesLoading,
    data,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getVerticalCourses);
  const { data: locations }: { data: string[] } = useFetchOnLoad(
    getAllCourseLocations
  );

  useEffect(() => {
    const getData = async () => {
      await coursesFetch(slug, pageRef.current);
    };
    getData();
  }, [coursesFetch, slug]);

  useEffect(() => {
    if (data?.content) {
      pageRef.current === 1
        ? setCourses(data?.content ?? [])
        : setCourses((courses) => [...courses, ...(data?.content ?? [])]);
    }
  }, [data, data?.content]);

  useEffect(() => {
    fetch(slug);
  }, [fetch, slug]);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

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
    coursesFetch(slug, pageRef.current, filters);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    const currentYear = new Date().getFullYear();
    return current && current.year() !== currentYear;
  };

  const getVerticalOptions = () => {
    return verticals?.map((vertical) => ({
      value: vertical.slug,
      label: vertical.title,
    }));
  };

  const onSelectionChange = (value: string, key: string) => {
    filterOptions.current = {
      ...filterOptions.current,
      [key]: value,
    };
    updateFilterOptions();
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

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    const filters = filterOptions.current;
    coursesFetch(slug, pageRef.current, filters);
  };

  const getLoadMoreButton = () => {
    return (
      pageRef.current < data?.totalPages && (
        <Button style={{ margin: "auto" }} onClick={() => loadMoreData()}>
          {t('utils.loadMoreBtn')}
        </Button>
      )
    );
  };

  useLayoutEffect(() => {
    setIsFilterDrawerVisible(false);
  }, [breakPoints?.md]);

  const removeFilterOption = (key: string) => {
    const options = filterOptions?.current;

    if (options) {
      delete options[key];
      key === FilterType.FROM_DATE && delete options[FilterType.TO_DATE];
      filterOptions.current = options;
    }

    updateFilterOptions();
  };

  const getFilterTags = (
    key: string,
    options: FilterOptions,
    index: number
  ) => {
    if (key === FilterType.FROM_DATE) {
      const date = new Date(options[key]);
      const formatedDate = dayjs(date).format("MMM, YYYY");

      return (
        <Tag closeIcon key={index} onClose={() => removeFilterOption(key)}>
          {formatedDate}
        </Tag>
      );
    }

    if (key === FilterType.TO_DATE || key === FilterType.SEARCH) {
      return null;
    }

    if (key === FilterType.SORT) {
      return (
        <Tag closeIcon key={index} onClose={() => removeFilterOption(key)}>
          {options[key] ? "A-Z" : "Z-A"}
        </Tag>
      );
    }

    return (
      <Tag closeIcon key={index} onClose={() => removeFilterOption(key)}>
        {options[key]}
      </Tag>
    );
  };

  const getFilteredOptions = () => {
    const options = filterOptions.current ?? {};

    return Object.keys(options).map((key: string, index: number) =>
      getFilterTags(key, options, index)
    );
  };

  const handleMobileFilter = (mobileFilterOptions: FilterOptions) => {
    if (mobileFilterOptions.slug && mobileFilterOptions.slug !== slug) {
      filterOptions.current = {};
      pageRef.current = 1;
      navigate(`/verticals/${mobileFilterOptions.slug}`);
    } else {
      filterOptions.current = {
        ...filterOptions.current,
        ...mobileFilterOptions,
      };
    }

    updateFilterOptions();
    setIsFilterDrawerVisible(false);
  };

  const getFilters = () => {
    return (
      breakPoints?.md && (
        <>
          <Flex
            gap={"1.5rem"}
            style={{ flexFlow: "row wrap" }}
            className={styles.courseWrapper}
          >
            <Select
              placeholder="Sort By"
              className={`${filterOptions.current?.sortBy ? "active" : ""}`}
              options={[
                { value: true, label: "A-Z" },
                { value: false, label: "Z-A" },
              ]}
              value={filterOptions?.current?.sortBy}
              onChange={(value) => onSelectionChange(value, FilterType.SORT)}
            />
            <DatePicker
              picker="month"
              placeholder="Date"
              className={`${filterOptions.current?.fromDate ? "active" : ""}`}
              format={"MMM, YYYY"}
              disabledDate={disabledDate}
              onChange={onDateChange}
            />
            <Select
              placeholder="Filter by Delivery Modes"
              className={`${
                filterOptions.current?.deliveryMode ? "active" : ""
              }`}
              onChange={(value) =>
                onSelectionChange(value, FilterType.DELIVERY_MODE)
              }
              value={filterOptions?.current?.deliveryMode}
              options={[
                { value: "virtual", label: "Virtual Training" },
                { value: "live", label: "Live Training" },
              ]}
            />
            <Select
              placeholder="Filter by Verticals"
              options={getVerticalOptions()}
              className={"active"}
              value={slug}
              onChange={(value) => {
                navigate(`/verticals/${value}`);
                filterOptions.current = {};
              }}
            />
            <Select
              placeholder="Filter by Location"
              className={`${filterOptions.current?.location ? "active" : ""}`}
              onChange={(value) =>
                onSelectionChange(value, FilterType.LOCATION)
              }
              value={filterOptions.current?.location}
              options={getLocationOptions()}
            />
          </Flex>
          <Flex gap={"0.5rem"} style={{ flexFlow: "row wrap" }}>
            {getFilteredOptions()}
          </Flex>
        </>
      )
    );
  };

  const getCoursesList = () => {
    return (
      <>
        <GridCard courses={courses} />
        {isCoursesLoading ? (
          <Flex
            style={{ padding: "3rem 0" }}
            align="center"
            justify="center"
            className="w-100"
          >
            <Spin size="large" />
          </Flex>
        ) : (
          getLoadMoreButton()
        )}
      </>
    );
  };

  const getRenderer = () => {
    if (isCoursesLoading && pageRef.current === 1) {
      return (
        <Flex
          style={{ padding: "3rem 0" }}
          align="center"
          justify="center"
          className="w-100"
        >
          <Spin size="large" />
        </Flex>
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

  const getRootRenderedList = () => {
    if (isLoading) {
      return (
        <Flex align="center" justify="center" className="w-100" style={{ height: '70vh'}}>
          <Spin size="large" />
        </Flex>
      );
    }

    if (isVerticalError || verticalCourse?.slug == null) {
      return (
        <Exception
          status={Status.NOT_FOUND}
          subTitle={STATUS.NOT_FOUND}
          className={styles.exploreCoursesException}
        />
      );
    }

    return (
      <div className="w-100">
        <div>
          <div
            className={`course-card large-card ${styles.courseBannerContainer}`}
          >
            <Image
              height={breakPoints?.md ? 300 : 150}
              width={"100%"}
              src={verticalCourse?.imageUrl}
              fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
              preview={false}
            />
            <div className="card-overlay-wrapper h-100" style={{ padding: 0 }}>
              <Flex
                vertical
                className="h-100 text-center"
                style={{
                  padding: "1.5rem",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <span className={styles.courseTitle}>
                  {verticalCourse?.title}
                </span>
                {breakPoints?.md && (
                  <span className={styles.courseSubTitle}>
                    {t("verticalDetailsPage.verticalDescription")}
                  </span>
                )}
              </Flex>
            </div>
          </div>
        </div>
        <div className={`${styles.exploreSearchWrapper}`}>
          <div className={styles.topicText}>
            {verticalCourse?.courses?.length || 0}{" "}
            {t("verticalDetailsPage.topicsAvailable")}
          </div>
          <Flex vertical gap={"2rem"}>
            <Flex
              vertical={breakPoints?.md}
              style={{
                justifyContent: "space-between",
                gap: breakPoints?.md ? "2.5rem" : "1.5rem ",
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
              {!breakPoints?.md && (
                <Button
                  className={styles.outlineBtn}
                  onClick={() => setIsFilterDrawerVisible(true)}
                >
                  {t("verticalDetailsPage.filterText")} <DownOutlined />
                </Button>
              )}
            </Flex>
            {getFilters()}
          </Flex>
        </div>

        <Drawer
          size="default"
          className="cart-drawer"
          placement="bottom"
          destroyOnClose={true}
          closable={true}
          styles={{ header: { display: "none" } }}
          onClose={() => setIsFilterDrawerVisible(false)}
          open={isFilterDrawerVisible}
          style={{ zIndex: 99999 }}
        >
          <MobileFilter
            slug={slug}
            verticals={verticals}
            filterOptions={filterOptions.current ?? {}}
            locations={locations}
            handleMobileFilter={handleMobileFilter}
          />
        </Drawer>
        {getRenderer()}
      </div>
    );
  };

  return (
    <div
      className={`${styles.titleWrapper} ${styles.exploreWrapper} search-container`}
    >
      {getRootRenderedList()}
    </div>
  );
}

export default Courses;
