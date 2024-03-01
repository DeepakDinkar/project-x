import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Course } from "../models/Course";
import { updateCartItems } from "../redux/reducers/cartReducer";
import { storeSecretKey } from "../redux/reducers/secretStoreReducer";
import { getSecretKey, getStoredData } from "../services/authApi";
import { SessionStorageUtils } from "../utils/SessionStorageUtils";
import useFetch from "./useFetch";

const SECRET_KEY = "secretKey";

const useGlobalConfig = () => {
  const secretKeyRef = useRef<string>();
  const { data, loading, fetch: secretKeyFetch } = useFetch(getSecretKey);
  const { fetch } = useFetch(getStoredData);
  const dispatch = useDispatch();

  if (data) {
    secretKeyRef.current = data;
  }

  useEffect(() => {
    const key = SessionStorageUtils.getItem(SECRET_KEY);
    key ? (secretKeyRef.current = key) : secretKeyFetch();
  }, [secretKeyFetch]);

  useEffect(() => {
    if (secretKeyRef.current) {
      dispatch(storeSecretKey(secretKeyRef.current));

      fetch(secretKeyRef.current)
        .then((storeDetails: { json: string }) => {
          updateCartCourses(storeDetails);
        })
        .catch(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetch]);

  const updateCartCourses = (storeDetails: { json: string }) => {
    if (storeDetails && storeDetails.json) {
      const courseItems: Course[] = JSON.parse(storeDetails.json);
      dispatch(updateCartItems(courseItems));
    }
  };

  return { loading };
};

export default useGlobalConfig;
