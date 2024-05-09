import Layout, { Content } from 'antd/lib/layout/layout';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Home } from '../../containers/Home/Home';
import { About } from '../../containers/About/About';
import { BusinessPlan } from '../../containers/BusinessPlan/BusinessPlan';
import { Services } from '../../containers/Services/Services';
import { Showcase } from '../../containers/Showcase/Showcase';
import { Blog } from '../../containers/Blog/Blog';
import { Contact } from '../../containers/Contact/Contact';
import { AppFooter } from '../../components/AppFooter/AppFooter';
import { Element } from 'react-scroll';

import './LandingPage.less';

function LandingPage() {
  return (
    <Layout>
      <AppHeader />
      <Element name="home">
        <Home />
        </Element>
       
        <Element name="business-plan">
        <BusinessPlan />
        </Element>
        <AppFooter/>
    </Layout>
  
  );
}

export default LandingPage;
