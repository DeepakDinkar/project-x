import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Course } from "../models/Course";
import { updateCartItems } from "../redux/reducers/cartReducer";
import { storeSecretKey } from "../redux/reducers/secretStoreReducer";
import { getSecretKey, getStoredData } from "../services/authApi";
import { SessionStorageUtils } from "../utils/SessionStorageUtils";
import useFetch from "./useFetch";

const SECRET_KEY = "secretKey";

const useGlobalConfig = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [secretKey, setSecretKey] = useState<string>();
  const { data, fetch: secretKeyFetch, error } = useFetch(getSecretKey);
  const { fetch } = useFetch(getStoredData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setSecretKey(data);
    }
  }, [data]);

  useEffect(() => {
    const key = SessionStorageUtils.getItem(SECRET_KEY);
    key ? setSecretKey(key) : secretKeyFetch();
  }, [secretKeyFetch]);

  useEffect(() => {
    if (secretKey) {
      dispatch(storeSecretKey(secretKey));

      fetch(secretKey)
        .then((storeDetails: { json: string }) => {
          updateCartCourses(storeDetails);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetch, secretKey]);

  const updateCartCourses = (storeDetails: { json: string }) => {
    if (storeDetails?.json) {
      const courseItems: Course[] = JSON.parse(storeDetails.json);
      dispatch(updateCartItems(courseItems));
    }
  };

  return { loading, error };
};

export default useGlobalConfig;
