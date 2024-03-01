import { useDispatch, useSelector } from "react-redux";
import { Course } from "../models/Course";
import { updateStoredData } from "../services/authApi";
import useFetch from "./useFetch";
import { message } from "antd";
import { openCartDrawer, updateCartItems } from "../redux/reducers/cartReducer";

export const useCart = () => {
  const { fetch, loading } = useFetch(updateStoredData);
  const dispatch = useDispatch();
  const secretKey = useSelector(
    (state: { secretStore: { secretKey: string } }) => state.secretStore
  ).secretKey;

  const courseItems: Course[] =
    useSelector((state: { cart: { items: Course[] } }) => state.cart)?.items ||
    [];

  const getItemIndex = (items: Course[], id: number, locationIndex: number) => {
    return items.findIndex(
      (item) => item.id == id && locationIndex == item.locationIndex
    );
  };

  const addItemsToCart = async (course: Course) => {
    const { id, locationIndex = -1 } = course;
    const index = getItemIndex(courseItems, id, locationIndex);
    if (index > -1) {
      message.warning("Course already added to cart");
    } else {
      const payload = createPayload([...courseItems, course]);
      fetch(payload)
        .then(() => {
          dispatch(updateCartItems([...courseItems, course]));
          dispatch(openCartDrawer());
          message.success("Item added to cart successfully");
        })
        .catch(() => {
          message.error("Unable to add item to cart");
        });
    }
  };

  const removeItemsFromCart = (course: Course) => {
    const { id, locationIndex = -1 } = course;
    const index = getItemIndex(courseItems, id, locationIndex);
    if (index !== -1) {
      const existingCourseItems = [...courseItems];
      const payload = createPayload(existingCourseItems.splice(index, 1));
      fetch(payload)
        .then(() => {
          dispatch(updateCartItems(existingCourseItems.splice(index, 1)));
          message.success("Item removed from cart successfully");
        })
        .catch(() => {
          message.error("Unable to remove item from cart");
        });
    }
  };

  const clearCart = () => {
    const payload = createPayload([]);
    fetch(payload).then(() => dispatch(updateCartItems([])));
  };

  const createPayload = (items: Course[]) => {
    return {
      secretKey: secretKey,
      json: JSON.stringify(items),
    };
  };

  return { addItemsToCart, removeItemsFromCart, clearCart, loading };
};

export default useCart;
