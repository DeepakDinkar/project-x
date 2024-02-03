import { Button, Divider, Flex, Form, Input, InputNumber } from "antd";
import GridCard from "../../components/GridCard/GridCard";
import phoneNumberValidator from "../../error/Validations/phoneNumberValidator";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { ProfileForm } from "../../models/ProfileForm";
import styles from "./MyProfile.module.scss";

export default function MyProfile() {
  const breakPoints = useBreakPoint();
  const [form] = Form.useForm();

  const onProfileSubmit = (values: ProfileForm) => {
    console.log(values);
  };

  return (
    <div className={styles.myprofileWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"4.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Profile</div>
          <Form
            className={styles.profileForm}
            name="profileForm"
            form={form}
            onFinish={onProfileSubmit}
          >
            <Flex vertical gap={"1rem"}>
              <Flex
                vertical={!breakPoints?.md}
                style={{ gap: breakPoints?.md ? "1.5rem" : ".75rem" }}
              >
                <Form.Item<ProfileForm> label="Name">
                  <Form.Item<ProfileForm>
                    name="firstName"
                    style={{ flex: 1 }}
                    rules={[
                      { required: true, message: "*First Name is required" },
                    ]}
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
                    rules={[
                      { required: true, message: "*Last Name is required" },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      placeholder="Last Name*"
                      size="middle"
                    />
                  </Form.Item>
                </Form.Item>
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

              <Button className={styles.requestSubmitBtn} htmlType="submit">
                Send Request
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
