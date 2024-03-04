import { ModalView, useModalContext } from "../../context/ModalContext";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ResetPassword from "./ResetPassword";

export default function LoginWrapper() {
  const { view } = useModalContext();

  if (view === ModalView.Login) {
    return <Login />;
  }
  if (view === ModalView.ForgetPassword) {
    return <ForgetPassword />;
  }

  if (view === ModalView.ResetPassword) {
    return <ResetPassword />;
  }

  return <Register />;
}
