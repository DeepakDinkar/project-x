import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GridCard from "../../components/GridCard/GridCard";
import { STATUS } from "../../constants/messages.constants";
import countryValidator from "../../error/Validations/countryValidator";
import phoneNumberValidator from "../../error/Validations/phoneNumberValidator";
import zipCodeValidator from "../../error/Validations/zipcodeValidator";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useFetch from "../../hooks/useFetch";
import useFetchOnLoad from "../../hooks/useFetchOnLoad";
import { Course } from "../../models/Course";
import { Status } from "../../models/ExceptionProps";
import { ProfileForm } from "../../models/ProfileForm";
import { VerticalData } from "../../models/Vertical";
import { setVerticals } from "../../redux/reducers/verticalsReducer";
import { getRecommendedCourses } from "../../services/courseApi";
import { getUserProfile, updateProfile } from "../../services/userApi";
import { getVerticals } from "../../services/verticalsApi";
import Country from "../../utils/Country/Country";
import Exception from "../../utils/Exception/Exception";
import styles from "./MyProfile.module.scss";

const getBase64 = (img: Blob, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: Blob) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function MyProfile() {
  const breakPoints = useBreakPoint();
  const [form] = Form.useForm();
  const pageRef = useRef<number>(1);
  const { data, loading: isProfileLoading } = useFetchOnLoad(getUserProfile);
  const { loading: isProfileUpdateLoading, fetch } = useFetch(updateProfile);
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getRecommendedCourses);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [courses, setCourses] = useState<Course[]>([]);

  const {
    data: verticals
  }: VerticalData = useFetchOnLoad(getVerticals);

  useEffect(() => {
    verticals && dispatch(setVerticals(verticals));
  }, [dispatch, verticals]);

  useEffect(() => {
    const getData = async () => {
      await coursesFetch(pageRef.current);
    };
    getData();
  }, [coursesFetch]);

  useEffect(() => {
    if (courseData?.content) {
      pageRef.current === 1
        ? setCourses(courseData?.content ?? [])
        : setCourses((courses) => [...courses, ...(courseData?.content ?? [])]);
    }
  }, [courseData, courseData?.content]);

  const getInitialValues = () => {
    if (data) {
      const { savedRecord } = data;
      return savedRecord;
    }
    return null;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as Blob, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onProfileSubmit = (values: ProfileForm) => {
    fetch(values);
  };

  const getCountryContent = () => {
    return (
      <Flex gap={".75rem"} vertical={!breakPoints?.md}>
        <Form.Item<ProfileForm>
          name="country"
          label="Country"
          style={{ flexGrow: 1 }}
          rules={[
            { required: true, message: "*Location is required" },
            { validator: countryValidator, message: "Invalid country" },
          ]}
        >
          <Country form={form} fieldKey="country" />
        </Form.Item>
        <Form.Item<ProfileForm>
          name="city"
          label={<>Town/{breakPoints?.md && <br />}City</>}
          style={{ flex: 1 }}
          rules={[{ required: true, message: "*City is required" }]}
        >
          <Input
            className={styles.input}
            placeholder="Town/City*"
            size="middle"
          />
        </Form.Item>
        <Form.Item<ProfileForm>
          name="zipcode"
          label="ZipCode"
          style={{ flex: 1 }}
          rules={[
            { required: true, message: "*Zip Code is required" },
            {
              validator: zipCodeValidator,
              message: "Zip code must be between 3 and 10 characters.",
            },
          ]}
        >
          <Input
            className={styles.input}
            placeholder="ZipCode*"
            size="middle"
          />
        </Form.Item>
      </Flex>
    );
  };

  const getAddressContent = () => {
    return (
      <Form.Item<ProfileForm> label="Address">
        <Flex gap={".75rem"}>
          <Form.Item<ProfileForm>
            name="addressLine1"
            rules={[{ required: true, message: "*Address Line1 is required" }]}
            style={{
              flex: 1,
            }}
          >
            <Input
              className={styles.input}
              placeholder="Address Line1"
              size="middle"
            />
          </Form.Item>
          <Form.Item<ProfileForm>
            name="addressLine2"
            style={{
              flex: 1,
            }}
          >
            <Input
              className={styles.input}
              placeholder="Address Line2"
              size="middle"
            />
          </Form.Item>
        </Flex>
      </Form.Item>
    );
  };

  const getNameContent = () => {
    return (
      <Form.Item<ProfileForm> label="Name" style={{ width: "100%" }}>
        <Flex gap={".75rem"}>
          <Form.Item<ProfileForm>
            name="firstName"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "*First Name is required" }]}
          >
            <Input
              className={styles.input}
              placeholder="First Name*"
              size="middle"
            />
          </Form.Item>
          <Form.Item<ProfileForm>
            name="lastName"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "*Last Name is required" }]}
          >
            <Input
              className={styles.input}
              placeholder="Last Name*"
              size="middle"
            />
          </Form.Item>
        </Flex>
      </Form.Item>
    );
  };

  const getProfileUploadContent = () => {
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    );
  };

  const getProfileContent = () => {
    return (
      <Form
        className={styles.profileForm}
        name="profileForm"
        labelAlign="left"
        labelWrap={true}
        form={form}
        onFinish={onProfileSubmit}
        initialValues={getInitialValues()}
      >
        {getProfileUploadContent()}
        <Flex vertical gap={"1rem"}>
          <Flex
            vertical={!breakPoints?.md}
            style={{ gap: breakPoints?.md ? "1.5rem" : ".75rem" }}
          >
            {getNameContent()}
          </Flex>
          <Flex
            vertical={!breakPoints?.md}
            style={{ gap: breakPoints?.md ? "1.5rem" : ".75rem" }}
          >
            <Form.Item<ProfileForm>
              label={<>Phone {breakPoints?.md && <br />} Number</>}
              name="mobile"
              style={{
                flex: 1,
              }}
              rules={[
                { required: true, message: "*Phone Number is required" },
                {
                  validator: phoneNumberValidator,
                },
              ]}
            >
              <InputNumber
                className={styles.input}
                placeholder="Phone Number"
                size="middle"
              />
            </Form.Item>
            <Form.Item<ProfileForm>
              name="emailId"
              label="Email"
              rules={[
                { required: true, message: "*Email ID is required" },
                { type: "email", message: "Invalid email address" },
              ]}
              style={{
                flex: 1,
              }}
            >
              <Input
                className={styles.input}
                placeholder="Email Address"
                size="middle"
              />
            </Form.Item>
          </Flex>
          {getAddressContent()}
          {getCountryContent()}
          <Button
            className={styles.profileSubmitBtn}
            htmlType="submit"
            loading={isProfileUpdateLoading}
          >
            Update Profile
          </Button>
        </Flex>
      </Form>
    );
  };

  const getRender = () => {
    if (isProfileLoading) {
      return (
        <Flex justify="center" align="center" gap={10}>
          <Spin size="large" />
        </Flex>
      );
    }

    return getProfileContent();
  };

  const loadMoreData = () => {
    pageRef.current = pageRef.current + 1;
    coursesFetch(pageRef.current);
  };

  const getLoadMoreButton = () => {
    return (
      pageRef.current < courseData?.totalPages && (
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

  const getCoursesRenderer = () => {
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

  return (
    <div className={styles.myprofileWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"1.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Profile</div>
          {getRender()}
        </Flex>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Recommended Courses</div>
        {getCoursesRenderer()}
      </div>
    </div>
  );
}
