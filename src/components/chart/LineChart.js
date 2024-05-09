import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ input_data }) => {
  const data = input_data.map((item, index) => ({
    x: item.dates, // Use dates for x-axis
    y: item.values,
    type: 'scatter',
    mode: 'lines',
    fill: 'tonexty',
    marker: { color: 'red' },
    name: item.name // Use item name for legend
  }));

  const config = {
    displayModeBar: false,
  };

  // Layout configuration
  const layout = {
    title: 'Max Drawdown Chart',
    xaxis: { title: 'Date' }, // Set x-axis title to 'Date'
    yaxis: { title: 'Returns' }
    // You can customize other layout options here
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config = {config}
    />
  );
};

export default LineChart;
