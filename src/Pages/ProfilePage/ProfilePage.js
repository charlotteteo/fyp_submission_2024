// ProfilePage.js

import React from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
} from 'antd';

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

import './ProfilePage.less';

const ProfilePage = ({ name, email, contact }) => {
  
 
  return (
    <div className="profile-container" style={{ height: 'calc(100vh - 20px)' }}>
      <Col>
        <Row>
          <div className="card greeting-card">
            {/* <h1>Hi, {name}</h1> */}
            <h1>Hi {name}!</h1>
            <p>Welcome Back to QuantfolioX</p>
          </div>
        </Row>
        <Row gutter={[16, 16]}>
          <div className="card profile-card">
            <div className="profile-info">
              <h2>Profile Information</h2>
              <Descriptions >
                <Descriptions.Item label="Full Name" span={3}>
                  <p>{name}</p>
                </Descriptions.Item>
                <Descriptions.Item label="Mobile" span={3}>
                  {contact}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>
                  {email}
                </Descriptions.Item>
                <Descriptions.Item label="Location" span={3}>
                  USA
                </Descriptions.Item>
                <Descriptions.Item label="Social" span={3}>
                  <a href="#pablo" className="mx-5 px-5">
                    {<TwitterOutlined />}
                  </a>
                  <a href="#pablo" className="mx-5 px-5">
                    {<FacebookOutlined style={{ color: '#344e86' }} />}
                  </a>
                  <a href="#pablo" className="mx-5 px-5">
                    {<InstagramOutlined style={{ color: '#e1306c' }} />}
                  </a>
                </Descriptions.Item>
                <Button type="primary" className="edit-button">
                  Edit
                </Button>
              </Descriptions>
            </div>
          </div>

        
        </Row>
      
        <Row>
       
        </Row>
      </Col>
    </div>
  );
};

export default ProfilePage;
