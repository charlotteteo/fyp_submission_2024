import React from 'react';
import Plot from 'react-plotly.js';

const CorrMatrix = ({ data, labels }) => {
  // Generate correlation matrix
  const correlationMatrix = data/* Your logic to generate the correlation matrix */;
  

  // Create a trace for heatmap
  const heatmapTrace = {
    z: correlationMatrix,
    x: labels,
    y: labels,
    type: 'heatmap',
    colorscale:  [
        [0, '#f7fbff'], // light blue
        [1, '#18306b']  // dark blue
      ] // dark blue
  };

  // Layout settings
  const layout = {
    title: 'Correlation Matrix',
    xaxis: {
      title: 'Features',
      automargin: true
    },
    yaxis: {
      title: 'Features',
      automargin: true
    }
  };

  const config = {
    displayModeBar: false,
  };

  return (
    // <div style={{ width: '100%', height: '400px' }}>
    <Plot
      data={[heatmapTrace]}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config={config}
    />
    // </div>
  );
};

export default CorrMatrix;
