/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useLocation } from "react-router-dom";
import { Layout, Affix } from "antd";
import { InAppHeader } from "./InAppHeader/InAppHeader";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppFooter } from "../AppFooter/AppFooter";
const { AppHeader: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout
    >
      <InAppHeader/>
        <Content className="content-ant">{children}</Content>
      <AppFooter/>
    </Layout>
  );
}


export default Main;
