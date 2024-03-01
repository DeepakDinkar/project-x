import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import useGlobalConfig from "../../hooks/useGlobalConfig";
import AppRouter from "../../router/router";
import ScrollToTop from "../../utils/ScrollTop/ScrollTop";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function AppInitializer() {
  const { loading } = useGlobalConfig();

  return loading ? (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
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
