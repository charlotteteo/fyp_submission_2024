import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlot = ({ input_data }) => {
  // Convert input data to Plotly traces
  const data = input_data.map((item, index) => ({
    y: item.values,
    type: 'box',
    name: item.ticker
  }));

  // Layout for the graph
  const layout = {
    title: 'Sectoral Exposure Returns',
    xaxis: {
        title: 'Ticker', // Label for x-axis
        tickmode: 'array', // Set tickmode to 'array' for custom tick labels
        tickvals: input_data.map(item => item.ticker), // Specify tick values as ticker symbols
        ticktext: input_data.map(item => item.ticker), // Specify tick text as ticker symbols
      },
    yaxis: {
      title: 'Value'
    }
  };

  // Configuration for the plot (optional)
  const config = {
    displayModeBar: false
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config={config}
    />
  
  );
};

export default BoxPlot;
