import React, { useState, useEffect } from 'react';
import { Card, Avatar, Input, Button, Tooltip } from 'antd';
import { ArrowRightOutlined, LoadingOutlined, CopyOutlined, ShareAltOutlined, SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import './RoboChatPage.less';

const RoboChatPage = ({user_id,name}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botResponse, setBotResponse] = useState('');

  useEffect(() => {
    setMessages([{ text: `How can I help you, ${name}?`, type: 'bot' }]);
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    try {
      const response = await fetch(`http://localhost:8082/chatbot/chatbot_reply/${user_id}/${inputText}`);
      const json = await response.json();
      console.log(json);
      console.log(json.data.output);
      setBotResponse(json.data.output);
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, type: 'user' },
        { text: json.data.output, type: 'bot' },
      ]);
    } catch (error) {
      console.log('fetch data failed', error);
    }
  };
  
  const boldTextRegex = /\*\*(.*?)\*\*/g;


  // const renderDescription = () => {
  //   const description = message.text;
  //   const boldTextRegex = /\*\*(.*?)\*\*/g;
  //   const formattedDescription = description.replace(boldTextRegex, '<strong>$1</strong>');
  //   return (
  //     <p style={{ whiteSpace: 'pre-line', color: 'black' , fontSize: 20 }} dangerouslySetInnerHTML={{ __html: formattedDescription }} />
  //   );
  // };

  const handleSend = async () => {
    try {
      setIsBotTyping(true);
      await asyncFetch();
      setIsBotTyping(false);

      setInputText('');
    } catch (error) {
      console.error('Error sending message to server:', error);
      setIsBotTyping(false);
    }
  };

  return (
    <div className="chat-container" style={{ height: 'calc(100vh - 20px)' }}>
     {/* <div className="side-column">
        <h3>Chat History</h3>
        <ul className="chat-history-list">
          
          <Card>
            <p>14/12/2023</p>
            <p>AMZN Stock Performance</p>
          </Card>
          <Card>
            <p>11/12/20233</p>
            <p>My Portfolio's Volatility</p>
          </Card>
          <Card>
            <p>01/12/2023:</p>
            <p>Sharpe Ratio Calculation</p>
          </Card>
        </ul>
      </div> */}
      <Card bordered={true} className="chat-card" style={{ height: 'calc(100vh - 20px)' }}>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-container ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.type === 'bot' && (
                <Avatar size={40} src="https://cdn-icons-png.flaticon.com/512/1624/1624640.png" />
              )}
              <div className={`message-bubble ${message.type === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
              {/* {message.text}  */}
               <p style={{ whiteSpace: 'pre-line', color: 'black' }} dangerouslySetInnerHTML={{ __html: message.text.replace(boldTextRegex, '<strong>$1</strong>')}} />
                <div className="message-actions">
                  <Tooltip title="Copy Response">
                    <Button icon={<CopyOutlined />} size="small" />
                  </Tooltip>
                  <Tooltip title="Share">
                    <Button icon={<ShareAltOutlined />} size="small" />
                  </Tooltip>
                  {message.type === 'bot' && (
                    <Tooltip title="Regenerate Response">
                      <Button icon={<SyncOutlined />} size="small" />
                    </Tooltip>
                  )}
                </div>
              </div>
              {message.type === 'user' && (
                <Avatar
                  size={40}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQngSXHIs4zIMfgGRdxkvP0PtPEFUR_LWEC-0gluvsx4uyRpSCJYcP5QhKQp3GjJRRHwSM&usqp=CAU"
                />
              )}
            </div>
          ))}
        </div>
        <div className="input-container">
          <Input
            className="input-field"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button
            className="send-button"
            type="primary"
            shape="circle"
            icon={isBotTyping ? <LoadingOutlined /> : <ArrowRightOutlined />}
            onClick={handleSend}
          />
        </div>
      </Card>
    </div>
  );
};

export default RoboChatPage;
