import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return <div><Button onClick={ () => navigate('/about')}>Button</Button></div>;
}

export default Home;
