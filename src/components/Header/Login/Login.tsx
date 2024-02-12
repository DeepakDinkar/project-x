/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Divider, Flex, Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import emailValidator from "../../../error/Validations/emailValidator";
import useFetch from "../../../hooks/useFetch";
import { LoginForm } from "../../../models/LoginForm";
import { login } from "../../../redux/reducers/userReducer";
import { loginUser } from "../../../services/userApi";
import { mapLoginFormPayLoad } from "../../../utils/formUtils";
import { FacebookIcon } from "../../../utils/svgs/FacebookIcon";
import { GoogleIcon } from "../../../utils/svgs/GoogleIcon";
import { MailIcon } from "../../../utils/svgs/MailIcon";
import { PasswordIcon } from "../../../utils/svgs/PasswordIcon";
import styles from "./Login.module.scss";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export default function Login({ setIsLogin }: Readonly<Props>) {
  const {
    fetch: loginFetch,
    loading: isLoginLoading,
    error: loginError,
  } = useFetch(loginUser);
  const dispatch = useDispatch();

  const responseMessage = (response: any) => {
    console.log(response);
    const details = jwtDecode(response.access_token);
    console.log(details);
    dispatch(login({ userName: "John Doe" }));
  };

  const onError = (response: any) => {
    console.log("error", response);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: onError,
  });

  const onLoginSubmit = (values: LoginForm) => {
    const payload = mapLoginFormPayLoad(values);
    loginFetch(payload);
  };

  const getLoginError =() => {
    const data: any = loginError?.response?.data; 
    return data?.message ?? 'Unexpected Error';
  }
 
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
            <Input.Password
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
          {loginError && <div className={styles.loginError}>{getLoginError()}</div>}

          <Divider className={styles.divider} />
          <Button className={styles.outlineBtn} onClick={() => googleLogin()}>
            <GoogleIcon style={{ paddingRight: ".5rem", flexShrink: 0 }} />{" "}
            Continue with google
          </Button>
          <Button className={styles.outlineBtn}>
            <FacebookIcon style={{ paddingRight: ".5rem", flexShrink: 0 }} />{" "}
            Continue with facebook
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
