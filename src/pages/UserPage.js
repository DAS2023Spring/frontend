import NavBar from "../components/navBar";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../App";

const UserPage = () => {
  const { state } = useContext(AuthContext);
  return (
    <>
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>
      <div className="profile">
        <Row align="left" className="profile-content">
          <Col span={4}>
            <Avatar
              style={{ backgroundColor: "#21262c" }}
              shape="square"
              size={100}
              icon={<UserOutlined />}
            />
          </Col>
          <Col span={16}>
            <div className="text-right">
              <h1>{state.user}</h1>
            </div>
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>
    </>
  );
};

export default UserPage;
