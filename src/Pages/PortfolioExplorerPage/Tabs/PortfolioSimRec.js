import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Table, Spin } from 'antd';
import PieChart from "../../../components/chart/PieChart";

const PortfolioSimRec = ({ lastPart }) => {
    const [expectedReturnsData, setExpectedReturnsData] = useState([]);
    const [recommendedAllocation, setRecommendedAllocation] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        try {
            const dataResponse = await fetch(`http://localhost:8082/portfolio/recommendation_allocation/${lastPart}`);
            const dataJson = await dataResponse.json();
            setExpectedReturnsData(dataJson.expected_returns);
            setRecommendedAllocation(dataJson.allocated_weights);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.log('fetch data failed', error);
        }
    };

    const columns = [
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Last Price',
            dataIndex: 'last_price',
            key: 'last_price',
        },
        {
            title: 'Expected Price',
            dataIndex: 'expected_price',
            key: 'expected_price',
        },
        {
            title: 'Expected Return',
            dataIndex: 'expected_return',
            key: 'expected_return',
        },
        {
            title: 'Forecast Date',
            dataIndex: 'forecast_date',
            key: 'forecast_date',
        },
    ];

    return (
        <div style={{ padding: '0 30px' }}>
            <Card>
                {/* <h1>Portfolio Recommendations</h1> */}
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <Row gutter={[16, 16]} justify="center">
                        <Col span={12}>
                            <h2>Recommended Allocation</h2>
                            <PieChart input_data={[recommendedAllocation]} title="Recommended Allocation" />
                        </Col>
                        <Col span={12}>
                            <h2>Expected Returns</h2>
                            <Table
                                dataSource={expectedReturnsData.map((item, index) => ({
                                    key: index,
                                    stock: item.stock,
                                    last_price: item.last_price,
                                    expected_price: item.expected_price,
                                    expected_return: item.expected_return,
                                    forecast_date: item.forecast_date
                                }))}
                                columns={columns}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                )}
            </Card>
        </div>
    );
};

export default PortfolioSimRec;
