import React from 'react';
import { DualAxes, G2 } from '@ant-design/plots';

const DualAxisBarChart = ({ uvBillData, transformData, width, height }) => {
  const { registerTheme } = G2;
  registerTheme('custom-theme', {
    colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],

    /** 20色板 */
    colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
  });

  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
        label: {},
      },
      {
        geometry: 'line',
      },
    ],
    legend: {
      marker: {
        symbol: 'circle',
        style: {
          lineWidth: 2,
          r: 6,
          stroke: '#5AD8A6',
          fill: '#fff',
        },
      },
      layout: 'vertical',
      position: 'right',
      itemName: {
        formatter: (val) => `@${val}`,
        style: {
          fill: '#333',
        },
      },
    },
    interactions: [
      {
        type: 'element-highlight',
      },
      {
        type: 'active-region',
      },
    ],
    animation: false,
    theme: 'custom-theme',
  };

  return <DualAxes {...config} style={{ width, height }} />;
};

export default DualAxisBarChart;
