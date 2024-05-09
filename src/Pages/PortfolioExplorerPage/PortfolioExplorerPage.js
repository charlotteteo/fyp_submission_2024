// PortfolioExplorer.js
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Select, Spin } from "antd"; // Import Spin for loading icon
import { useHistory } from 'react-router-dom';
import { RightOutlined, ExperimentOutlined, ControlOutlined } from '@ant-design/icons'; // Removed unused imports
import "./PortfolioExplorerPage.less";

const { Option } = Select;

const PortfolioExplorerPage = ({user_id, name}) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading state
  const history = useHistory();

  const handleButtonClick = (path) => {
    history.push(path);
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://localhost:8082/chatbot/chatbot_user_allocation/${user_id}/`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data.output);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };


  const renderDescription = () => {
    const description = data;
    const boldTextRegex = /\*\*(.*?)\*\*/g;
    const formattedDescription = description.replace(boldTextRegex, '<strong>$1</strong>');
    return (
      <p style={{ whiteSpace: 'pre-line', color: 'black' , fontSize: 20 }} dangerouslySetInnerHTML={{ __html: formattedDescription }} />
    );
  };


  return (
  
    <div className="card greeting-card" >
      <h1>Hi {name}!</h1>
      <p>Welcome to Portfolio Explorer</p>

      {loading ? ( // Display loading icon when data is being fetched
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <p>Please wait while we generate our allocation recommendation for you!</p> 
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <Card title="Allocation Recommendation For You"  titleStyle={{ fontSize: 24 }} >
          {renderDescription()}
          </Card>
          <br></br>
          <p>Start Exploring!</p>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card className="description-card">
                <p style={{ color: 'black' }}>Experiment with creating a new investment portfolio with allocations</p>
                <div className="icon-wrapper">
                  <ExperimentOutlined className="action-icon" />
                </div>
                <Button type="primary" size="large" block onClick={() => handleButtonClick('/portfolioexplorer/simulation')}>
                  Simulate New Portfolio
                  <RightOutlined className="arrow-icon" />
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card className="description-card">
                <p style={{ color: 'black' }}>Craft a QuantfolioX portfolio using quantitative techniques for optimization</p>
                <div className="icon-wrapper">
                  <ControlOutlined className="action-icon" />
                </div>
                <Button type="primary" size="large" block onClick={() => handleButtonClick('/portfolioexplorer/novel')}>
                  Try Crafting a QuantfolioX Portfolio
                  <RightOutlined className="arrow-icon" />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PortfolioExplorerPage;
