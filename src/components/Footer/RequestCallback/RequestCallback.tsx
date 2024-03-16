import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";
import phoneNumberValidator from "../../../error/Validations/phoneNumberValidator";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import useFetch from "../../../hooks/useFetch";
import {
  CallBackMode,
  RequestCallbackForm,
} from "../../../models/RequestCallbackForm";
import { requestCallback } from "../../../services/qomoiApi";
import styles from "../Footer.module.scss";

export default function RequestCallback() {
  const [form] = Form.useForm();
  const breakPoints = useBreakPoint();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const { fetch, loading } = useFetch(requestCallback);

  const initalValues = { callBackMode: CallBackMode.PHONE };

  const onRequestCallbackSubmit = (values: RequestCallbackForm) => {
    fetch(values)
      .then(() => {
        messageApi.success("Will callback you later.");
        form.resetFields();
      })
      .catch(() =>
        messageApi.error("Unable to send request. Please try later.")
      );
  };

  const getDiscountOptions = () => {
    return [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ];
  };

  return (
    <div className={styles.requestCallbackWrapper}>
      <p className={styles.requestCallbackHeader}>
        {t("footer.requestCallback.title")}
      </p>
      <Form
        className={styles.requestCallbackForm}
        name="requestCallbackForm"
        form={form}
        onFinish={onRequestCallbackSubmit}
        initialValues={initalValues}
      >
        <Flex vertical gap={"1rem"}>
          <Flex
            vertical={!breakPoints?.md}
            style={{ gap: breakPoints?.md ? "1.5rem" : ".75rem" }}
          >
            <Form.Item<RequestCallbackForm>
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
            <Form.Item<RequestCallbackForm>
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
          <Flex
            vertical={!breakPoints?.md}
            style={{ gap: breakPoints?.md ? "1.5rem" : ".75rem" }}
          >
            <Form.Item<RequestCallbackForm>
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
            <Form.Item<RequestCallbackForm>
              name="email"
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
          <Form.Item<RequestCallbackForm>
            style={{ maxWidth: !breakPoints?.md ? 288 : "auto" }}
          >
            <Select
              placeholder="Is this in a reference to group discount?"
              options={getDiscountOptions()}
              listHeight={150}
            />
          </Form.Item>

          <Form.Item<RequestCallbackForm> name="comment">
            <TextArea
              rows={4}
              placeholder={t("footer.requestCallback.textAreaPlaceholderText")}
            />
          </Form.Item>

          <Form.Item<RequestCallbackForm> name="callbackMode">
            <Radio.Group defaultValue={initalValues.callBackMode}>
              <Radio value={CallBackMode.PHONE}>Let’s have a phone call</Radio>
              <Radio value={CallBackMode.EMAIL}>Email please</Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            className={styles.requestSubmitBtn}
            htmlType="submit"
            loading={loading}
          >
            {t("footer.requestCallback.requestCallbackBtn")}
          </Button>
          {contextHolder}
        </Flex>
      </Form>
    </div>
  );
}
