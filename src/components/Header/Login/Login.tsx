/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ModalView, useModalContext } from "../../../context/ModalContext";
import emailValidator from "../../../error/Validations/emailValidator";
import useFetch from "../../../hooks/useFetch";
import { LoginForm } from "../../../models/LoginForm";
import { closeModal } from "../../../redux/reducers/loginModalReducer";
import { login } from "../../../redux/reducers/userReducer";
import { loginUser, loginWithGoogle } from "../../../services/userApi";
import { SessionStorageUtils } from "../../../utils/SessionStorageUtils";
import { mapLoginFormPayLoad } from "../../../utils/formUtils";
import { GoogleIcon } from "../../../utils/svgs/GoogleIcon";
import { MailIcon } from "../../../utils/svgs/MailIcon";
import { PasswordIcon } from "../../../utils/svgs/PasswordIcon";
import styles from "./Login.module.scss";

const IS_CHECKED_CLICKED = "isCheckOutClicked";

export default function Login() {
  const { setView } = useModalContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    fetch,
    loading: googleLoading,
    error: googleError,
  } = useFetch(loginWithGoogle);

  const {
    fetch: loginFetch,
    loading: isLoginLoading,
    error: loginError,
  } = useFetch(loginUser);
  const dispatch = useDispatch();
  const isCheckOutClicked = SessionStorageUtils.getItem(IS_CHECKED_CLICKED);

  const responseMessage = (response: any) => {
    fetch(response.access_token).then((data) => {
      data.userName = data.firstName;
      navigateToCheckout();
      dispatch(login(data));
      dispatch(closeModal());
    });
  };

  const onError = (response: any) => {
    console.log("error", response);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: onError,
  });

  const onLoginSubmit = async (values: LoginForm) => {
    const payload = await mapLoginFormPayLoad(values);

    loginFetch(payload).then((data) => {
      navigateToCheckout();
      dispatch(login(data));
      dispatch(closeModal());
    });
  };

  const navigateToCheckout = () => {
    if (isCheckOutClicked) {
      SessionStorageUtils.removeItem(IS_CHECKED_CLICKED);
      navigate("/checkout");
    }
  };

  return (
    <div className="modal-container">
      <Form name="loginForm" onFinish={onLoginSubmit}>
        <Flex vertical className={styles.modalWrapper}>
          <h2>{t("modals.login")}</h2>
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
          <Typography.Link
            className={styles.forgetPassword}
            onClick={() => setView(ModalView.ForgetPassword)}
          >
            {t("modals.forgetPassword")}
          </Typography.Link>
          <Button
            htmlType="submit"
            type="primary"
            className={styles.btn}
            style={{ margin: "1.5rem auto 0" }}
            loading={isLoginLoading}
          >
            {t("modals.login")}
          </Button>
          {loginError && (
            <div className={styles.loginError}>{loginError.message}</div>
          )}

          <Divider className={styles.divider} />
          <Button
            className={styles.outlineBtn}
            onClick={() => googleLogin()}
            loading={googleLoading}
          >
            <GoogleIcon style={{ paddingRight: ".5rem", flexShrink: 0 }} />{" "}
            {t("modals.google")}
          </Button>
          {googleError && (
            <div className={styles.loginError}>{googleError.message}</div>
          )}
          {/* <Button className={styles.outlineBtn} disabled>
            <FacebookIcon style={{ paddingRight: ".5rem", flexShrink: 0 }} />{" "}
            {t("modals.facebook")}
          </Button> */}
          <Divider className={styles.divider} />
          <div className={styles.signupContainer}>
            <span>{t("modals.membership")}</span>
            <p>
              <Button
                type="link"
                className={styles.signupBtn}
                onClick={() => setView(ModalView.Register)}
              >
                {t("modals.signup")}
              </Button>{" "}
              {t("modals.latestUpdates")}
            </p>
          </div>
        </Flex>
      </Form>
    </div>
  );
}
