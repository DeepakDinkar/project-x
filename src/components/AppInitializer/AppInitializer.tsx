import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Result, Spin } from "antd";
import useGlobalConfig from "../../hooks/useGlobalConfig";
import AppRouter from "../../router/router";
import ScrollToTop from "../../utils/ScrollTop/ScrollTop";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { useTranslation } from "react-i18next";

export default function AppInitializer() {
  const { loading, error } = useGlobalConfig();
  const breakPoints = useBreakPoint();
  const { t } = useTranslation();

  if (error) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Result
          style={{ maxWidth: breakPoints?.md ? "50%" : "100%" }}
          status="404"
          title={t('appInitalizer.title')}
          subTitle={t('appInitalizer.subTitle')}
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
      <div>{t('appInitalizer.loadingText')}</div>
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
