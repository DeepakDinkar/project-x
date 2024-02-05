import {
  CheckOutlined,
  CloseCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  DatePicker,
  Drawer,
  Flex,
  Image,
  Input,
  Radio,
  Select,
  Spin,
  Tabs,
  TabsProps,
  Tag
} from "antd";
import dayjs from "dayjs";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import GridCard from "../../components/GridCard/GridCard";
import { STATUS } from "../../constants/messages.constants";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Course } from "../../models/Course";
import { Status } from "../../models/ExceptionProps";
import { VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
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
  DATE = "date",
}

type FilterOptions = {
  query?: string;
  slug?: string;
  location?: string;
  date?: string;
};

function Courses() {
  const breakPoints = useBreakPoint();
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
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

  useEffect(() => {
    const getData = async () => {
     await coursesFetch(slug, pageRef.current);
    };
    getData();
  }, [coursesFetch, slug]);

  useEffect(() => {
    if (data?.content) {
      setCourses(data?.content);
    }
  }, [data, data?.content]);

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

  useEffect(() => {
    fetch(slug);
  }, [fetch, slug]);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  useLayoutEffect(() => {
    setIsFilterDrawerVisible(false);
  }, [breakPoints?.md]);

  const items: TabsProps["items"] = [
    {
      key: "sortBy",
      label: "Sort by",
      children: (
        <Radio.Group className="radio-select">
          <Radio.Button value="topLeft">
            <Flex justify="space-between" className="w-100">
              A - Z
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="topRight">
            <Flex justify="space-between" className="w-100">
              Z - A
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
        </Radio.Group>
      ),
    },
    {
      key: "filterByDates",
      label: "Filter By Dates",
      children: (
        <Radio.Group className="radio-select">
          <Radio.Button value="topLeft">
            <Flex justify="space-between" className="w-100">
              Feb 2024
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="topRight">
            <Flex justify="space-between" className="w-100">
              Mar 2024
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="bottomLeft">
            <Flex justify="space-between" className="w-100">
              Apr 2024
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="bottomRight">
            <Flex justify="space-between" className="w-100">
              May 2024
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
        </Radio.Group>
      ),
    },
    {
      key: "filterByDeliveryModes",
      label: "Filter by Delivery Modes",
      children: (
        <Radio.Group className="radio-select">
          <Radio.Button value="topLeft">
            <Flex justify="space-between" className="w-100">
              Live Training
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="topRight">
            <Flex justify="space-between" className="w-100">
              Virtual Training
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
        </Radio.Group>
      ),
    },
    {
      key: "filterByKnowledgeArea",
      label: "Filter by Knowledge Area",
      children: (
        <Radio.Group className="radio-select">
          {verticals?.map((vertical) => (
            <Radio.Button value={vertical?.slug} key={vertical?.id}>
              <Flex justify="space-between" className="w-100">
                {vertical?.title}
                <CheckOutlined className="tick" />
              </Flex>
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      key: "filterByLocation",
      label: "Filter Location",
      children: (
        <Radio.Group className="radio-select">
          <Radio.Button value="topLeft">
            <Flex justify="space-between" className="w-100">
              Dubai
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="topRight">
            <Flex justify="space-between" className="w-100">
              Abu Dhabi
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="bottomLeft">
            <Flex justify="space-between" className="w-100">
              Sharjah
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="bottomRight">
            <Flex justify="space-between" className="w-100">
              Kalba
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
        </Radio.Group>
      ),
    },
  ];

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
              onClick={() => console.log("selected filters..")}
              placeholder="Sort By"
              options={[
                { value: "asc", label: "A-Z" },
                { value: "desc", label: "Z-A" },
              ]}
            />
            <DatePicker
              picker="month"
              placeholder="Date"
              allowClear={{ clearIcon: <CloseCircleOutlined /> }}
              format={"MMM, YYYY"}
              disabledDate={disabledDate}
            />
            <Select
              placeholder="Filter by Delivery Modes"
              options={[
                { value: "virtual", label: "Virtual Training" },
                { value: "live", label: "Live Training" },
              ]}
            />
            <Select
              placeholder="Filter by Knowledge Area"
              options={getVerticalOptions()}
            />
            <Select
              placeholder="Filter by Location"
              options={[
                {
                  value: "dubai",
                  label: (
                    <>
                      Dubai{" "}
                      <Badge color="blue" className={styles.autoSearchBadge} />
                    </>
                  ),
                },
                {
                  value: "abudhabi",
                  label: (
                    <>
                      Abu Dhabi{" "}
                      <Badge color="blue" className={styles.autoSearchBadge} />
                    </>
                  ),
                },
                {
                  value: "sharjah",
                  label: (
                    <>
                      Sharjah{" "}
                      <Badge color="blue" className={styles.autoSearchBadge} />
                    </>
                  ),
                },
                {
                  value: "kalba",
                  label: (
                    <>
                      Kalba{" "}
                      <Badge color="blue" className={styles.autoSearchBadge} />
                    </>
                  ),
                },
                {
                  value: "virtual",
                  label: (
                    <>
                      Virtual{" "}
                      <Badge color="green" className={styles.autoSearchBadge} />
                    </>
                  ),
                },
              ]}
            />
          </Flex>
          <Flex gap={"0.5rem"} style={{ flexFlow: "row wrap" }}>
            <Tag closeIcon>Next Week</Tag>
            <Tag closeIcon>Dubai</Tag>
          </Flex>
        </>
      )
    );
  };

  const getCoursesList = () => {
    return <GridCard courses={courses} />;
  };

  const getRenderer = () => {
    if (isCoursesLoading) {
      return (
        <Flex style={{ padding: "3rem 0" }} justify="center">
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
        <Flex align="center" justify="center" className="w-100">
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
              height={breakPoints?.md ? 380 : 150}
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
                    Choose the latest topics offered curated by our
                    professionals
                  </span>
                )}
              </Flex>
            </div>
          </div>
        </div>
        <div className={`${styles.exploreSearchWrapper}`}>
          <div className={styles.topicText}>
            {verticalCourse?.courses?.length || 0} Topics available
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
                  Filter <DownOutlined />
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
          <Flex vertical className="h-100" justify="space-between">
            <Tabs defaultActiveKey="1" items={items} />
            <Button
              type="primary"
              style={{ justifyContent: "center" }}
              onClick={() => setIsFilterDrawerVisible(false)}
            >
              Apply
            </Button>
          </Flex>
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
