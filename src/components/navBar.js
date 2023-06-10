import { Row, Col, Button } from "antd";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();

  const loginPage = () => {
    navigate("/login");
  };

  return (
    <Row align="middle" className="site-navbar">
      <Col span={6}></Col>
      <Col span={12} className="nav-item">
        <Link to="/">
          <img className="logo" src={logo} width={50} height={50} alt="logo" />
        </Link>
        <Link to="/movies">
          <h3>فیلم ها</h3>
        </Link>
        <Link to="/movies">
          <h3>نقدها </h3>
        </Link>
        <Link to="/movies">
          <h3>ارتباط با ما </h3>
        </Link>
      </Col>
      <Col span={6}>
        <Button type="primary" onClick={loginPage}>
          ورود
        </Button>
      </Col>
    </Row>
  );
};

export default NavBar;
