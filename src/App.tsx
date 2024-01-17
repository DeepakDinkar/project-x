import { ConfigProvider, ThemeConfig } from "antd";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./theme/card.scss";
import AppRouter from "./router/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";

const theme: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: "#1E90FF",
      borderRadius: 100,
      algorithm: true,
    },
    Carousel: {
      dotHeight: 10,
      dotWidth: 10,
      dotActiveWidth: 10,
    },
  },
};

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="471731862964-dkuur20m90phgklr5cq32pq2706qjc3c.apps.googleusercontent.com">
        <ConfigProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <AppRouter />
            <Footer />
          </BrowserRouter>
        </ConfigProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
