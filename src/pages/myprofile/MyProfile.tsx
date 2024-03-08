import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Spin,
  Upload,
  UploadProps,
  message
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const {
    data,
    loading: isProfileLoading,
    error: profileError,
  } = useFetchOnLoad(getUserProfile);
  const {
    data: profileResponse,
    loading: isProfileUpdateLoading,
    fetch,
  } = useFetch(updateProfile);
  const {
    loading: isCoursesLoading,
    data: courseData,
    error: isCoursesError,
    fetch: coursesFetch,
  } = useFetch(getRecommendedCourses);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const imageUrlRef = useRef<string>();

  const { data: verticals }: VerticalData = useFetchOnLoad(getVerticals);

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
    if (data ?? data.imageUrl) {
      imageUrlRef.current = data.imageUrl;
    }
    return data ?? null;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj as Blob, (url: string) => {
        if (url !== "") {
          imageUrlRef.current = url;
        }
        setLoading(false);
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
    values.imageUrl = imageUrlRef.current ?? "";
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
          <Country form={form} fieldKey="country" fieldValue={data?.country} />
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
          name="zipCode"
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
            name="address1"
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
            name="address2"
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
        <Form.Item<ProfileForm>>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            action={""}
          >
            {imageUrlRef.current ? (
              <img
                src={imageUrlRef.current}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
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
              name="phoneNo"
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
              name="email"
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
                disabled
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
            {t("userProfilePage.updateProfileBtn")}
          </Button>
          {profileResponse && (
            <div className={styles.profileSuccess}>
              {"Profile updated successfully"}
            </div>
          )}
          {profileError && (
            <div className={styles.profileError}>{profileError?.message}</div>
          )}
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

    if (profileError) {
      return (
        <Exception
          status={Status.SERVER_ERROR}
          subTitle={STATUS.SERVER_ERROR}
        />
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
          {t("utils.loadMoreBtn")}
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

  return (
    <div className={styles.myprofileWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"1.5rem"}>
          <div className="main-header font-bold font-ubuntu">
            {t("userProfilePage.title")}
          </div>
          {getRender()}
        </Flex>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">
          {t("utils.recommendedCourses")}
        </div>
        {getCoursesRenderer()}
      </div>
    </div>
  );
}
