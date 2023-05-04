import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const MainPage = () => {
  let navigate = useNavigate();

  const loginPage = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1>صفحه اصلی</h1>
      <Button type="primary" onClick={loginPage}>
        ورود
      </Button>
    </div>
  );
};

export default MainPage;
