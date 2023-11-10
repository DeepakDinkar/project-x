import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import { ConfigProvider, ThemeConfig } from "antd";

const theme: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: '#1E90FF',
      borderRadius: 100,
      algorithm: true
    }
  }
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <header>Header</header> 
      <RouterProvider router={router} />
      <Footer />
    </ConfigProvider>
  );
}

export default App;
