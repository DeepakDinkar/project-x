import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default function LoginWrapper() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return isLogin ? <Login setIsLogin={setIsLogin}  /> : <Register />;
}
