import { createBrowserRouter } from "react-router-dom";
import About from "../pages/about/About";
import Courses from "../pages/Courses";
import Home from "../pages/Home";
import RouteError from "../error/RouteError";

const router = createBrowserRouter([
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <RouteError />,
  },
]);

export default router;
