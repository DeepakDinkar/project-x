/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckOutlined } from "@ant-design/icons";
import { Button, Flex, Radio, Tabs, TabsProps } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { Vertical } from "../../models/Vertical";

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
  [key: string]: string | boolean;
};

type Props = {
  filterOptions: FilterOptions | undefined;
  locations: string[];
  slug: string | undefined;
  verticals: Vertical[];
  handleMobileFilter: (...args: any) => void;
};

export default function MobileFilter({
  filterOptions,
  locations,
  slug,
  verticals,
  handleMobileFilter,
}: Props) {
  const mobileFilterOptions = useRef<FilterOptions>();

  const onSelectionChange = (key: string, value: any) => {
    const options = mobileFilterOptions.current ?? {};

    if (key === FilterType.FROM_DATE) {
      options[FilterType.FROM_DATE] = dayjs(value).startOf("month").format("YYYY-MM-DD");
      options[FilterType.TO_DATE] = dayjs(value).endOf("month").format("YYYY-MM-DD");
    } else {
      options[key] = value;
    }

    mobileFilterOptions.current = options;
  };

  const getCurrentYearMonths = () => {
    const currentYear = dayjs().year();
    const months = [];
    for (let month = 0; month < 12; month++) {
      const date = dayjs().year(currentYear).month(month).startOf("month");
      months.push(date);
    }
    return months;
  };

  const items: TabsProps["items"] = [
    {
      key: "sortBy",
      label: "Sort by",
      children: (
        <Radio.Group
          className="radio-select"
          defaultValue={filterOptions?.sortBy}
          onChange={(c) => onSelectionChange(FilterType.SORT, c.target.value)}
        >
          <Radio.Button value={true}>
            <Flex justify="space-between" className="w-100">
              A - Z
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value={false}>
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
        <Radio.Group
          className="radio-select"
          defaultValue={filterOptions?.fromDate}
          onChange={(c) =>
            onSelectionChange(FilterType.FROM_DATE, c.target.value)
          }
        >
          {getCurrentYearMonths().map((month, index: number) => (
            <Radio.Button value={month.format("YYYY-MM-DD")} key={index}>
              <Flex justify="space-between" className="w-100">
                {month?.format("MMM, YYYY")}
                <CheckOutlined className="tick" />
              </Flex>
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      key: "filterByDeliveryModes",
      label: "Filter by Delivery Modes",
      children: (
        <Radio.Group
          className="radio-select"
          defaultValue={filterOptions?.deliveryMode}
          onChange={(c) =>
            onSelectionChange(FilterType.DELIVERY_MODE, c.target.value)
          }
        >
          <Radio.Button value="live">
            <Flex justify="space-between" className="w-100">
              Live Training
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
          <Radio.Button value="virtual">
            <Flex justify="space-between" className="w-100">
              Virtual Training
              <CheckOutlined className="tick" />
            </Flex>
          </Radio.Button>
        </Radio.Group>
      ),
    },
    {
      key: "filterByVerticals",
      label: "Filter by Verticals",
      children: (
        <Radio.Group
          className="radio-select"
          defaultValue={slug}
          onChange={(c) => onSelectionChange(FilterType.SLUG, c.target.value)}
        >
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
        <Radio.Group
          className="radio-select"
          defaultValue={filterOptions?.location}
        >
          {locations?.map((location) => (
            <Radio.Button value={location} key={location}>
              <Flex justify="space-between" className="w-100">
                {location}
                <CheckOutlined className="tick" />
              </Flex>
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
  ];

  const handleApply = () => {
    handleMobileFilter(mobileFilterOptions.current ?? {});
  };

  return (
    <Flex vertical className="h-100" justify="space-between">
      <Tabs defaultActiveKey="1" items={items} />
      <Button
        type="primary"
        style={{ justifyContent: "center" }}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Flex>
  );
}
