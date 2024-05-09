import React, { useState, useEffect } from "react";
import { Row, Col, Card, Select, Space, Input,Button, Modal } from "antd";
import { CaretUpOutlined, CaretDownOutlined, LeftOutlined,RightOutlined , RetweetOutlined, ArrowRightOutlined} from "@ant-design/icons";
import "./NewsFeedPage.less";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
const { Option } = Select;
const { Search } = Input;

function NewsFeedPage() {

  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [headlinesData, setHeadlinesData] = useState('');
  const [newsData, setNewsData] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [evaluation, setEvaluation] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('http://localhost:8082/newsfeed/headlines_news/finance/3')
      .then((response) => response.json())
      .then((json) => {
        setHeadlinesData(json)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });

    fetch('http://localhost:8082/newsfeed/portfolio_news/tsla%3Bgoogl%3Bamzn/3')
       .then((response) => response.json())
      .then((json) => setNewsData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    

    fetch(`http://localhost:8082/newsfeed/news_evaluation/${selectedTitle}`)
      .then((response) => response.json())
     .then((json) => setEvaluation(json))
     .catch((error) => {
       console.log('fetch data failed', error);
     });

    }

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick = (id) => ({ getItemById, scrollToItem }) => {
    const itemSelected = isItemSelected(id);
    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEvaluateClick = (title) => {
    setSelectedTitle(title);
    showModal();
  };

  const handleSearch = () => {
    const filteredData = newsData.filter(({ title }) =>
      title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredNewsData(filteredData);
    setShowSearchResults(true);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setShowSearchResults(false);
  };

  const handleSend = () => {
    // handle send action
  };

  return (
    <div className="news-feed-page">
      <Row>
        <Col span={12}>
          <h1>News Feed</h1>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button
              onClick={() => setShowSearchResults(false)}
              style={{
                fontWeight: 'bold',
                fontSize: '20px',
                padding: '4px 4px',
                lineHeight: '0.1',
              }}
            >
              Refresh Headlines
              <RetweetOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
            </Button>
          </Row>
        </Col>
      </Row>
<Row>
<Col span={23}>
      <Input
        placeholder="Search news"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        allowClear
      />
      </Col>
   
      <Col span={1}>
      <Button
        className="send-button"
        type="primary"
        shape="circle"
        icon={<ArrowRightOutlined />}
        onClick={handleSearch}
      />
      </Col>
</Row>
      <Row>
        <h1></h1>
      </Row>
      
      {showSearchResults ? (
        <Row gutter={[16, 16]}>
          {filteredNewsData.map(({ date, sentiment, title, summary, link }, index) => (
            <Col key={index} span={8}>
             {/* <Card style={{ margin: "0 10px", display: "flex", flexDirection: "column" }}> */}
             <Card style={{ width: 650, margin: "0 10px", display: "flex", flexDirection: "column" }}>
  <Row justify="end">
    <a href={link}>
      <Button type="primary">
        Click To Read
      </Button>
    </a>
  </Row>
  <Row>
    <h1></h1>
  </Row>
  <div style={{ padding: '10px' }}> {/* Add padding here */}
    <h1>{title}</h1>
    <h3>Quantfolio News Summary</h3>
    <p>{summary}</p>
    <p>Sentiment: {sentiment}</p>
    <p>Published Date: {date}</p>
    <div style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}> {/* Footer */}
      <Button type="primary" block onClick={() => handleEvaluateClick(title)}>
        Evaluate Impact on Your Portfolio
      </Button>
    </div>
  </div>
</Card>
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <h1>Top Headlines News</h1>
          {/* Display top headlines */}
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {headlinesData.map(({ date, sentiment, title, summary, link}) => (
              <div key={title} style={{ height: "650px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card style={{ width: 650, margin: "0 10px", display: "flex", flexDirection: "column" }}>
                {/* <Card style={{ margin: "0 10px", display: "flex", flexDirection: "column" }}> */}
  <Row justify="end">
    <a href={link}>
      <Button type="primary">
        Click To Read
      </Button>
    </a>
  </Row>
  <Row>
    <h1></h1>
  </Row>
  <div style={{ padding: '10px' }}> {/* Add padding here */}
    <h1>{title}</h1>
    <h3>Quantfolio News Summary</h3>
    <p>{summary}</p>
    <p>Sentiment: {sentiment}</p>
    <p>Published Date: {date}</p>
    <div style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}> {/* Footer */}
      <Button type="primary" block onClick={() => handleEvaluateClick(title)}>
        Evaluate Impact on Your Portfolio
      </Button>
    </div>
  </div>
</Card>
              </div>
            ))}
          </ScrollMenu>

          <Row>
        <h1></h1>
      </Row>
      
          
          {/* Display recommended news */}
          <Row>
            <h1>Recommended for Me</h1>
          </Row>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {newsData.map(({ date, sentiment, title, summary,link }) => (
              <div key={title} style={{ width: "100%", height: "650px", overflowY: "auto" }}>
                <Card style={{ width: 600, height: 650, margin: "0 10px" }}>
                {/* <Card style={{ margin: "0 10px", display: "flex", flexDirection: "column" }}> */}
  <Row justify="end">
    <a href={link}>
      <Button type="primary">
        Click To Read
      </Button>
    </a>
  </Row>
  <Row>
    <h1></h1>
  </Row>
  <div style={{ padding: '10px' }}> {/* Add padding here */}
    <h1>{title}</h1>
    <h3>Quantfolio News Summary</h3>
    <p>{summary}</p>
    <p>Sentiment: {sentiment}</p>
    <p>Published Date: {date}</p>
    <div style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}> {/* Footer */}
      <Button type="primary" block onClick={() => handleEvaluateClick(title)}>
        Evaluate Impact on Your Portfolio
      </Button>
    </div>
  </div>
</Card>
              </div>
            ))}
          </ScrollMenu>
        </>
      )}
      
      {/* Modal for evaluation */}
      <Modal
        title={selectedTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <Card>
          <h2>How might this news impact your Portfolio?</h2>
          <p dangerouslySetInnerHTML={{ __html: evaluation.replace(/\n\n/g, "<br>") }}></p>
        </Card>
      </Modal>
    </div>
  );
}


const Arrow = ({ disabled, onClick, className, children }) => (
  <button disabled={disabled} onClick={onClick} className={className} color="blue">
    {children}
  </button>
);


const LeftArrow = () => {
  const visibility = React.useContext(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible('first', true);
  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={visibility.scrollPrev}
      className="left"
    >
      <LeftOutlined />
    </Arrow>
  );
};

const RightArrow = () => {
  const visibility = React.useContext(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible('last', false);
  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={visibility.scrollNext}
      className="right"
    >
     <RightOutlined />
    </Arrow>
  );
};



export default NewsFeedPage;