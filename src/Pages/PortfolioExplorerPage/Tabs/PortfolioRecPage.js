import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Card, Row, Col, Tabs, DatePicker, InputNumber } from 'antd';
import OverallPage from '../../DashboardPage/OverallPage';
import SectoralExposurePage from '../../DashboardPage/SectoralExposurePage';
import ConstituentAnalysis from '../../DashboardPage/ConstituentAnalysis';
import PortfolioSimOverview from '../Tabs/PortfolioSimOverview';
import PortfolioSimSector from '../Tabs/PortfolioSimSector';
import PortfolioSimRec from '../Tabs/PortfolioSimRec';
import PortfolioSimAnalysis from '../Tabs/PortfolioSimAnalysis';
import PortfolioOverallPage from '../Tabs/PortfolioOverallPage';

const PortfolioRecPage = () => {
  const [tickers, setTickers] = useState([]);
  const [weights, setWeights] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState(null);
  const [lastPartUrl, setLastPartUrl] = useState([]);
  const [recPartUrl, setRecPartUrl] = useState([]);
  const { TabPane } = Tabs;

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
    if (tickers.length === 0) return; // If tickers array is empty, don't run simulation

    const tickerString = tickers.join('%3B');
    const weightString = weights.join('%3B0.');
    const updatedLastPartUrl = `${tickerString}/0.${weightString}/${start_date}/${end_date}/${initialInvestment}`;
    const recPartUrlExt = `${tickerString}/${start_date}/${end_date}`;

    setLastPartUrl(updatedLastPartUrl);
    setRecPartUrl(recPartUrlExt);

    const simulationResult = tickers.map((ticker, index) => `${ticker}: ${weights[index]}`).join(', ');
    setSimulationResult(simulationResult);
  };

  const handleRefresh = () => {
    setSimulationResult(null); // Clear simulation result
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
      title: 'Weight (%)',
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
      <h1>Portfolio Simulation</h1>
      <Row gutter={[16, 16]}>
       
        <Col span={2}>
        <p>Start Date</p>
          <DatePicker onChange={(date, dateString) => setStartDate(dateString)} />
        </Col>
        <Col span={2}>
        <p>End Date</p>
          <DatePicker onChange={(date, dateString) => setEndDate(dateString)} />
        </Col>
        <Col span={2}>
        <p>Initial Investment</p>
          <InputNumber onChange={(value) => setInitialInvestment(value)} />
        </Col>
      </Row>
      <Table
        dataSource={tickers.map((_, index) => ({ key: index }))}
        columns={columns}
        pagination={false}
      />
      <Button onClick={handleAddRow}>Add Row</Button>
      <Button onClick={handleSimulation}>Run Simulation</Button>
      <Button onClick={handleRefresh}>Refresh</Button>
      {simulationResult && (
        <Card title="Simulation Result">
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Overall Page" key="1">
              <PortfolioOverallPage lastPart={lastPartUrl} />
            </TabPane>
            <TabPane tab="Overview Page" key="2">
              <PortfolioSimOverview lastPart={lastPartUrl} />
            </TabPane>
            <TabPane tab="Sectoral Exposure" key="3">
              <PortfolioSimSector lastPart={lastPartUrl} />
            </TabPane>
            <TabPane tab="Qualitative Analysis" key="4">
              <PortfolioSimAnalysis lastPart={lastPartUrl} />
            </TabPane>
            <TabPane tab="QuantfolioX Recommended Allocation" key="5">
              <PortfolioSimRec lastPart={recPartUrl} />
            </TabPane>
          </Tabs>
        </Card>
      )}
      
    </div>
  );
};

export default PortfolioRecPage;
