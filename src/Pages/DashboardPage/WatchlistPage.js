import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from 'antd';
import { Row, Col, Card, Form, Input, Button, Table } from 'antd';

const { Dragger } = Upload;

const WatchlistPage = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/portfolio/portfolio_trades/{id}/Technology%20Portfolio?u_id=65e43f456e0119059964666a');
        const jsonData = response.data;
        mapJsonToTableData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  const mapJsonToTableData = (jsonData) => {
    const columns = Object.keys(jsonData[0]).map(key => ({
      title: key.replace('_', ' ').toUpperCase(),
      dataIndex: key,
      key: key,
    }));
    const dataSource = jsonData.map((item, index) => ({
      ...item,
      key: index,
    }));
    setColumns(columns);
    setDataSource(dataSource);
  };
  return (
    <div style={{ padding: '0 30px' }}>
      <Row justify="space-between" style={{ marginTop: '20px' ,marginBottom: '20px' }}>
        <h2>Upload Data</h2>
        <Button type="primary" onClick={handleOpenModal}>
          View Current Transaction Data
        </Button>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
        <Card>
          <h2>Update Manually</h2>
          <Form
            layout="vertical"
            onFinish={(values) => {
              console.log('Received values:', values);
            }}
          >
            <Form.Item
              label="Instrument Code"
              name="instrumentCode"
              rules={[{ required: true, message: 'Please enter instrument code!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Market Code"
              name="marketCode"
              rules={[{ required: true, message: 'Please enter market code!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Trade Date"
              name="tradeDate"
              rules={[{ required: true, message: 'Please select trade date!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: 'Please enter quantity!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Share Price/Unit"
              name="sharePrice"
              rules={[{ required: true, message: 'Please enter share price per unit!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Brokerage Fee"
              name="brokerageFee"
              rules={[{ required: true, message: 'Please enter brokerage fee!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        </Col>
        <Col span={12}>
          <Card>
            <h2>Insert Transaction Data</h2>
            <Dragger
              name="file"
              multiple
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              onChange={(info) => {
                const { status } = info.file;
                if (status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
              onDrop={(e) => {
                console.log('Dropped files', e.dataTransfer.files);
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">in csv/xlsx format</p>
            </Dragger>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Pop-up Tab View"
        visible={visible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {/* Content for the pop-up tab view */}
        <p>This is the content of the pop-up tab view.</p>
          <Table dataSource={dataSource} columns={columns} />
      </Modal>
    </div>
  );
};

export default WatchlistPage;
