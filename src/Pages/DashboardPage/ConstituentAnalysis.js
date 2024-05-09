import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Collapse, Table } from 'antd';
import SingleTimeSeries from "../../components/chart/SingleTimeSeries";
import StockTable from "../../components/table/StockTable";

const { Option } = Select;
const { Panel } = Collapse;

const ConstituentAnalysis = ({tickers,weights,start_date,end_date,initial_investment}) => {
  const [data, setData] = useState([]);
  const [fundamentalData, setFundamentalData] = useState([]);
  const [technicalData, setTechnicalData] = useState([]);
  const [stockTableData,setStockTableData]  = useState([]);
  const [qualitativeData,setQualitativeData] = useState([]);
  console.log(tickers,weights,start_date,end_date,initial_investment);
  const [ticker, setTicker] = useState("AAPL"); // Set initial ticker to "AAPL"
  const tickers_str = tickers.join('%3B');
  const weights_str = weights.join('%3B'); 

  useEffect(() => {
    asyncFetch();
  }, [ticker]);

  const asyncFetch = async () => {
    if (!ticker) return; // Do not fetch if ticker is not selected

    try {
      const timeSeriesResponse = await fetch(`http://localhost:8082/analysis/stock_time_series/${ticker}/${start_date}/D`);
      const timeSeriesData = await timeSeriesResponse.json();
      setData(timeSeriesData);

      const stockTableResponse = await fetch(`http://localhost:8082/portfolio/constituent_table/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      const stockTableJson = await stockTableResponse.json();
      setStockTableData(stockTableJson);

      const fundamentalResponse = await fetch(`http://localhost:8082/analysis/stock_fundamental/${ticker}`);
      const fundamentalJson = await fundamentalResponse.json();
      setFundamentalData(fundamentalJson);

      const technicalResponse = await fetch(`http://localhost:8082/analysis/stock_technical/${ticker}/${start_date}`);
      const technicalJson = await technicalResponse.json();
      setTechnicalData(technicalJson);

      const QualitativeResponse = await fetch(`http://localhost:8082/analysis/stock_summary/${ticker}/2023-02-28`);
      const QualitativeJson = await QualitativeResponse.json();
      setQualitativeData(QualitativeJson);

      
    } catch (error) {
      console.log('Fetch data failed:', error);
    }
  };

  const RenderTable = ({ data }) => {
    const columns = [
      {
        title: 'Metric',
        dataIndex: 'metric',
        key: 'metric',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
      },
    ];
  
    // Transform the data object into an array of objects suitable for Ant Design Table
    const dataSource = Object.keys(data).map((key) => ({
      key,
      metric: key,
      value: typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key],
    }));
  
    return <Table columns={columns} dataSource={dataSource}  pagination={{ pageSize: 10 }} />;
  };


  const constituents = tickers;


  const handleTickerChange = (value) => {
    setTicker(value);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Quantfolio Analysis',
      children: <p>{qualitativeData}</p>,
    },
    {
      key: '2',
      label: 'Technical Analysis',
      children:  <RenderTable data = {technicalData}/>
    },
   
    {
      key: '3',
      label: 'Fundamental Analysis',
      children: (
        <div> 
          <RenderTable data = {fundamentalData}/>
        </div>
      ),
    },
  ];

  return (
    <div style={{ paddingTop: '20px', paddingLeft: '30px', paddingRight: '30px' }}>
    
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <h2>Constituent Analysis</h2>
            <Select
              style={{ width: '100%', marginBottom: 16 }}
              onChange={handleTickerChange}
              placeholder="AAPL"
              defaultValue="AAPL" // Set the default value to "AAPL"
            >
              {constituents.map(item => (
                <Option value={item}>{item}</Option>
              ))}
              
            </Select>
            <SingleTimeSeries input_data={data} title={ticker} />
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
              {items.map(item => (
                <Panel header={item.label} key={item.key}>
                  {item.children}
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
        <Col span={12}>
        <StockTable stockData={stockTableData}/>
        </Col>
      </Row>
    </div>
  );
};

export default ConstituentAnalysis;
