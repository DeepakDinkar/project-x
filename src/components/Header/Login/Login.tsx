import { Button, Divider, Flex, Input } from "antd";
import { FacebookIcon } from "../../../utils/svgs/FacebookIcon";
import { GoogleIcon } from "../../../utils/svgs/GoogleIcon";
import { MailIcon } from "../../../utils/svgs/MailIcon";
import { PasswordIcon } from "../../../utils/svgs/PasswordIcon";
import styles from "./Login.module.scss";

type LoginProps = {
  setIsLogin: (isLogin: boolean) => void;
};

export default function Login({ setIsLogin }: LoginProps) {
  return (
    <div className="modal-container">
      <Flex vertical className={styles.modalWrapper}>
        <h2>Log in</h2>
        <Input
          className={styles.input}
          placeholder="Email ID"
          prefix={<MailIcon />}
          size="middle"
          style={{
            flexShrink: 0,
          }}
        />
        <Input
          className={styles.input}
          placeholder="Password"
          prefix={<PasswordIcon />}
          size="middle"
          style={{
            flexShrink: 0,
          }}
        />
        <Button
          type="primary"
          className={styles.btn}
          style={{ margin: "1.5rem auto 0" }}
        >
          Log in
        </Button>
        <Divider className={styles.divider} />
        <Button className={styles.outlineBtn}>
          <GoogleIcon style={{ paddingRight: ".5rem" }} /> Continue with google
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
    </div>
  );
}
