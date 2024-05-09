// AppHeader.js

import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Affix, Menu, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import { Container } from '../../Container/Container';

import './InAppHeader.less';

export const InAppHeader = ({ onToggle, onLogout }) => {
  const { Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    if (onToggle) {
      onToggle(!collapsed);
    }
  };

  const handleMenuClick = (path) => {
    if (collapsed) {
      setCollapsed(false);
    }

    // Use ScrollLink for smooth scrolling for internal links
    if (path.startsWith('#')) {
      // For section links
      return;
    }

    // For external links or routes
    history.push(path);
  };

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    }
    // Redirect to sign-in page after sign-out
    history.push("/sign-in");
  };

  return (
    <Affix offsetTop={0}>
      <Header className={`in-app-header ${collapsed ? 'collapsed' : ''}`}>
      <span className="logo">QuantFolioX</span>
      <span> <h1 style={{color:'#001f3f', marginBottom:'0px',opacity:1}}>____________________________ </h1></span>
        <Container className="app-header__content">
          <ScrollLink to="home" smooth={true} duration={500}>
           
          </ScrollLink>
          <Menu
            className="app-header__menu"
            mode={collapsed ? 'vertical' : 'horizontal'}
            defaultSelectedKeys={['home']}
            selectedKeys={[location.pathname]}
            overflowedIndicator={<MenuOutlined className="app-header__menu-icon" onClick={handleToggle} />}
          >
            <Item key="/dashboard/overall">
              <NavLink to="/dashboard/overall" activeClassName="active">
                <p style={{color:'white', marginBottom:'0px'}}> Dashboard</p>
              </NavLink>
            </Item>
            <Item key="/portfolioexplorer">
              <NavLink to="/portfolioexplorer" activeClassName="active">
              <p style={{color:'white', marginBottom:'0px'}}> Portfolio Explorer</p>
                
              </NavLink>
            </Item>
            <Item key="/robochat">
              <NavLink to="/robochat" activeClassName="active">
              <p style={{color:'white', marginBottom:'0px'}}> Robo Chat</p>
              </NavLink>
            </Item>
            <Item key="/newsfeed">
              <NavLink to="/newsfeed" activeClassName="active">
              <p style={{color:'white', marginBottom:'0px'}}> Newsfeed</p>
              </NavLink>
            </Item>
            <Item key="/profile">
              <NavLink to="/profile" activeClassName="active">
              <p style={{color:'white', marginBottom:'0px'}}> Account</p>
              </NavLink>
            </Item>
            <Item key="/settings">
              <NavLink to="/settings" activeClassName="active">
              <p style={{color:'white', marginBottom:'0px'}}> Settings</p>
              </NavLink>
            </Item>
          </Menu>
          <NavLink to="/sign-in">
          <Button type="false" onClick={handleSignOut}>Sign Out</Button>
          </NavLink>
          
        </Container>
 
      </Header>
    </Affix>
  );
};
