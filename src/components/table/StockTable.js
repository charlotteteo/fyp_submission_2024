import React from 'react';
import { Table, Tag } from 'antd';
import StockAnalysisModal from '../modal/StockAnalysisModal';

const StockTable = ({ stockData }) => {
  const columns = [
    {
      title: 'Constituent',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'Holding Value',
      dataIndex: 'current_value',
      key: 'current_value',
    },
    {
      title: 'Initial Investment',
      dataIndex: 'initial_investment',
      key: 'initial_investment',
    },
   
   
    {
      title: '1D Change (%)',
      dataIndex: '1d_change',
      key: '1d_change',
      render: (change) => (
        <Tag color={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? `+${change}` : change}
        </Tag>
      ),
    },
    {
      title: '1M Change (%)',
      dataIndex: '30d_change',
      key: '30d_change',
      render: (change) => (
        <Tag color={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? `+${change}` : change}
        </Tag>
      ),
    },
    {
      title: 'YTD Change (%)',
      dataIndex: '1y_change',
      key: '1y_change',
      render: (change) => (
        <Tag color={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? `+${change}` : change}
        </Tag>
      ),
    },
    {
      title: 'Overall Change (%)',
      dataIndex: 'overall_change',
      key: 'overall_change',
      render: (change) => (
        <Tag color={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? `+${change}` : change}
        </Tag>
      ),
    },


    {
      title: 'Additional Info',
      dataIndex: 'ticker',
      key: 'ticker',
      render: (holding) => (
          <StockAnalysisModal stockname={holding} />
      ),
    }
  ];

  return <Table columns={columns} dataSource={stockData} />;
};

export default StockTable;
