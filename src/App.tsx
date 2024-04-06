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

function App() {
  const breakPoints = useBreakPoint();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIEND_ID;
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
      <GoogleOAuthProvider clientId={googleClientId}>
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
