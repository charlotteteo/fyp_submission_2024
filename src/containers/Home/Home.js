import React from 'react'
import { Row, Col, Button, Space } from 'antd';
import "./Home.less";
import { Container } from '../../components/Container/Container';
import { AppButton } from '../../components/AppButton/AppButton';

import img from '../../assets/home/intro.png'

export const Home = () => {
  return (
    <section id="home" className="home">
      <Container className="home__container">
        <Row>
          <Col xs={24} md={12} className="home__intro">
            <h1 className="intro__heading">
            Empowering individuals with the knowledge and tools to achieve financial success through strategic investing.
            </h1>
            <p className="intro__sub-heading">
           Cutting-edge Analytics, Personalized Insights, Beginner Friendly
            </p>
            {/* <Space size={"large"} className="intro__button-group">
              <AppButton type="primary">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/QuocDat1994/react-antd-landing-page">
                  Download
                </a>
              </AppButton>
              <AppButton>
                <a href="#contact">
                  Contact US
                </a>
              </AppButton>
            </Space > */}
          </Col>
          <Col xs={24} md={12} className="home__img-wrapper">
            <img
              className="home__img"
              src={img}
              alt={img}
            />
          </Col>
        </Row>
      </Container>
    </section >
  )
}
