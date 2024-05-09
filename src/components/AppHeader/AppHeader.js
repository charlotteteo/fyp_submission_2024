import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useHistory } from 'react-router-dom';
import { Affix, Menu, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import { Container } from '../Container/Container';

import './AppHeader.less';

export const AppHeader = ({ onToggle }) => {
  const { Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location) => {
      // Extract section from the URL
      const section = location.hash.replace('#', '');
      setActiveSection(section);
    });
    // Cleanup function
    return () => {
      unlisten();
    };
  }, [history]);

  const handleToggle = () => {
    setCollapsed(!collapsed);
    if (onToggle) {
      onToggle(!collapsed);
    }
  };

  const handleMenuClick = (path, section) => {
    if (collapsed) {
      setCollapsed(false);
    }

    // Use ScrollLink for smooth scrolling for internal links
    if (path.startsWith('#')) {
      // For section links
      setActiveSection(section);
      return;
    }

    // For external links or routes
    history.push(path);
  };

  return (
    <Affix offsetTop={0}>
      <Header className={`app-header ${collapsed ? 'collapsed' : ''}`}>
        <Container className="app-header__content">
          <ScrollLink to="home" smooth={true} duration={500}>
            <span className="logo">QuantFolioX</span>
          </ScrollLink>
          <Menu
            className="app-header__menu"
            mode={collapsed ? 'vertical' : 'horizontal'}
            defaultSelectedKeys={['home']}
            selectedKeys={[activeSection]}
            overflowedIndicator={<MenuOutlined className="app-header__menu-icon" onClick={handleToggle} />}
          >
            <Item key="home" onClick={() => handleMenuClick('/#home', 'home')}>
              <ScrollLink to="home" smooth={true} duration={500}>
                <span className="app-header__menu-item">Home</span>
              </ScrollLink>
            </Item>
            <Item key="about" onClick={() => handleMenuClick('/#about', 'about')}>
              <ScrollLink to="about" smooth={true} duration={500}>
                <span className="app-header__menu-item">About</span>
              </ScrollLink>
            </Item>
         
          </Menu>
          <Link to="/sign-in">
            <Button type="false">Sign In</Button>
          </Link>
        </Container>
      </Header>
    </Affix>
  );
};
