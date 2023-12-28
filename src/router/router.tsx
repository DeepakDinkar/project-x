import { Route, Routes } from "react-router-dom";
import RouteError from "../error/RouteError";
import Courses from "../pages/Courses";
import About from "../pages/about/About";
import Home from "../pages/home/Home";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} errorElement={<RouteError/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/courses" element={<Courses/>} />
    </Routes>
  );
}
