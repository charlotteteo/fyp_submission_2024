import React from 'react';
import { Line } from '@ant-design/plots';

const StockLineChart = ({ data }) => {
  const chartConfig = {
    data,
    xField: 'Date',
    yField: 'Close',
    // seriesField: 'type',
    height: 400,
    // xAxis: { type: 'time' },
    yAxis: { title: { text: 'Stock Value' } },
    autoFit: true,
    forceFit: true,
    padding: 'auto',
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.1,
          end: 1,
        },
      },
    ],
    displayModeBar: false,
  };

  return <Line {...chartConfig} />;
};

export default StockLineChart;
