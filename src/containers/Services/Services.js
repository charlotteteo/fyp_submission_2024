import React from 'react';
import { Card } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Container } from '../../components/Container/Container';
import { ServiceCard } from './ServiceCard/ServiceCard';

import "./Services.less";

export const Services = () => {
  const description = "Reinventing Portfolio Management to equip beginners with the ability to reach their financial goals"
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2229651_awfgn4o1jo8.js'
  });

  const serviceList = [
    {
      title: "AI-Driven Portfolio Management",
      description: "Leveraging on Financial Data",
      icon: "icon-coffee"
    },
    {
      title: "Systematic Rebalancing",
      description: "Leveraging on NLP & Reinforcement Learning",
      icon: "icon-suitcase"
    },
    {
      title: "Generative AI Supported Robo Advisor",
      description: "Leveraging on Chatgpt-4 Technology",
      icon: "icon-Idea"
    },
    {
      title: "News Feed",
      description: "Leveraging on Sentiment Analysis",
      icon: "icon-stack1"
    }
  ]

  return (
    <section id="services" className="services">
      
      <Container>
        <SectionHeading heading="Services We Provide" subHeading={description}/>
        <Card className="services__content">
          {
            serviceList.map(service => (
              <ServiceCard
                key={service.title}
                icon={<IconFont type={service.icon} />}
                title={service.title}
                description={service.description}
              />
            ))
          }
        </Card>
      </Container>
    </section>
  )
}
