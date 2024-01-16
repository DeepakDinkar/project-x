import { useGoogleLogin } from "@react-oauth/google";
import { Button, Divider, Flex, Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";
import { Dispatch, SetStateAction, useState } from "react";
import emailValidator from "../../../error/Validations/emailValidator";
import { LoginForm } from "../../../models/LoginForm";
import { FacebookIcon } from "../../../utils/svgs/FacebookIcon";
import { GoogleIcon } from "../../../utils/svgs/GoogleIcon";
import { MailIcon } from "../../../utils/svgs/MailIcon";
import { PasswordIcon } from "../../../utils/svgs/PasswordIcon";
import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/reducers/userReducer";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export default function Login({ setIsLogin }: Readonly<Props>) {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseMessage = (response: any) => {
    const details = jwtDecode(response.credential);
    console.log(details);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseMessage,
  });

  const onLoginSubmit = (values: LoginForm) => {
    setIsLoginLoading(true);

    setTimeout(() => {
      console.log("Success:", values);
      setIsLoginLoading(false);
      dispatch(login());
    }, 5000);
  };

  return (
    <div className="modal-container">
      <Form name="loginForm" onFinish={onLoginSubmit}>
        <Flex vertical className={styles.modalWrapper}>
          <h2>Log in</h2>
          <Form.Item<LoginForm>
            name="email"
            rules={[
              { required: true, message: "*Email is required" },
              { validator: emailValidator, message: "Invalid email" },
            ]}
          >
            <Input
              className={styles.input}
              placeholder="Email ID"
              prefix={<MailIcon />}
              size="middle"
              style={{
                flexShrink: 0,
              }}
            />
          </Form.Item>
          <Form.Item<LoginForm>
            name="password"
            rules={[{ required: true, message: "*Password is required" }]}
          >
            <Input
              type="password"
              className={styles.input}
              placeholder="Password"
              prefix={<PasswordIcon />}
              size="middle"
              style={{
                flexShrink: 0,
              }}
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            className={styles.btn}
            style={{ margin: "1.5rem auto 0" }}
            loading={isLoginLoading}
          >
            Log in
          </Button>

          <Divider className={styles.divider} />
          <Button className={styles.outlineBtn} onClick={() => googleLogin()}>
            <GoogleIcon style={{ paddingRight: ".5rem" }} /> Continue with
            google
          </Button>
          <Button className={styles.outlineBtn}>
            <FacebookIcon style={{ paddingRight: ".5rem" }} /> Continue with
            facebook
          </Button>
          <Divider className={styles.divider} />
          <div className={styles.signupContainer}>
            <span>Not a member?</span>
            <p>
              <Button
                type="link"
                className={styles.signupBtn}
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </Button>{" "}
              to get latest updates and exciting offers on courses
            </p>
          </div>
        </Flex>
      </Form>
    </div>
  );
}
