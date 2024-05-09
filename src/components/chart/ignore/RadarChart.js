import React from 'react';
import { Radar } from '@ant-design/plots';

const transformPortfolioData = (data) => {
  const transformedData = [];

  // Define the items you want to include in the radar chart
  const items = ['risk', 'return', 'liquidity', 'volatility'];

  // Iterate over each asset class and item to create the transformed data
  data.forEach((entry) => {
    items.forEach((item) => {
      transformedData.push({
        trait: item,
        user: entry.assetClass,
        score: entry[item.toLowerCase()],
      });
    });
  });

  return transformedData;
};

const RadarChart = ({ data, width, height }) => {
  const dataInput = transformPortfolioData(data);
  console.log(dataInput);
  const config = {
    data: dataInput, // Corrected the data property
    seriesField: 'user', // Use 'user' as the xField
    yField: 'score', // Use 'score' as the yField
    xField: 'trait',
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      line: null,
      tickLine: null,
    },
    area: true,
    point: {
      size: 2,
      line: {
        style: {
          lineWidth: 1, // Adjust line width as needed
          stroke: '#1890FF', // Adjust line color as needed
        },
      },
    },
    meta: {
      series: { alias: 'Series' }, // Changed aliases to 'Score'
    },
  };

  return <Radar {...config} style={{ width, height }} />;
};

export default RadarChart;
