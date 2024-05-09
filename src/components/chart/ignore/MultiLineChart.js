import React from 'react';
import { Line } from '@ant-design/plots';

function MultiLineChart(data, xField, yField, seriesField, yAxisLabelFormatter, legendPosition, smooth, animation, width, height) {
  // Format the data into the required structure
  const formattedData = Object.keys(data).map((symbol) => ({
    [seriesField]: symbol,
    data: Object.entries(data[symbol]).map(([date, value]) => ({ [xField]: date, [yField]: value })),
  }));

  

  const config = {
    data: formattedData,
    xField,
    yField,
    seriesField,
    yAxis: {
      label: {
        formatter: yAxisLabelFormatter || ((v) => `${(v / 10e8).toFixed(1)} B`),
      },
      title: {
        style: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        text: 'Price',
      },
    },
    xAxis: {
      title: {
        style: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        text: 'Date',
      },
    },
    legend: {
      position: legendPosition || 'top',
    },
    smooth: smooth || true,
    animation: animation || {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    width: width || 400, // Default width
    height: height || 300, // Default height
    displayModeBar: false,
  };

  return <Line {...config} />;
}

export default MultiLineChart;
