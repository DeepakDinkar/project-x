import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Result, Spin } from "antd";
import useGlobalConfig from "../../hooks/useGlobalConfig";
import AppRouter from "../../router/router";
import ScrollToTop from "../../utils/ScrollTop/ScrollTop";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useBreakPoint } from "../../hooks/useBreakPoint";

export default function AppInitializer() {
  const { loading, error } = useGlobalConfig();
  const breakPoints = useBreakPoint();

  if (error) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Result
          style={{ maxWidth: breakPoints?.md ? "50%" : "100%" }}
          status="404"
          title="We apologize for the inconvenience, but our application is currently undergoing maintenance. Please check back later for updates. Thank you for your understanding."
          subTitle="Qomoi"
        />
      </Flex>
    );
  }

  return loading ? (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh" }}
      vertical
      gap={25}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
      <div>Loading...</div>
    </Flex>
  ) : (
    <>
      <ScrollToTop />
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}
