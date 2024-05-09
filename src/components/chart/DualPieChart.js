import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography, Modal } from 'antd';

const { Title } = Typography;

function PieChart({ data, title, width = 380, height = 320 }) {
  const [chartData, setChartData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContentData, setModalContentData] = useState(null);


  const pieOptions = {
    labels: chartData.labels,
    colors: ['#FF9671', '#FFC75F', '#F9F871'], // Custom colors
    legend: {
      position: 'right',
    },
    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const clickedLabel = chartData.labels[config.dataPointIndex];
          handleClick(clickedLabel);
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'right',
          },
        },
      },
    ],
  };

  const barOptions = {
    labels: modalContentData?.labels,
    colors: ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
        title: {
          formatter: function (seriesName) {
            return '';
          },
        },
      },
    },
  };

  const handleClick = (clickedLabel) => {
    if (chartData.children && chartData.children[clickedLabel]) {
      setModalContentData(chartData.children[clickedLabel]);
      setIsModalVisible(true);
    } else {
      console.error("Invalid label clicked or data structure");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={3} style={{ marginBottom: 8 }}>{title}</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactApexChart
          options={pieOptions}
          series={chartData?.series || []}
          type="pie"
          width={width}
          height={height}
        />
      </div>
      <Modal
      title='modal'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        centered
      >
        {modalContentData && (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ReactApexChart
      options={barOptions}
      series={[{ data: modalContentData.series }]}
      type="bar"
      width={300}
      height={200}
    />
  </div>
        )}
      </Modal>
    </div>
  );
}

export default PieChart;
