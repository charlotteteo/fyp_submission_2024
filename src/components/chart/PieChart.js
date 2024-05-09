import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({input_data, title}) => {
  // Sample data for the pie chart
  const data = input_data.map((item, index) => ({
    labels: item.labels, // Use x-axis for dates
    values: item.series,
    type: 'pie'
  }));

  // Layout for the pie chart
  const layout = {
    title: title,
    legend: {
      orientation: 'h', // Set legend orientation to horizontal
      x: 0,
      y: -0.1, // Adjust position as needed
      font: { size: 10 } // Adjust legend font size
    },
    showlegend: true, // Show legend
    autosize: true, // Autosize the chart to fill the container
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 4
    },
    // You can customize other layout options here
  };
  const config = {
    displayModeBar: false
  };


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={data}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        config = {config}
        // You can specify other configuration options for Plotly.js here
      />
    </div>
  );
};

export default PieChart;
