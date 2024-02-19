import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider, ThemeConfig } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ModalContextProvider } from "./context/ModalContext";
import { useBreakPoint } from "./hooks/useBreakPoint";
import "./i18n/config";
import store from "./redux/store";
import AppRouter from "./router/router";
import "./theme/card.scss";
import ScrollToTop from "./utils/ScrollTop/ScrollTop";

function App() {
  const breakPoints = useBreakPoint();

  const theme: ThemeConfig = {
    components: {
      Button: {
        colorPrimary: "#1E90FF",
        borderRadius: 100,
        algorithm: true,
      },
      Carousel: {
        dotHeight: breakPoints?.md ? 10 : 7,
        dotWidth: breakPoints?.md ? 10 : 7,
        dotActiveWidth: breakPoints?.md ? 10 : 7,
      },
    },
  };

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="471731862964-dkuur20m90phgklr5cq32pq2706qjc3c.apps.googleusercontent.com">
        <ConfigProvider theme={theme}>
          <BrowserRouter>
            <ModalContextProvider>
              <ScrollToTop />
              <Header />
              <AppRouter />
              <Footer />
            </ModalContextProvider>
          </BrowserRouter>
        </ConfigProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
