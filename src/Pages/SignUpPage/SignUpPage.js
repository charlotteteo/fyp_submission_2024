// SignInPage.js

import React, { useState } from "react";
import { Layout, Row, Col, Card, Typography, Input, Checkbox, Form, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { DribbbleOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from "@ant-design/icons";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";
import SignUpForm from './SignUpForm';
import "./SignUpPage.less";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignUpPage() {
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <AppHeader onToggle={handleToggle} onMenuClick={handleMenuClick} />

      <Row justify="center" style={{ minHeight: "calc(100vh - 134px)" }}>
      <Col xs={24} sm={24} md={12}>
  <Card bordered={false} style={{ padding: "20px", width: "100%" }}>
            <Row justify="center">
              <Title level={2}>Sign Up</Title>
             
            </Row>
            <Row justify="center">
            <p>Welcome to QuantFolioX!</p>
         
              </Row>
              <Row justify="center"><p> Fill in your details so we can get to know you better!</p></Row>

            <SignUpForm/>
          </Card>
        </Col>
      </Row>
      {/* <AppFooter /> */}
    </Layout>
  );
}
