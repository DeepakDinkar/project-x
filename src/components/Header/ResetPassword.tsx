import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ModalView, useModalContext } from "../../context/ModalContext";
import useFetch from "../../hooks/useFetch";
import { resetPassword } from "../../services/userApi";
import { mapResetPasswordPayLoad } from "../../utils/formUtils";
import styles from "./Login/Login.module.scss";

const TOKEN = 'token';

type ResetPassword = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const { t } = useTranslation();
  const { fetch, loading, error } = useFetch(resetPassword);
  const { setView } = useModalContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get(TOKEN) ?? '';

  const onSubmit = (values: ResetPassword) => {
    const payload = mapResetPasswordPayLoad(values, token);
    fetch(payload).then(() => {
      message.success("Password updated successfully");
      setView(ModalView.Login);
    });
  };

  return (
    <div className="modal-container">
      <Form name="loginForm" onFinish={onSubmit}>
        <Flex vertical className={styles.modalWrapper}>
          <div className={styles.backBtn}>
            <ArrowLeftOutlined onClick={() => setView(ModalView.Login)} />
          </div>
          <h2>{t("modals.resetPassword")}</h2>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "*Password is required",
              },
            ]}
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
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
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
            loading={loading}
          >
            {t("modals.reset")}
          </Button>
          {error && <div className={styles.loginError}>{error.message}</div>}
        </Flex>
      </Form>
    </div>
  );
}
