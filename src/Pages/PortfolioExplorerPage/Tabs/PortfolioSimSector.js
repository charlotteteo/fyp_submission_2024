import React, { useState, useEffect } from 'react';
import { Line, Box, Heatmap } from '@ant-design/plots';
import { Card, Table , Row,Col} from 'antd';
import CorrMatrix from '../../../components/chart/CorrMatrix';
import MultiLineGraph from '../../../components/chart/MultiLineGraph';
import BoxPlot from '../../../components/chart/BoxPlot';



const PortfolioSimSector = ({lastPart}) => {
    // const [pieData, setPieData] = useState([]);
    const [data, setData] = useState([]);
    const [metricsData, setMetricsData] = useState([]);
    const [boxPlotData, setBoxPlotData] = useState([]);
    const [corrData, setCorrData] = useState([]);
    const [sectoralDriftData, setSectoralDriftData] = useState([]);
    
    
    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        try {

            const timeSeriesResponse = await fetch(`http://localhost:8082/portfolio/sectoral_ts/${lastPart}`);
            const timeSeriesJson = await timeSeriesResponse.json();
            setData(timeSeriesJson);

            const sectoralDriftTimeSeriesResponse = await fetch(`http://localhost:8082/portfolio/drift_sectoral_ts/${lastPart}`);
            const sectoralDriftTimeSeriesJson = await sectoralDriftTimeSeriesResponse.json();
            setSectoralDriftData(sectoralDriftTimeSeriesJson);

            const metricsResponse = await fetch(`http://localhost:8082/portfolio/sectoral_metrics/${lastPart}`);
            const metricsJson = await metricsResponse.json();
            setMetricsData(metricsJson);

            const boxPlotResponse = await fetch(`http://localhost:8082/portfolio/sectoral_box_chart/${lastPart}`);
            const boxPlotJson = await boxPlotResponse.json();
            setBoxPlotData(boxPlotJson);

            const corrDataResponse = await fetch(`http://localhost:8082/portfolio/sectoral_corr_chart/${lastPart}`);
            const corrDataJson = await corrDataResponse.json();
            setCorrData(corrDataJson);

            

        } catch (error) {
            console.log('fetch data failed', error);
        }
    };
    const primaryColor = '#1890ff';
    const colorPalette = [primaryColor, '#2fc25b', '#facc14', '#f04864', '#8543e0', '#13c2c2'];
    console.log(data);
    

    const fakedata = corrData.data || [];
    
    const labels = corrData.labels || [];
    
    const boxPlotConfig = {
        width: 400,
        height: 500,
        data: boxPlotData,
        xField: 'x',
        yField: ['low', 'q1', 'median', 'q3', 'high'],
        boxStyle: {
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3,
        },
        animation: false,
        yAxis: {
            label: {
                formatter: (v) => `${v.toFixed(4)}`,
            },
        },
        tooltip: {
            formatter: (datum) => {
                return {
                    name: 'value',
                    value: datum.value.toFixed(4),
                };
            },
        },
    };

    const config = {
        data: corrData,
        width: 650,
        height: 500,
        autoFit: false,
        xField: 'sector1',
        yField: 'sector2',
        colorField: 'value',
        color: colorPalette,

    };

    const MetricTable = ({ data }) => {
        if (!data) {
            return <div>Loading...</div>;
        }

        if (data.length === 0) {
            return <div>No data available</div>;
        }

        const columns = Object.keys(data[0]).map(key => ({
            title: key,
            dataIndex: key,
            key: key,
        }));

        return (
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered
            />
        );
    };

    const CorrMatrixRender = ({ data,labels}) => {
        if (!data) {
            return <div>Loading...</div>;
        }

        if (data.length === 0) {
            return <div>No data available</div>;
        }

        
        return (
            <CorrMatrix data={data} labels={labels} />
        );
    };

  
    
    // const multilineconfig = {
    //     data,
    //     xField: 'index',
    //     yField: 'value',
    //     seriesField: 'ticker',
    //     color: colorPalette,
    //     areaStyle: {
    //         fillOpacity: 0.7,
    //     },
    //     meta: {
    //         year: {
    //             nice: true,
    //             range: [0, 1],
    //         },
    //     },
    //     yAxis: {
    //         label: {
    //             formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
    //         },
    //     },
    //     legend: {
    //         position: 'top',
    //     },
    //     smooth: true,
    //     animation: {
    //         appear: {
    //             animation: 'path-in',
    //             duration: 5000,
    //         },
    //     },
    // };
    

    return (
        <div style={{ padding: '0 30px' }}>
        
            <Row>
            <Col span={24}>
                <Card>
          <h2>Sectoral Exposure Analysis</h2>
                            <MultiLineGraph input_data={data} stacked = {false} />
                           
                        </Card>
                        </Col>
                
            </Row>
            <Row>
                
                <Col span={16}>
                <Card>
                          
                            <MultiLineGraph input_data={sectoralDriftData} stacked = {true} />
                        </Card>
                        </Col>
                
                        <Col span={8}>
                <Card>
                <CorrMatrixRender data={fakedata} labels={labels} />
                </Card>
                            </Col>
            </Row>
                <Row>
                <Col span={8}>
                <Card>
                        <BoxPlot input_data={boxPlotData}/>
                </Card>
                </Col>
                <Col span={16}>
                <Card>
                            {metricsData && <MetricTable data={metricsData} />}
                        </Card>
                </Col>
               
                
                </Row>
            
        </div>
       
    );
};

export default PortfolioSimSector;
