import { useContext  } from "react";
import { Row, Col, Button } from "antd";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const NavBar = () => {
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const { state } = useContext(AuthContext);

  const clickButton = () => {
    console.log(state.isAuthenticated)
    if (state.isAuthenticated) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };
  const logout = () => {
    if (state.isAuthenticated) {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/login")
    }
  }
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
        <Button type="primary" onClick={clickButton}>
          {state.isAuthenticated? "صفحه کاربری": "ورود"}
        </Button>
        {state.isAuthenticated? (
          <Button type="primary" onClick={logout} className="logout-button">
            خروج
          </Button>
        ):""}
      </Col>
    </Row>
  );
};

export default NavBar;
