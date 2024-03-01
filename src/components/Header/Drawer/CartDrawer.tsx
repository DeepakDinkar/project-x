import { Badge, Button, Drawer, Flex, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../../constants/messages.constants";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import { Course } from "../../../models/Course";
import { Status } from "../../../models/ExceptionProps";
import { openModal } from "../../../redux/reducers/loginModalReducer";
import Exception from "../../../utils/Exception/Exception";
import { Dustbin } from "../../../utils/svgs/Dustbin";
import useCart from "../../../hooks/useCart";

type Props = {
  isDrawerVisible: boolean;
  closeDrawer: () => void;
};

export default function CartDrawer({
  isDrawerVisible,
  closeDrawer,
}: Readonly<Props>) {
  const breakPoint = useBreakPoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { removeItemsFromCart } = useCart();
  const isUserLoggedIn =
    useSelector((state: { user: { login: boolean } }) => state.user)?.login ??
    false;

  const courses: Course[] =
    useSelector((state: { cart: { items: Course[] } }) => state.cart)?.items ||
    [];

  const navigateToCheckout = () => {
    isUserLoggedIn ? navigate("/checkout") : dispatch(openModal());
    closeDrawer();
  };

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

  const removeCourseFromCart = (course: Course) => {
    removeItemsFromCart(course);
  };

  const getRenderer = () => {
    if (!courses || courses.length == 0) {
      return (
        <Exception status={Status.NOT_FOUND} subTitle={STATUS.EMPTY_CART} />
      );
    }

    return (
      <div>
        <Flex vertical gap={"2.5rem"}>
          {courses?.map((course, index) => (
            <Flex gap={"1.5rem"} key={course.id + index}>
              <Image
                style={{ borderRadius: "10px" }}
                width={breakPoint?.md ? 86 : 64}
                height={breakPoint?.md ? 86 : 64}
                preview={false}
                src={course.imageUrl}
              />
              <Flex
                vertical
                style={{ flex: 1, justifyContent: "space-evenly" }}
              >
                <div className="font-sm text-uppercase">{course.slug}</div>
                <div className="font-default font-bold">
                  {course.campaignTemplateCourseName}
                </div>
                <Flex gap={20} align="center">
                  <span className="font-sm">
                    Price: ${course?.courseAmt ?? 0}
                  </span>
                  {getLiveOrVirtualLocation(course)}
                </Flex>
              </Flex>
              <Dustbin onClick={() => removeCourseFromCart(course)} />
            </Flex>
          ))}
          <Button
            type="primary"
            className="font-default font-bold text-uppercase"
            style={{ alignSelf: "self-end", width: "fit-content", height: 44 }}
            onClick={() => navigateToCheckout()}
          >
            Checkout
          </Button>
        </Flex>
      </div>
    );
  };

  return (
    <Drawer
      size="default"
      className="cart-drawer"
      placement="right"
      closable={true}
      width={breakPoint?.md ? 500 : "auto"}
      onClose={() => closeDrawer()}
      open={isDrawerVisible}
      style={{ zIndex: 99999 }}
      title={
        <>
          <span className="font-roboto-slab font-bold sub-header">
            Add to Cart
          </span>
          <Badge count={courses.length} offset={[10, -4]} />
        </>
      }
    >
      {getRenderer()}
    </Drawer>
  );
}
