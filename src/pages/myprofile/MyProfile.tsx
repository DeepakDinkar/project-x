import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Upload,
  UploadProps,
  message
} from "antd";
import { useState } from "react";
import GridCard from "../../components/GridCard/GridCard";
import countryValidator from "../../error/Validations/countryValidator";
import phoneNumberValidator from "../../error/Validations/phoneNumberValidator";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { ProfileForm } from "../../models/ProfileForm";
import Country from "../../utils/Country/Country";
import styles from "./MyProfile.module.scss";


const getBase64 = (img: Blob, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: Blob) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function MyProfile() {
  const breakPoints = useBreakPoint();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info);
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
    console.log(values);
  };

  const getCountryContent = () => {
    return (
      <Flex gap={".75rem"} vertical={!breakPoints?.md}>
        <Form.Item<ProfileForm>
          name="country"
          label="Country"
          rules={[
            { required: true, message: "*Location is required" },
            { validator: countryValidator, message: "Invalid country" },
          ]}
        >
          <Country form={form} fieldKey="location" />
        </Form.Item>
        <Form.Item<ProfileForm>
          name="city"
          label="City"
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
          name="city"
          label="ZipCode"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "*Zip Code is required" }]}
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
            rules={[{ required: true, message: "*Address Line2 is required" }]}
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

  return (
    <div className={styles.myprofileWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"1.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Profile</div>
          <Form
            className={styles.profileForm}
            name="profileForm"
            form={form}
            onFinish={onProfileSubmit}
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
                  label="Phone Number"
                  name="phoneNumber"
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
                  />
                </Form.Item>
              </Flex>
              {getAddressContent()}
              {getCountryContent()}
              <Button className={styles.profileSubmitBtn} htmlType="submit">
                Update Profile
              </Button>
            </Flex>
          </Form>
        </Flex>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Recommended Courses</div>
        <GridCard courses={[]} />
      </div>
    </div>
  );
}
