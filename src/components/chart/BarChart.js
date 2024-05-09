import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const BarChart = () => {
  const [interval, setInterval] = useState('M'); // Default interval is month
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [interval]); // Fetch data when interval changes

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/portfolio/return_ts/${interval}/AAPL%3BGOOGL%3BAMZN%3BJNJ%3BTSLA%3BJPM%3BMSFT%3BV%3BPG%3BIEF/0.14%3B0.08%3B0.09%3B0.14%3B0.10%3B0.06%3B0.10%3B0.08%3B0.14%3B0.07/2018-01-01/2024-02-20/10000`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const data = barChartData.map((item, index) => {
    const colors = item.values.map(value => value > 0 ? '#b7eb8f' : '#ffa39e');
    return {
      x: item.dates, // Use x-axis for dates
      y: item.values,
      type: 'bar',
      name: item.dates,
      marker: { color: colors } // Set colors for each bar based on its value
    };
  });

  // Layout configuration
  const layout = {
    title: 'Returns',
    xaxis: { 
      title: 'Dates',
      type: 'date', // Set type to date for proper date formatting
      tickformat: '%Y-%m-%d' // Format ticks as YYYY-MM-DD
    },
    yaxis: { title: 'Returns (%)' }
  };

  const config = {
    displayModeBar: false,
  };

  return (
    <div>
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option key="day" value="D">Day</option>
        <option key="month" value="M">Month</option>
        <option key="year" value="Y">Year</option>
      </select>
      
      <Plot
        data={data}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        config = {config}
      />
    </div>
  );
};

export default BarChart;
