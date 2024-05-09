import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import OverallPage from './OverallPage';
import WatchlistPage from './WatchlistPage';
import AnalyticsPage from './AnalyticsPage';

const { Sider, Content } = Layout;

function DashboardPage({ children }) {
  const location = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  useEffect(() => {
    setSelectedMenuItem(getSelectedMenuItem(location.pathname));
  }, [location.pathname]);

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  function getSelectedMenuItem(path) {
    if (path.includes('/dashboard/overall')) {
      return 'Summary';
    } else if (path.includes('/dashboard/DetailedPortfolio')) {
      return 'Overall Portfolio';
    } else if (path.includes('/dashboard/SectoralExposure')) {
      return 'Sectoral Exposure';
    } else if (path.includes('/dashboard/ConstituentAnalysis')) {
      return 'Constituent Analysis';
    } else if (path.includes('/dashboard/analytics')) {
      return 'Qualitative Analyis';
    } else if (path.includes('/dashboard/watchlist')) {
      return 'Upload Data';
    }
    // Add more conditions for other menu items if needed

    return ''; // Default to empty string
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="Summary">
            <Link to="/dashboard/overall">Summary</Link>
          </Menu.Item>
          <Menu.Item key="Overall Portfolio">
            <Link to="/dashboard/DetailedPortfolio">Overall Portfolio</Link>
          </Menu.Item>
          <Menu.Item key="Sectoral Exposure">
            <Link to="/dashboard/SectoralExposure">Sectoral Exposure</Link>
          </Menu.Item>
          <Menu.Item key="Constituent Analysis">
            <Link to="/dashboard/ConstituentAnalysis">Constituent Analysis</Link>
          </Menu.Item>
          <Menu.Item key="Qualitative Analyis">
            <Link to="/dashboard/analytics">Qualitative Analysis</Link>
          </Menu.Item>
          <Menu.Item key="Upload Data">
            <Link to="/dashboard/watchlist">Upload Data</Link>
          </Menu.Item>
          {/* Add more menu items as needed */}
        </Menu>
      </Sider>
      <Layout>
        <Content className="content-ant">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
