import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd'; // Import Spin component for loading icon

const PortfolioSimAnalysis = ({ lastPart }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    
    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        try {
            const timeSeriesResponse = await fetch(`http://localhost:8082/portfolio/portfolio_summary/${lastPart}`);
            const timeSeriesJson = await timeSeriesResponse.json();
            setData(timeSeriesJson);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.log('fetch data failed', error);
        }
    };
   
    return (
        <div style={{ padding: '0 30px' }}>
            <Card>
                <h1>Qualitative Analysis of Portfolio</h1>
                {/* Display loading icon while data is being fetched */}
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <p style={{ whiteSpace: 'pre-line' }}>{data}</p>
                )}
            </Card>
        </div>
    );
};

export default PortfolioSimAnalysis;
