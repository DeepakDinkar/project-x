import {
  Badge,
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Steps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import countryValidator from "../../error/Validations/countryValidator";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import useCart from "../../hooks/useCart";
import useFetch from "../../hooks/useFetch";
import { Course } from "../../models/Course";
import { SaveAddressForm } from "../../models/SaveAddressForm";
import { purchaseCourses } from "../../services/userApi";
import Country from "../../utils/Country/Country";
import { mapPurchasePayLoad } from "../../utils/purchaseUtils";
import { CartSuccess } from "../../utils/svgs/CartSuccess";
import styles from "./Checkout.module.scss";
import { CartFailure } from "../../utils/svgs/CartFailure";
import { StripeLogo } from "../../utils/svgs/StripeLogo";

enum Payment {
  SUCCESS = "success",
  FAILURE = "failure",
  IDLE = "idle",
}

export default function Checkout() {
  const breakPoint = useBreakPoint();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { fetch, loading } = useFetch(purchaseCourses);
  const { clearCart } = useCart();
  const courses: Course[] =
    useSelector((state: { cart: { items: Course[] } }) => state.cart)?.items ||
    [];
  const addressRef = useRef<SaveAddressForm>();
  const saveAddressRef = useRef<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<Payment>(Payment.IDLE);

  const totalPrice = courses.reduce(
    (total, course) => total + (course?.courseAmt ?? 0),
    0
  );
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!courses || courses?.length == 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses?.length, navigate]);

  const getLiveOrVirtualLocation = (course: Course) => {
    if (course.location) {
      const location = course.location[course.locationIndex ?? 0];
      return (
        <span className={`${location.locationName ? "face2face" : "live"}`}>
          {location.locationName ? (
            <Flex gap={5} align="center">
              <Badge color="purple" />

              <span className="font-sm">Face 2 Face</span>
            </Flex>
          ) : (
            <Flex gap={5} align="center">
              <Badge color="green" />
              <span className="font-sm">Live Virtual Training</span>
            </Flex>
          )}
        </span>
      );
    }
  };

  const getCourseLocation = (course: Course) => {
    if (course?.location && course?.locationIndex != null) {
      const location = course.location[course.locationIndex];
      if (location) {
        const locationName = location.locationName;
        return locationName
          ? locationName + " | " + dayjs(location.date).format("MMM D, YYYY")
          : "Virtual";
      }
      return "";
    }
    return "";
  };

  const onSaveAddressSubmit = (values: SaveAddressForm) => {
    addressRef.current = values;
    setCurrentStep(1);
  };

  const onSaveAddressChange = (event: { target: { checked: boolean } }) => {
    saveAddressRef.current = event.target.checked;
  };

  const proceedPayment = async () => {
    const payload = mapPurchasePayLoad(
      courses,
      addressRef.current,
      saveAddressRef.current
    );
    fetch(payload)
      .then(() => {
        setPaymentStatus(Payment.SUCCESS);
      })
      .catch(() => {
        setPaymentStatus(Payment.FAILURE);
      })
      .finally(() => {
        setIsPaymentModalOpen(true);
      });
  };

  const getBillingTitle = () => {
    return (
      <Flex className={styles.billingHeader} align="center">
        Billing Info
      </Flex>
    );
  };

  const getPaymentTitle = () => {
    return (
      <Flex className={styles.billingHeader} align="center">
        Payment
      </Flex>
    );
  };

  const getBillingContent = () => {
    return (
      <div className={currentStep === 1 ? styles.stepDisabled : ""}>
        <Form name="billingForm" form={form} onFinish={onSaveAddressSubmit}>
          <Form.Item<SaveAddressForm>
            name="addressName"
            label={
              <>
                Address
                {breakPoint?.md && <br />} Name*
              </>
            }
            rules={[{ required: true, message: "*Address Name is required" }]}
          >
            <Input className={styles.input} placeholder="Address Name*" />
          </Form.Item>
          <Form.Item label="Address">
            <Form.Item<SaveAddressForm>
              name="addressLine1"
              rules={[
                { required: true, message: "*Address Line 1 is required" },
              ]}
            >
              <Input className={styles.input} placeholder="Street Name" />
            </Form.Item>
            <Form.Item<SaveAddressForm>
              name="addressLine2"
              rules={[
                { required: true, message: "*Address Line 2 is required" },
              ]}
            >
              <Input
                className={styles.input}
                placeholder="Apartment, Suite, Unit etc.*"
              />
            </Form.Item>
          </Form.Item>
          <Flex gap={".75rem"} vertical={!breakPoint?.md}>
            <Form.Item<SaveAddressForm>
              name="country"
              label="Country"
              style={{ flexGrow: 1 }}
              rules={[
                { required: true, message: "*Location is required" },
                { validator: countryValidator, message: "Invalid country" },
              ]}
            >
              <Country form={form} fieldKey="country" />
            </Form.Item>
            <Form.Item<SaveAddressForm>
              name="city"
              label="City"
              className={styles.city}
              style={{ flex: 1 }}
              rules={[{ required: true, message: "*City is required" }]}
            >
              <Input
                className={styles.input}
                placeholder="Town/City*"
                size="middle"
              />
            </Form.Item>
            <Form.Item<SaveAddressForm>
              name="zipCode"
              label="Zip Code*"
              style={{ flex: 1 }}
              rules={[{ required: true, message: "*Zip Code is required" }]}
            >
              <Input className={styles.input} placeholder="Zip Code*" />
            </Form.Item>
          </Flex>
          <Checkbox
            className={styles.saveAddressCheckbox}
            onChange={onSaveAddressChange}
          >
            Save Address for future purpose
          </Checkbox>
          <Button htmlType="submit" className={styles.formSubmitBtn}>
            Save Address
          </Button>
        </Form>
      </div>
    );
  };

  const getPaymentContent = () => {
    return (
      currentStep === 1 && (
        <Flex vertical className={styles.paymentBtnWrapper}>
          <div>
            <span className={styles.totalText}>Total</span> ({courses?.length}{" "}
            item{courses.length > 1 && "s"}) &nbsp; &nbsp;
            <span className={styles.totalText}>${totalPrice}</span>
          </div>

          <div className="font-sm">Do not refresh the page while processing payment</div>
          <Button
            className={styles.formSubmitBtn}
            disabled={totalPrice === 0}
            onClick={proceedPayment}
            loading={loading}
          >
            Pay with <StripeLogo className={styles.stripeIcon} />
          </Button>
        </Flex>
      )
    );
  };

  const handlePaymentModalCancel = () => {
    if (paymentStatus == Payment.SUCCESS) {
      clearCart();
      navigate("/mypurchases");
    }
  };

  const getSuccessPaymentContent = () => {
    return (
      <>
        <h2>
          Booking <br /> Successful!
        </h2>
        <CartSuccess />
        <p>
          All the details regarding your course booking will be sent over to
          your registered <b>email address.</b>
        </p>
      </>
    );
  };

  const getFailurePaymentContent = () => {
    return (
      <>
        <h2 className={styles.paymentFailureTitle}>
          Uh Oh!
          <br />
          Booking Unsuccessful
        </h2>
        <CartFailure />
        <p>Something has gone wrong. Please try again to make your booking.</p>
      </>
    );
  };

  const getPaymentModal = () => {
    return (
      <Modal
        destroyOnClose={true}
        open={isPaymentModalOpen}
        centered
        closable={true}
        onCancel={() => setIsPaymentModalOpen(false)}
        afterClose={handlePaymentModalCancel}
        footer={null}
      >
        <div className="modal-container">
          <Flex
            vertical
            className={styles.modalWrapper}
            justify="center"
            align="center"
            gap={"1.5rem"}
          >
            {paymentStatus === Payment.SUCCESS
              ? getSuccessPaymentContent()
              : getFailurePaymentContent()}
          </Flex>
        </div>
      </Modal>
    );
  };

  return (
    <div className={styles.checkoutWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"2.5rem"}>
          <div className="main-header font-bold font-ubuntu">Checkout</div>
          <div className="w-100">
            <Row>
              <Col span={breakPoint?.lg ? 12 : 24}>
                <div className={styles.billingFormWrapper}>
                  <Steps
                    className={styles.billingFormCollapse}
                    direction="vertical"
                    size={breakPoint?.md ? "default" : "small"}
                    current={currentStep}
                    items={[
                      {
                        title: getBillingTitle(),
                        description: getBillingContent(),
                        disabled: currentStep == 1,
                      },
                      {
                        title: getPaymentTitle(),
                        description: getPaymentContent(),
                        disabled: currentStep == 0,
                      },
                    ]}
                  />
                </div>
              </Col>
              <Col span={breakPoint?.lg ? 12 : 24}>
                <div className={styles.checkoutCourseContainer}>
                  <Flex vertical gap={"1.5rem"}>
                    {courses.map((course: Course) => (
                      <Flex
                        justify="space-between"
                        align="center"
                        key={course.id}
                      >
                        <Flex gap={"1.5rem"}>
                          <Image
                            style={{ borderRadius: "10px" }}
                            width={breakPoint?.md ? 110 : 64}
                            height={breakPoint?.md ? 110 : 64}
                            preview={false}
                            src={course.imageUrl}
                          />
                          <Flex
                            vertical
                            style={{ flex: 1, justifyContent: "space-evenly" }}
                          >
                            <div className="font-sm text-uppercase">
                              {course?.slug}
                            </div>
                            <div className="font-default font-bold">
                              {course?.campaignTemplateCourseName}
                            </div>
                            <div className="font-sm">
                              {getCourseLocation(course)}
                            </div>
                            {getLiveOrVirtualLocation(course)}
                          </Flex>
                        </Flex>
                        <div className="font-sm font-bold">
                          ${course?.courseAmt ?? 0}
                        </div>
                      </Flex>
                    ))}
                  </Flex>
                  <Flex className={styles.couponCodeWrapper}>
                    <Input disabled />
                    <Button disabled>Apply Code</Button>
                  </Flex>
                  <Flex className={styles.totalWrapper}>
                    <table>
                      <tbody>
                        <tr>
                          <td>VAT</td>
                          <td>$0</td>
                        </tr>
                        <tr>
                          <td>
                            <span className={styles.totalText}>Total</span> (
                            {courses?.length} item{courses.length > 1 && "s"})
                          </td>
                          <td>
                            <span className={styles.totalText}>
                              ${totalPrice}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Flex>
                </div>
              </Col>
            </Row>
          </div>
        </Flex>
      </div>
      {getPaymentModal()}
    </div>
  );
}
