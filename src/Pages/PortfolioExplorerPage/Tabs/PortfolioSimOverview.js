import React, { useState, useEffect } from 'react';
import {Card,Row,Table,Col} from 'antd';
import { Line,Area } from '@ant-design/plots';
import StockTable from "../../../components/table/StockTable";
import BarChart from  "../../../components/chart/BarChart";
import LineChart from "../../../components/chart/LineChart";
import MultiLineGraph from "../../../components/chart/MultiLineGraph";


const PortfolioSimOverview = ({lastPart}) => {

  // const lastPart = 'AAPL%3BGOOGL%3BAMZN%3BJNJ%3BTSLA%3BJPM%3BMSFT%3BV%3BPG%3BIEF/0.14%3B0.08%3B0.09%3B0.14%3B0.10%3B0.06%3B0.10%3B0.08%3B0.14%3B0.07/2018-01-01/2024-02-20/10000';
  const [data, setData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [driftData, setDriftData] = useState([]);
  const [stockTableData, setStockTableData] = useState([]);
  const [drawdownData, setDrawdownData] = useState([]);
  

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://localhost:8082/portfolio/time_series/${lastPart}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });

      fetch(`http://localhost:8082/portfolio/max_drawdown_ts/${lastPart}`)
      .then((response) => response.json())
      .then((json) => {
        setDrawdownData(json)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });

    fetch(`http://localhost:8082/portfolio/metrics/${lastPart}`)
      .then((response) => response.json())
      .then((json) => setPortfolioData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    
      fetch(`http://localhost:8082/portfolio/allocation_drift_timeseries/${lastPart}`)
      .then((response) => response.json())
      .then((json) => setDriftData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    
    fetch(`http://localhost:8082/portfolio/constituent_table/${lastPart}`)
      .then((response) => response.json())
      .then((json) => setStockTableData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const PortfolioTable = ({ data }) => {
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
  
    return <Table columns={columns} dataSource={dataSource} pagination={false} />;
  };

  const multilineconfig = {
    data:data,
    xField: 'index',
    yField: 'value',
    seriesField: 'ticker',
    // color: ['#82d1de', '#cb302d', '#e3ca8c'],
    areaStyle: {
      fillOpacity: 0.7,
    },
    meta: {
      year: {
        nice: true,
        range: [0, 1],
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  // const areaConfig = {
  //   driftData,
  //   xField: 'index',
  //   yField: 'value',
  //   seriesField: 'ticker',
    
  //   legend: {
  //     position: 'top',
  //   },
  //   smooth: true,
  //   animation: {
  //     appear: {
  //       animation: 'path-in',
  //       duration: 5000,
  //     },
  //   },
  // };
    
  
  // const areaPerctConfig = {
  //   data:driftData,
  //   xField: 'index',
  //   yField: 'value',
  //   seriesField: 'ticker',
  //   color: ['#82d1de', '#cb302d', '#e3ca8c'],
  //   areaStyle: {
  //     fillOpacity: 0.7,
  //   },
  //   appendPadding: 10,
  //   // isPercent: true,
  //   yAxis: {
  //     label: {
  //       formatter: (value) => {
  //         return value * 100;
  //       },
  //     },
  //   },
  // };

  return (
    <div style={{ padding: '0 30px' }}>
  <Row gutter={16}>
        <Col span={12}>
          <Card>
          <h2>My Portfolio</h2>
          <BarChart/>
          </Card>
          </Col>

          <Col span={12}>
            <Card>
          <LineChart input_data={drawdownData} />

          </Card>
  </Col>
  </Row>
  <Row>
  <Col span={12}>
  <Card>
      <MultiLineGraph input_data={driftData} stacked = {true} />
  </Card>
  </Col>
  <Col span={12}>

<Card title="Constituents Tracking" bordered={false} size="small">
            <div>
               <StockTable stockData={stockTableData} />
            </div>
            
</Card>
</Col>
  </Row>
 
  </div>);
};

export default PortfolioSimOverview;
