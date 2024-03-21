import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider, ThemeConfig } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppInitializer from "./components/AppInitializer/AppInitializer";
import { ModalContextProvider } from "./context/ModalContext";
import { useBreakPoint } from "./hooks/useBreakPoint";
import "./i18n/config";
import store from "./redux/store";
import "./theme/card.scss";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const breakPoints = useBreakPoint();

  const stripePromise = loadStripe("pk_test_51Or9WRHIxaQosNkX3uRI4LmG0KY62h04jvPP6CSJ0abDTtGboVGR84aljppCfGsrO3TgXasDGTP1KBZ0xPZRwURh00dAf8E4Nt");


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
             <AppInitializer />
            </ModalContextProvider>
          </BrowserRouter>
        </ConfigProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
