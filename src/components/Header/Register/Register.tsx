import { Button, Flex, Form, Input, InputNumber, Select } from "antd";
import { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import phoneNumberValidator from "../../../error/Validations/phoneNumberValidator";
import { RegisterForm } from "../../../models/RegisterForm";
import { closeModal } from "../../../redux/reducers/loginModalReducer";
import styles from "../Login/Login.module.scss";
import { login } from "../../../redux/reducers/userReducer";

export default function Register() {
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onLoginSubmit = (values: RegisterForm) => {
    console.log("Register", values);
    dispatch(closeModal());
    dispatch(login({ userName: "John Doe" }));
  };

  const onNextClick = () => {
    form.validateFields().then(() => setIsNextStep(true));
  };

  const getFormContainer = (): ReactNode => {
    return (
      <Flex
        vertical
        gap={"1rem"}
        style={{ display: isNextStep ? "none" : "flex" }}
      >
        <Flex style={{ gap: ".75rem" }}>
          <Form.Item<RegisterForm>
            name="firstName"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "*First Name is required" }]}
          >
            <Input
              className={styles.input}
              placeholder="First Name"
              size="middle"
            />
          </Form.Item>
          <Form.Item<RegisterForm>
            name="lastName"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "*Last Name is required" }]}
          >
            <Input
              className={styles.input}
              placeholder="Last Name"
              size="middle"
            />
          </Form.Item>
        </Flex>
        <Form.Item<RegisterForm>
          name="email"
          rules={[
            { required: true, message: "*Email ID is required" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input
            className={styles.input}
            placeholder="Email ID"
            size="middle"
            style={{
              flexShrink: 0,
            }}
          />
        </Form.Item>
        <Form.Item<RegisterForm>
          name="phoneNumber"
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
            style={{
              flexShrink: 0,
            }}
          />
        </Form.Item>
        <Form.Item<RegisterForm>
          name="location"
          rules={[{ required: true, message: "*Location is required" }]}
        >
          <Select
            placeholder="Location (City, Country)"
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </Form.Item>
        <Button
          className={styles.btn}
          style={{ margin: "1.5rem auto 0" }}
          onClick={() => onNextClick()}
        >
          Next
        </Button>
      </Flex>
    );
  };

  const getPasswordContainer = (): ReactNode => {
    return (
      <Flex
        vertical
        style={{ display: isNextStep ? "flex" : "none" }}
        gap={"1rem"}
      >
        <Form.Item<RegisterForm>
          name="password"
          rules={[{ required: isNextStep, message: "*Password is required" }]}
        >
          <Input.Password
            className={styles.input}
            placeholder="Enter Password"
            size="middle"
            style={{
              flexShrink: 0,
            }}
          />
        </Form.Item>
        <Form.Item<RegisterForm>
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: isNextStep,
              message: "Confirm Password is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className={styles.input}
            placeholder="Confirm Password"
            size="middle"
            style={{
              flexShrink: 0,
            }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.btn}
          style={{ margin: "1.5rem auto 0" }}
        >
          Sign Up
        </Button>
      </Flex>
    );
  };

  return (
    <div className="modal-container">
      <Form name="registerForm" form={form} onFinish={onLoginSubmit}>
        <Flex vertical className={styles.modalWrapper}>
          <h2>Sign Up</h2>
          {getFormContainer()}
          {getPasswordContainer()}
        </Flex>
      </Form>
    </div>
  );
}
