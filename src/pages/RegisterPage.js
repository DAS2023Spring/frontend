import NavBar from "../components/navBar";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const success = () => {
    messageApi.open({
      type: "success",
      content: "ثبت‌نام شما با موفقیت انجام شد.",
    });
  }

  const errorMessage = (error) => {
    const data = error.response.data
    const fields = []
    Object.keys(data).forEach((field) => {
      if (field === "security_question") {
        Object.keys(data).forEach((deepField) => {
          fields.push({
            name: deepField === "question"? "securityQuestion" : "securityAnswer",
            errors: data[field][deepField],
          })
        })
      } else {
        fields.push({
          name: field,
          errors: data[field],
        })
      }
    })
    form.setFields(fields)
    messageApi.open({
      type: "error",
      content: "ثبت‌نام شما موفق نبود. جزئیات بیشتر در پایین آمده است.",
    });
  }

  const submitForm = async (values) => {
    values.security_question = {
      question: values.securityQuestion,
      answer: values.securityAnswer,
    }
    delete values.confirm
    delete values.securityQuestion
    delete values.securityAnswer
    setLoading(true);
    try {
      const response = await axios.post(
        "https://cinemashelf.ir/api/user/register/",
        values
      );
      setLoading(false);
      success();
      navigate("/login?registerSuccess=1");
    } catch (error) {
      errorMessage(error);
      setLoading(false);
    }
  };

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
        <NavBar/>
      </div>
      <Row justify="center" align="middle" className="login-form">
        <Col span={6}>
          <div className="text-center">
            <h1>همین حالا ثبت‌ نام کنید!</h1>
          </div>
          <Card className="card">
            <Form {...formItemLayout} name="auth" onFinish={submitForm} className="black-bg-form" form={form}>
              <Form.Item
                name="username"
                label="نام کاربری"
                rules={[
                  {required: true, message: "لطفا نام کاربری را وارد کنید."},
                ]}
              >
                <Input size="large" placeholder="نام کاربری"/>
              </Form.Item>
              <Form.Item
                name="password"
                label="کلمه عبور"
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
              <div className="text-white register-question-help">
                لطفا یک سوال امنیتی برای خود انتخاب کنید. در صورت فراموشی کلمه عبور، این سوال از شما پرسیده می‌شود.
              </div>
              <Form.Item
                name="securityQuestion"
                label="سوال امنیتی"
                rules={[
                  {required: true, message: "سوال امنیتی نمی‌تواند خالی باشد."},
                ]}
              >
                <Input size="large" placeholder="سوال امنیتی" />
              </Form.Item>
              <Form.Item
                name="securityAnswer"
                label="پاسخ سوال امنیتی"
                rules={[
                  {required: true, message: "پاسخ سوال امنیتی شما نمی‌تواند خالی باشد."},
                ]}
              >
                <Input size="large" placeholder="پاسخ سوال امنیتی" />
              </Form.Item>
              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit" loading={loading}>
                  ثبت نام
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default RegisterPage;