import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Card, Row, Col, Tabs } from 'antd';

const PortfolioNovelRecPage = () => {
  const [tickers, setTickers] = useState([]);
  const [weights, setWeights] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [data, setData] = useState([]);
  const { TabPane } = Tabs;
  const lastPartUrl = 'AAPL%3BGOOGL%3BAMZN%3BJNJ%3BTSLA%3BJPM%3BMSFT%3BV%3BPG%3BIEF/0.14%3B0.08%3B0.09%3B0.14%3B0.10%3B0.06%3B0.10%3B0.08%3B0.14%3B0.07/2018-01-01/2024-02-20/10000';
  // const tickerString = tickers.join('%3B');
  // const weightString = weights.join('%3B0.');


  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    // fetch(`http://localhost:8082/portfolio/time_series/${tickerString}/0.${weightString}/${start_date}/${end_date}/${initialInvestment}`)
    fetch(`http://localhost:8082/portfolio/time_series/${lastPartUrl}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const handleTickerChange = (index, value) => {
    const newTickers = [...tickers];
    newTickers[index] = value;
    setTickers(newTickers);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
  };

  const handleAddRow = () => {
    setTickers([...tickers, '']);
    setWeights([...weights, 0]);
  };

  const handleRemoveRow = (index) => {
    const newTickers = [...tickers];
    newTickers.splice(index, 1);
    const newWeights = [...weights];
    newWeights.splice(index, 1);
    setTickers(newTickers);
    setWeights(newWeights);
  };

  const handleSimulation = () => {
    // Perform simulation logic using tickers and weights
    const simulationResult = tickers.map((ticker, index) => `${ticker}: ${weights[index]}`).join(', ');
    setSimulationResult(simulationResult);
  };


  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      render: (_, record, index) => (
        <Input value={tickers[index]} onChange={(e) => handleTickerChange(index, e.target.value)} />
      ),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      render: (_, record, index) => (
        <Input value={weights[index]} onChange={(e) => handleWeightChange(index, e.target.value)} />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record, index) => (
        <Button onClick={() => handleRemoveRow(index)}>Remove</Button>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };



  return (
    <div className="portfolio-simulation-page" style={{ padding: '20px' }}>
      <h1>QuantfolioX Generated Portfolio</h1>
      <p>Utilising RF-Garch Techniques, we craft a portfolio that considers expected returns derived from RF machine learning technique.  </p>
      <Table
        dataSource={tickers.map((_, index) => ({ key: index }))}
        columns={columns}
        pagination={false}
      />
      <Button onClick={handleAddRow}>Add Row</Button>
      <Button onClick={handleSimulation}>Run Simulation</Button>
      {simulationResult && (
        <Card title="Simulation Result">
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Simulation Details" key="1">
                <p>{simulationResult}</p>
                </TabPane>
                <TabPane tab="Overall Page" key="2">
                </TabPane>
                <TabPane tab="Sectoral Exposure" key="3">
                </TabPane>
                <TabPane tab="Qualitative Analysis" key="4">
                </TabPane>
                <TabPane tab="Recommendations" key="5">
                </TabPane>
            </Tabs>
      
        </Card>
      )}
    </div>
  );

};

export default PortfolioNovelRecPage;
