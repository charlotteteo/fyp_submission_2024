import React from 'react'
import { Col, Row } from 'antd';
import { Container } from '../../components/Container/Container';
import { AppButton } from '../../components/AppButton/AppButton';

import img from "../../assets/business-plan/business-img.png";
import "./BusinessPlan.less"

export const BusinessPlan = () => {
  return (
    <section id="BusinessPlan" className="business-plan">
      <Container className="business-plan__container">
        <Row>
          <h1></h1>
        </Row>
        <Row gutter={64}>
        
          <Col sm={24} md={12}>
            <img className="business-plan__img" src={img} alt={img} />
          </Col>
          <Col sm={24} md={12}>
            <h1 className="business-plan__title">
              Crafted For Beginner to Advanced Investors
            </h1>
            <p className="business-plan__desc">
            The digital nature of robo-advisory services has spurred extensive research into the
application of artificial intelligence in portfolio management. AI-driven
portfolio management has consistently demonstrated superior performance compared to
classical financial theories and traditional models. The
advantages are clear, with AI enhancing efficiency, deepening customer insights, and
significantly improving overall performance.

               </p>
            
            
          </Col>
        </Row>
      </Container>
    </section>
  )
}
