import { Badge, Button, Drawer, Flex, Image } from "antd";
import { Dustbin } from "../../../utils/svgs/Dustbin";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Course } from "../../../models/Course";
import { removeFromCart } from "../../../redux/reducers/cartReducer";
import Exception from "../../../utils/Exception/Exception";
import { Status } from "../../../models/ExceptionProps";
import { STATUS } from "../../../constants/messages.constants";

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

  const courses: Course[] =
    useSelector((state: { cart: { items: Course[] } }) => state.cart)?.items ||
    [];

  const navigateToCheckout = () => {
    navigate("/checkout");
    closeDrawer();
  };

  const getRenderer = () => {
    if (!courses || courses.length == 0) {
      return (
        <Exception status={Status.NOT_FOUND} subTitle={STATUS.NOT_FOUND} />
      );
    }

    return (
      <div>
        <Flex vertical gap={"2.5rem"}>
          {courses?.map((course) => (
            <Flex gap={"1.5rem"} key={course.id}>
              <Image
                style={{ borderRadius: "10px" }}
                width={64}
                height={64}
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
                <div>
                  <span className="font-sm">Price: $400</span>
                </div>
              </Flex>
              <Dustbin onClick={() => dispatch(removeFromCart(course.id))} />
            </Flex>
          ))}
          <Button
            type="primary"
            className="font-default font-bold text-uppercase"
            style={{ alignSelf: "self-end", width: "fit-content" }}
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
