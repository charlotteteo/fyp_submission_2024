import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Card, Row, Col, Progress} from 'antd';
import GaugeChart from '../chart/GaugeChart';
import StockTable from '../table/StockTable';
import SingleTimeSeries from '../chart/SingleTimeSeries';
import StockLineChart from '../chart/StockLineChart';


const StockAnalysisModal = ({ stockname }) => {
  const [stockData, setStockData] = useState({});
  const [stockTimeSeriesData, setStockTimeSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const link = `http://localhost:8082/analysis/stock/${stockname}`;
        const response = await fetch(link);
        const data = await response.json();

        const link1 = `http://localhost:8082/analysis/stock_time_series/${stockname}/2020-01-01/D`;
        const response1 = await fetch(link1);
        const data1 = await response1.json();

        setStockData(data.data);

        if (Array.isArray(data1)) {
          setStockTimeSeriesData(data1);
        } else {
          console.error('Data is not in the expected array format:', data1.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (modalVisible) {
      fetchData();
    }
  }, [modalVisible, stockname]);

  const stockData_MOCK = [
    {
      stockName: 'AAPL',
      oneDayChange: 2.5,
      oneMonthChange: 5.3,
      ytdChange: -1.2,
      holding: 'long',
    }
  ];


  return (
    <div>
    <button onClick={openModal}>View More</button>
    <Modal
      visible={modalVisible}
      onCancel={closeModal}
      footer={[
        <Button key="close" onClick={closeModal}>
          Close
        </Button>,
      ]}
      width={1200}
      centered
    >
      <div style={{ width: '100%' }}>
        <Card>
          <h1 style={{ fontWeight: 'bold' }}>{stockData.company_name}</h1>
          <SingleTimeSeries input_data={stockTimeSeriesData} title='' />
        </Card>
      </div>
      <div style={{ width: '100%' }}>
        <Card title="Top Company News">
          {stockData.company_news && stockData.company_news.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={stockData.company_news}
              loading={loading}
              renderItem={(item) => (
                <List.Item>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  {/* <Progress percent={(item.sentiment + 1) * 50} status="active" showInfo={false} /> */}
                </List.Item>
              )}
            />
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </div>
      <div style={{ width: '100%' }}>
        <Card title="Company Information" loading={loading}>
          {stockData.full_yfinance_data?.longBusinessSummary ? (
            <h5>{stockData.full_yfinance_data?.longBusinessSummary}</h5>
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </div>
    </Modal>
  </div>
  );
};

export default StockAnalysisModal;