import React, { useState, useEffect } from 'react';
import {Card,Row,Table,Col} from 'antd';
import { Line,Area } from '@ant-design/plots';
import PieChart from "../../../components/chart/PieChart";
import StockTable from "../../../components/table/StockTable";
import MultiLineGraph from "../../../components/chart/MultiLineGraph";


const PortfolioOverallPage = ({lastPart}) => {
  const [data, setData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [driftData, setDriftData] = useState([]);
  const [stockTableData, setStockTableData] = useState([]);
  const [assetTypePieData, setAssetTypePie] = useState([]);
  const [sectoralPieData, setSectoralPie] = useState([]);
  const [constituentPieData, setConstituentPie] = useState([]);

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

    fetch(`http://localhost:8082/portfolio/type_pie/${lastPart}`)
      .then((response) => response.json())
      .then((json) => setAssetTypePie(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });



    fetch(`http://localhost:8082/portfolio/sectoral_pie/${lastPart}`)
      .then((response) => response.json())
      .then((json) => setSectoralPie(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });

      fetch(`http://localhost:8082/portfolio/constituent_pie/${lastPart}`)
      .then((response) => response.json())
      .then((json) => setConstituentPie(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  console.log(data);

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


  return (
    <div style={{ padding: '0 30px' }}>
  <Row gutter={16}>
  <Col span={24}>
          <Card>
          <h2>My Portfolio</h2>
           <MultiLineGraph input_data={data} stacked = {false} />

          </Card>

 </Col>
  
  </Row>
  <Row>
  <Col span={4}>
  <Card>
  <PieChart input_data = {assetTypePieData}  title="Sectoral Exposure"/>
  </Card>
  </Col>
  <Col span={4}>
  <Card>
  <PieChart input_data = {sectoralPieData}  title="Sectoral Exposure"/>
  </Card>
  </Col>
  <Col span={4}>
  <Card>
  <PieChart input_data = {constituentPieData}  title="Constituent Exposure"/>
  </Card>
  </Col>
  <Col span={12}>
  
    <Card>
      <PortfolioTable data={portfolioData} />

    </Card>
  

  </Col>
  </Row>
  </div>);
};

export default PortfolioOverallPage;
