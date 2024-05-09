import React, { useState, useEffect } from 'react';
import {Card,Row,Table,Col} from 'antd';
import { Line,Area } from '@ant-design/plots';
import StockTable from "../../components/table/StockTable";
import BarChart from  "../../components/chart/BarChart";
import LineChart from "../../components/chart/LineChart";
import MultiLineGraph from "../../components/chart/MultiLineGraph";
import { Spin } from 'antd';

const DetailedPortfolio = ({tickers,weights,start_date,end_date,initial_investment}) => {
  const [data, setData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [driftData, setDriftData] = useState([]);
  const [stockTableData, setStockTableData] = useState([]);
  const [drawdownData, setDrawdownData] = useState([]);
  const [moversData, setMoversData] = useState([]);
  
  const tickers_str = tickers.join('%3B');
  const weights_str = weights.join('%3B'); 
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch( `http://localhost:8082/portfolio/time_series/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });

      fetch(`http://localhost:8082/portfolio/max_drawdown_ts/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => {
        setDrawdownData(json)
        console.log(drawdownData);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });

    fetch(`http://localhost:8082/portfolio/metrics/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => setPortfolioData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    
      fetch(`http://localhost:8082/portfolio/allocation_drift_timeseries/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => setDriftData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    
    fetch( `http://localhost:8082/portfolio/constituent_table/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => setStockTableData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });

      fetch(`http://localhost:8082/portfolio/top_movers/${tickers_str}/${weights_str}/${start_date}/${end_date}/${initial_investment}`)
      .then((response) => response.json())
      .then((json) => {
        setMoversData(json)
      })
  };


  console.log(moversData[0]?.winners);

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



  const TopMoversTable = ({ data }) => {
    const renderTableData = (tickers, changes) => {
      return tickers.map((ticker, index) => {
        const change = changes[index];
        const changePercentage = `${Math.abs(change)}%`;
        const changeStyle = { color: change >= 0 ? 'green' : 'red' };
        const formattedChange = (
          <>
            <span style={changeStyle}>{change > 0 ? `+${changePercentage}` : `-${changePercentage}`}</span>
          </>
        );
  
        return {
          key: ticker,
          ticker,
          change: formattedChange,
        };
      });
    };
  
    const winnersColumns = [
      {
        title: 'Ticker',
        dataIndex: 'ticker',
        key: 'ticker',
      },
      {
        title: '1 Week Change',
        dataIndex: 'change',
        key: 'change',
      },
    ];
  
    const winnersDataSource = renderTableData(data?.winners.tickers, data?.winners['7d_change']);
    const losersDataSource = renderTableData(data?.losers.tickers, data?.losers['7d_change']);
  
    return (
      <div>
        <h2>Top Movers</h2>
        <Row>
        <Col span={12}>
        <Table
          columns={winnersColumns}
          dataSource={winnersDataSource}
          pagination={false}
          title={() => <strong>Winners</strong>}
        />
        </Col>
        <Col span={12}>
        <Table
          columns={winnersColumns}
          dataSource={losersDataSource}
          pagination={false}
          title={() => <strong>Losers</strong>}
        />
        </Col>
        </Row>
      </div>
    );
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

<Card bordered={false} size="small">
            <div>
            {moversData.length > 0  ? (
     
          <TopMoversTable data={moversData[0]} />
      
      ) : (
        <Spin size="large" />
      )}
            </div>
            
</Card>
</Col>
  </Row>
 
  </div>);
};

export default DetailedPortfolio;
