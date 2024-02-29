import {
  Badge,
  Button,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Form,
  Image,
  Input,
  Row,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import countryValidator from "../../error/Validations/countryValidator";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { Course } from "../../models/Course";
import { SaveAddressForm } from "../../models/SaveAddressForm";
import Country from "../../utils/Country/Country";
import { BillingIcon } from "../../utils/svgs/BillingIcon";
import styles from "./Checkout.module.scss";
import { mapPurchasePayLoad } from "../../utils/purchaseUtils";
import useFetch from "../../hooks/useFetch";
import { purchaseCourses } from "../../services/userApi";
import { clearCart } from "../../redux/reducers/cartReducer";

export default function Checkout() {
  const breakPoint = useBreakPoint();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { fetch, loading } = useFetch(purchaseCourses);
  const courses: Course[] =
    useSelector((state: { cart: { items: Course[] } }) => state.cart)?.items ||
    [];

  const totalPrice = courses.reduce(
    (total, course) => total + (course?.price ?? 0),
    0
  );

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
    console.log(values);
  };

  const proceedPayment = async () => {
    const payload = mapPurchasePayLoad(courses);
    fetch(payload);
    dispatch(clearCart());
  };

  const items: CollapseProps["items"] = [
    {
      key: "billingInfo",
      label: (
        <Flex className={styles.billingHeader} align="center">
          <BillingIcon />
          Billing Info
        </Flex>
      ),
      children: (
        <div>
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
            <Button htmlType="submit" className={styles.formSubmitBtn}>
              Save Address
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: "purchase",
      label: (
        <Flex className={styles.billingHeader} align="center">
          Payments
        </Flex>
      ),
      children: (
        <div>
          <Button onClick={proceedPayment} loading={loading}>
            Payment
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.checkoutWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"2.5rem"}>
          <div className="main-header font-bold font-ubuntu">Checkout</div>
          <div className="w-100">
            <Row>
              <Col span={breakPoint?.lg ? 12 : 24}>
                <div className={styles.billingFormWrapper}>
                  <Collapse
                    className={styles.billingFormCollapse}
                    defaultActiveKey={["billingInfo"]}
                    ghost
                    items={items}
                    expandIconPosition="end"
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
                          ${course?.price ?? 0}
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
    </div>
  );
}
