import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigate = useNavigate();

  const user = useSelector((state: { user: { login: boolean } }) => state.user);

  useEffect(() => {
    if (!user.login) {
      navigate("/");
    }
  }, [navigate, user.login]);

  return <Outlet />;
};
