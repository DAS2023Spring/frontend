import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {useNavigate} from "react-router-dom";
import NavBar from "../components/navBar";
import {useState} from "react";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [securityQuestion, setSecurityQuestion] = useState();
  const [securityQuestionLoading, setSecurityQuestionLoading] = useState(false);
  const [username, setUsername] = useState()
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordForm] = Form.useForm();

  const getSecurityQuestion = async (values) => {
    setSecurityQuestionLoading(true)
    try {
      const response = await axios.get(
        `https://cinemashelf.ir/api/user/reset-password/${values.username}/`
      )
      setSecurityQuestionLoading(false)
      setSecurityQuestion(response.data.question)
      setUsername(values.username)
    } catch (error) {
      messageApi.error("نام کاربری اشتباه است.")
      setSecurityQuestionLoading(false)
    }
  }

  const submitSecurityAnswer = async (values) => {
    setResetPasswordLoading(true)
    try {
      await axios.post(
        `https://cinemashelf.ir/api/user/reset-password/${username}/`,
        {
          username: username,
          answer: values.answer,
          password: values.password,
        }
      )
      setResetPasswordLoading(false)
      navigate("/login?resetPasswordSuccess=1")
    } catch (error) {
      setResetPasswordLoading(false)
      const data = error.response.data
      resetPasswordForm.setFields(Object.keys(data).map((key) => {
        return {
          name: key,
          errors: data[key],
        }
      }))
    }
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 80,
      },
    },
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
            <h1>فراموشی رمز عبور</h1>
          </div>
          <Card className="card">
            {!securityQuestion && (
            <Form name="username-input" onFinish={getSecurityQuestion} className="black-bg-form">
              <Form.Item
                name="username"
                label="نام کاربری"
                rules={[
                  { required: true, message: "لطفا نام کاربری را وارد کنید." },
                ]}
              >
                <Input size="large" placeholder="نام کاربری" />
              </Form.Item>
                <Button size="large" block type="primary" htmlType="submit" loading={securityQuestionLoading}>
                  دریافت سوال امنیتی
                </Button>
            </Form>
            )}
            {!!securityQuestion && (
              <>
                <Row>
                  <Col span={12}><h3>نام کاربری:</h3></Col>
                  <Col span={12}><h3>{username}</h3></Col>
                </Row>
                <Row>
                  <Col span={12}><h3>سوال امنیتی:</h3></Col>
                  <Col span={12}><h3>{securityQuestion}</h3></Col>
                </Row>
              </>
            )
            }
            {!!securityQuestion && (
            <Form className="mt-2 black-bg-form" onFinish={submitSecurityAnswer} {...formItemLayout} form={resetPasswordForm}>
              <Form.Item
                name="answer"
                label="پاسخ سوال امنیتی"
                rules={[
                  {required: true, message: "پاسخ سوال امنیتی شما نمی‌تواند خالی باشد."},
                ]}
              >
                <Input size="large" placeholder="پاسخ سوال امنیتی" />
              </Form.Item>
              <Form.Item
                name="password"
                label="کلمه عبور جدید"
                rules={[
                  {required: true, message: "لطفا کلمه عبور را وارد کنید."},
                ]}
              >
                <Input.Password size="large" placeholder="کلمه عبور"/>
              </Form.Item>
              <Form.Item
                name="confirm"
                label="تکرار کلمه عبور"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'تکرار کلمه عبور را وارد کنید!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('تکرار کلمه عبور با خود آن یکسان نیست.'));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="تکرار کلمه عبور" />
              </Form.Item>
              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit" loading={resetPasswordLoading}>
                  ثبت
                </Button>
              </Form.Item>
            </Form>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default RegisterPage;