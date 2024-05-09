import React, { useRef, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Card } from 'antd';

const MultiLineGraph = ({ input_data, stacked }) => {

    const plotRef = useRef(null);

    useEffect(() => {
    // Adjust size on component mount and window resize
    const handleResize = () => {
      if (plotRef.current) {
        const plotContainer = plotRef.current.container;
        const cardContent = plotContainer.closest('.ant-card-body');
        if (cardContent) {
          const cardContentRect = cardContent.getBoundingClientRect();
          plotContainer.style.width = `${cardContentRect.width}px`;
          plotContainer.style.height = `${cardContentRect.height}px`;
        }
      }
    };

    handleResize(); // Initial resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [input_data]); 
    let data;

  const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

  if (stacked) {
    data = input_data.map((item, index) => ({
      x: item.dates,
      y: item.values,
      type: 'scatter',
      mode: 'lines',
      fill: 'tonexty',
      stackgroup: 'one',
      name: item.ticker,
      line: {
        color: colors[index % colors.length] // Assign color from the colors array
      }
    }));
  } else {
    data = input_data.map((item, index) => ({
      x: item.dates,
      y: item.values,
      type: 'scatter',
      mode: 'lines',
      name: item.ticker,
      line: {
        color: colors[index % colors.length] // Assign color from the colors array
      }
    }));
  }

  const layout = {
    title: stacked ? 'Portfolio Composition' : '',
    xaxis: {
      title: 'Date'
    },
    yaxis: {
      title: 'Value'
    }
  };

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

export default MultiLineGraph;
