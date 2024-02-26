import { Button, Flex, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import emailValidator from "../../error/Validations/emailValidator";
import useFetch from "../../hooks/useFetch";
import { closeModal } from "../../redux/reducers/loginModalReducer";
import { forgetPassword } from "../../services/userApi";
import { MailIcon } from "../../utils/svgs/MailIcon";
import styles from "./Login/Login.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ModalView, useModalContext } from "../../context/ModalContext";

type ForgetPassword = {
  emailId: string;
};

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const { fetch, loading, error } = useFetch(forgetPassword);
  const { setView } = useModalContext();

  const onSubmit = (values: ForgetPassword) => {
    fetch(values).then(() => {
      setTimeout(() => {
        dispatch(closeModal());
      }, 3000);
    });
  };

  return (
    <div className="modal-container">
      <Form name="loginForm" onFinish={onSubmit}>
        <Flex vertical className={styles.modalWrapper}>
          <div className={styles.backBtn}>
            <ArrowLeftOutlined onClick={() => setView(ModalView.Login)} />
          </div>
          <h2>Forget Password</h2>
          <Form.Item
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
          <div style={{ padding: "3rem 0 5rem" }}>
            You will receive a mail on your registered email for a password
            change.
          </div>
          <Button
            htmlType="submit"
            type="primary"
            className={styles.btn}
            style={{ margin: "1.5rem auto 0" }}
            loading={loading}
          >
            Sign Up
          </Button>
          {error && <div className={styles.loginError}>{error.message}</div>}
        </Flex>
      </Form>
    </div>
  );
}
