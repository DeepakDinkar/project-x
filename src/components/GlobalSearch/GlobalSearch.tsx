import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Badge, Drawer, Empty, Flex, Input, Spin } from "antd";
import { FormEvent, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import { Course } from "../../models/Course";
import { GlobalSearchData } from "../../models/GlobalSearchValue";
import { Vertical } from "../../models/Vertical";
import { getSearchResultsByQuery } from "../../services/searchApi";
import debounce from "../../utils/debounceSearch";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./GlobalSearch.module.scss";

export default function GlobalSearch() {
  const navigate = useNavigate();
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const breakPoints = useBreakPoint();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    data: options,
    fetch,
    loading,
  }: GlobalSearchData = useFetch(getSearchResultsByQuery);

  const searchCourses = (query: string) => {
    fetch(query);
  };

  const routeToVerticalOrCourse = (link: string, slug: string) => {
    navigate(link);
    setSearchQuery(slug);
    setIsDrawerVisible(false);
  };

  const debouncedSearch = debounce(searchCourses, 1000);

  const isSearchResultsEmpty =
    options && options?.courses.length == 0 && options?.verticals.length == 0;

  const inputSearch = (event: FormEvent<HTMLInputElement>) => {
    const query = (event.target as HTMLInputElement).value;
    setSearchQuery(query);
  };

  const getVerticalOptions = (verticals: Vertical[]) => {
    const options = verticals?.map((vertical: Vertical) => {
      return {
        value: vertical.title,
        label: (
          <button
            key={vertical.id}
            className={styles.autoSearchButton}
            onClick={() => routeToVerticalOrCourse(`/verticals/${vertical.slug}`, vertical.slug)}
          >
            {vertical.title}{" "}
            <Badge color="yellow" className={styles.autoSearchBadge} />
          </button>
        ),
      };
    }) || [];
    return {
      label: <Fragment key="verticals">Verticals</Fragment>,
      options: options ?? [],
    };
  };

  const getCourseOptions = (courses: Course[]) => {
    const options = courses?.map((course: Course) => {
      return {
        value: course.campaignTemplateCourseName,
        label: (
          <button
            key={course.id}
            className={styles.autoSearchButton}
            onClick={() => routeToVerticalOrCourse(`/courses/${course.id}`, course.campaignTemplateCourseName)}
          >
            {course.campaignTemplateCourseName}{" "}
            <Badge color="cyan" className={styles.autoSearchBadge} />
          </button>
        ),
      };
    }) || [];
    return {
      label: <Fragment key="courses">Courses</Fragment>,
      options: options ?? [],
    };
  };

  const getLoadingOption = () => {
    return [
      {
        label: <></>,
        options: [
          {
            value: "",
            label: (
              <Flex vertical justify="center" align="center">
                <Spin size="default" />
              </Flex>
            ),
          },
        ],
      },
    ];
  };

  const getNoResultOption = () => {
    return [
      {
        label: <></>,
        options: [
          {
            label: (
              <Flex vertical justify="center" align="center">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Verticals/Courses found"
                />
              </Flex>
            ),
          },
        ],
      },
    ];
  };

  const getOptions = () => {
    if (loading) {
      return getLoadingOption();
    }

    if (isSearchResultsEmpty) {
      return getNoResultOption();
    }

    const filterOptions = [];

    if (options?.verticals && options?.verticals.length > 0) {
      const verticalOptions = getVerticalOptions(options?.verticals);
      filterOptions.push(verticalOptions);
    }

    if (options?.courses && options?.courses.length > 0) {
      const courseOptions = getCourseOptions(options?.courses);
      filterOptions.push(courseOptions);
    }

    return filterOptions;
  };

  return (
    <>
      {breakPoints?.lg ? (
        <AutoComplete
          className={`global-search ${styles.globalAutoComplete}`}
          style={{ height: "40px !important" }}
          options={searchQuery.trim() !== "" ? getOptions() : []}
          onSearch={(query) => debouncedSearch(query)}
          value={searchQuery}
          placeholder={null}
        >
          <Input
            placeholder="Search"
            prefix={<SearchIcon />}
            size="middle"
            className={styles.globalSearchInput}
            onChange={inputSearch}
          />
        </AutoComplete>
      ) : (
        <SearchOutlined
          className={styles.headerIcon}
          onClick={() => setIsDrawerVisible(true)}
        />
      )}
      <Drawer
        height={"auto"}
        placement="top"
        size="default"
        closable={true}
        styles={{ header: { display: "none" } }}
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        style={{ zIndex: 99998 }}
      >
        <Flex vertical>
          <div className={styles.searchText}>Search</div>
          <AutoComplete
            className={`global-search ${styles.globalAutoComplete} ${styles.mobileAutoComplete}`}
            style={{ height: "40px !important" }}
            options={searchQuery.trim() !== "" ? getOptions() : []}
            placeholder={null}
            value={searchQuery}
            onSearch={(query) => debouncedSearch(query)}
          >
            <Input
              placeholder="Courses, topics, mentors...."
              size="middle"
              className={`${styles.globalSearchInput} ${styles.mobileSearch}`}
              
              onChange={inputSearch}
              suffix={
                <CloseOutlined
                  onClick={() => {
                    setIsDrawerVisible(false);
                    setSearchQuery('');
                  }}
                />
              }
            />
          </AutoComplete>
        </Flex>
      </Drawer>
    </>
  );
}
