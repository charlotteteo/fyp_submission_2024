import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  List,
  Avatar,
  Typography,
  Button,
  Dropdown, 
  Space,
  Menu,
  Spin // Import Spin component from Ant Design
} from "antd";
import './OverallPage.less';

function AnalyticsPage({tickers,weights,start_date,end_date,initial_investment}) {
  const [summary, setSummary] = useState([]);
  const [recommendation, setRec] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [loading1, setLoading1] = useState(true);
  console.log(tickers,weights,start_date,end_date,initial_investment);
  const tickers_str = tickers.join('%3B');
  const weights_str = weights.join('%3B');
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setLoading(true); // Set loading to true when fetching starts
    fetch(`http://localhost:8082/portfolio/portfolio_summary/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => {
        setSummary(json);
        setLoading(false);// Set loading to false when data fetching is complete
      })

      fetch(`http://localhost:8082/portfolio/portfolio_rec/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => {
        setRec(json);
        setLoading(false); // Set loading to false when data fetching is complete
      })
      .catch((error) => {
        console.log('fetch data failed', error);
        setLoading(false); // Ensure loading is set to false even in case of error
      });
  };

  return (
    <div style={{ paddingTop: '20px', paddingLeft: '30px', paddingRight: '30px' }}>
  <Row>
    <Col span={24}>
      <Card
        title="Portfolio Qualitative Summary"
        // size="small"
      >
        {loading ? ( // Render Spin component if loading is true
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        ) : (
          <h1 style={{ whiteSpace: 'pre-line' }}>{summary}</h1> // Render summary data when loading is false
        )}
       
      </Card>
    </Col>
  </Row>

  <Row> 
    <Col span={24}>
      <Card
        title="Portfolio Qualitative Recommendation"
        // size="small"
      >
        {loading1 ? ( // Render Spin component if loading is true
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        ) : (
          <h1 style={{ whiteSpace: 'pre-line' }}>{recommendation}</h1> // Render summary data when loading is false
        )}
        
      </Card>
    </Col>
  </Row>
</div>
  );
}

export default AnalyticsPage;
