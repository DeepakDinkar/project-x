import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Drawer, Flex, Input } from "antd";
import { useState } from "react";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import { getSearchResultsByQuery } from "../../services/searchApi";
import debounce from "../../utils/debounceSearch";
import { SearchIcon } from "../../utils/svgs/SearchIcon";
import styles from "./GlobalSearch.module.scss";
import { Vertical } from "../../models/Vertical";
import { Course } from "../../models/Course";

export default function GlobalSearch() {
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const breakPoints = useBreakPoint();

  const {
    data: options,
    fetch,
  }: { data: { verticals: Vertical[]; courses: Course[] }; fetch: any } =
    useFetch(getSearchResultsByQuery);

  const getVerticalOptions = (verticals: Vertical[]) => {
    const options = verticals.map((vertical) => {
      return { value: vertical.title };
    });
    return options;
  };

  const getCourseOptions = (verticals: Course[]) => {
    const options = verticals.map((vertical) => {
      return { value: vertical.campaignTemplateCourseName };
    });
    return options;
  };

  const getOptions = () => {
    return [
      {
        label: "Verticals",
        options: options ? getVerticalOptions(options.verticals) : [],
      },
      {
        label: "Courses",
        options: options ? getCourseOptions(options.courses) : [],
      },
    ];
  };

  const searchCourses = (query: string) => {
    fetch(query);
  };

  const debouncedSearch = debounce(searchCourses, 300);

  return (
    <>
      {breakPoints?.lg ? (
        <AutoComplete
          className={`global-search ${styles.globalAutoComplete}`}
          style={{ height: "40px !important" }}
          options={getOptions()}
          placeholder={null}
        >
          <Input
            placeholder="Search"
            prefix={<SearchIcon />}
            size="middle"
            className={styles.globalSearchInput}
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
            options={getOptions()}
            placeholder={null}
            onSearch={(query) => debouncedSearch(query)}
          >
            <Input
              placeholder="Courses, topics, mentors...."
              size="middle"
              className={`${styles.globalSearchInput} ${styles.mobileSearch}`}
              suffix={
                <CloseOutlined onClick={() => setIsDrawerVisible(false)} />
              }
            />
          </AutoComplete>
        </Flex>
      </Drawer>
    </>
  );
}
