import { Button, Flex, Input, Select } from "antd";
import styles from "../Login/Login.module.scss";

export default function Register() {
  return (
    <div className="modal-container">
      <Flex vertical className={styles.modalWrapper}>
        <h2>Sign Up</h2>
        <>
          <Flex style={{ gap: ".75rem" }}>
            <Input
              className={styles.input}
              placeholder="First Name"
              size="middle"
            />
            <Input
              className={styles.input}
              placeholder="First Name"
              size="middle"
            />
          </Flex>
          <Input
            className={styles.input}
            placeholder="Email ID"
            size="middle"
            style={{
              flexShrink: 0,
            }}
          />
          <Input
            className={styles.input}
            placeholder="Phone Number"
            size="middle"
            style={{
              flexShrink: 0,
            }}
          />
          <Select
            placeholder="Categories"
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
          <Button className={styles.btn} style={{ margin: "1.5rem auto 0" }}>
            Next
          </Button>
        </>
        <>
          <Input
            className={styles.input}
            placeholder="Enter Password"
            size="middle"
            style={{
              flexShrink: 0,
            }}
          />
          <Input
            className={styles.input}
            placeholder="Confirm Password"
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
            Sign Up
          </Button>
        </>
      </Flex>
    </div>
  );
}
