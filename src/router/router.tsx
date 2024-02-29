import { Route, Routes } from "react-router-dom";
import RouteError from "../error/RouteError";
import About from "../pages/about/About";
import Checkout from "../pages/checkout/Checkout";
import Courses from "../pages/courses/Courses";
import CourseDetails from "../pages/courses/[courseId]/CourseDetails";
import Home from "../pages/home/Home";
import MyCourses from "../pages/mycourses/MyCourses";
import MyProfile from "../pages/myprofile/MyProfile";
import MyPurchases from "../pages/mypurchases/MyPurchases";
import { ProtectedRoute } from "./ProtectedRoute";
import Verticals from "../pages/verticals/Verticals";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} errorElement={<RouteError />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Verticals />} />
      <Route path="/verticals/:slug" element={<Courses />} />
      <Route path="/course/:courseId" element={<CourseDetails />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}
