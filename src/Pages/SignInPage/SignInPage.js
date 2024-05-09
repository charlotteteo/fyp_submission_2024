import React, { useState } from "react";
import { Layout, Row, Col, Card, Typography, Input, Checkbox, Form, Button, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"; // Import Axios
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";
import marketChartImage from "../../assets/sign-in/Market_chart.jpeg";
import logo1 from "../../assets/sign-in/logos-facebook.svg";
import logo2 from "../../assets/sign-in/logo-apple.svg";
import logo3 from "../../assets/sign-in/Google__G__Logo.svg.png";
import "./SignInPage.less";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignInPage({onLogin}) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const handleToggle = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  const handleMenuClick = (path) => {
    if (collapsed) {
      setCollapsed(false);
    }

    // Use ScrollLink for smooth scrolling
    if (path.startsWith('#')) {
      // For section links
      return;
    }

    // For external links or routes
    history.push(path);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.get(`http://localhost:8082/users/login/${values.email}/${values.password}`);
      //  API returns user data upon successful login
      // console.log("User data:", response.data);
      onLogin(response.data);
      // Redirect to dashboard after successful sign-in
      history.push("/dashboard/overall");
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle login error, e.g., display an error message to the user
      notification.error({
        message: 'Sign In Error',
        description: 'Wrong email or password. Please try again.',
        placement: 'topRight'
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (

 <Layout>
      <AppHeader onToggle={handleToggle} onMenuClick={handleMenuClick} />

      <Row justify="center" style={{ minHeight: "calc(100vh - 134px)" }}>
        <Col xs={24} sm={24} md={12}>
          <Card bordered={false} style={{ padding: "50px" }}>
            <Row justify="center">
              <Title level={2}>Sign In</Title>
            </Row>
            <Row justify="center">
              <p>Welcome Back!</p>
            </Row>
            <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} className="row-col">
              <Form.Item name="email" rules={[ { required: true, message: "Please input your email!" },
    { type: "email", message: "Please enter a valid email address!" } ]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree to the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Do not have an account?{" "}
              <Link to="/sign-up" className="font-bold text-dark">
                Sign Up
              </Link>
            </p>
          </Card>
        </Col>
      </Row>
      <AppFooter/>
    </Layout>
 
  );
}
