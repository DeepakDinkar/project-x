import { Route, Routes } from "react-router-dom";
import RouteError from "../error/RouteError";
import Courses from "../pages/courses/Courses";
import About from "../pages/about/About";
import Home from "../pages/home/Home";
import CourseDetails from "../pages/courses/[courseId]/CourseDetails";
import MyCourses from "../pages/mycourses/MyCourses";
import { ProtectedRoute } from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} errorElement={<RouteError />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/mycourses" element={<MyCourses />} />
      </Route>
    </Routes>
  );
}
