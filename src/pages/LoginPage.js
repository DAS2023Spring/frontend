import { Form, Input, Button, Row, Col, Card, message } from "antd";
import NavBar from "../components/navBar";
import { useContext } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();

  const submitForm = async (values) => {
    try {
      const response = await axios.post(
        "https://cinemashelf.ir/api/user/login/",
        values
      );
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data.token,
          user: values["username"],
        },
      });
      navigate("/");
      success();
    } catch (error) {
      errorMessage();
    }
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "ورود با خطا مواجه شد",
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "با موفقیت وارد شدید",
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>
      <Row justify="center" align="middle" className="login-form">
        <Col span={6}>
          <div className="text-center">
            <h1>ورود به صفحه کاربری</h1>
          </div>
          <Card className="card">
            <Form name="auth" onFinish={submitForm}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "لطفا نام کاربری را وارد کنید" },
                  // { type: "email", message: "ایمیل وارد شده معتبر نیست" },
                ]}
              >
                <Input size="large" placeholder="نام کاربری" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "لطفا کلمه عبور را وارد کنید" },
                  // { min: 8, message: "کلمه عبور حداقل باید ۸ کاراکتر باشد" },
                ]}
              >
                <Input size="large" type="password" placeholder="کلمه عبور" />
              </Form.Item>
              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit">
                  ورود
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center">رمز عبور خود را فراموش کرده اید؟</div>
          </Card>
          <div className="text-center" style={{ margin: "20px 0px" }}>
            <h3>
              هنوز اکانتی نساخته اید؟
              <Button type="link">ثبت نام</Button>
            </h3>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
