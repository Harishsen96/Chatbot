
import React, { useState, useEffect } from 'react';
import './App.css';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import img1 from './Image/UserImage.png';
import img2 from './Image/BotImage.png';
import welcome from './Image/BotImage.png';
import { Spin } from 'antd';
import MenuContent from './MenuContent';
const socket = new WebSocket('ws://172.26.34.37:8090');

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userLastMessage, setUserLastMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [spinerEnable, setSpinerEnable] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // New state for typing effect
  const [latestBotMessage, setLatestBotMessage] = useState(''); // New state for latest bot message
  const [currentBotMessage, setCurrentBotMessage] = useState(''); // New state for current bot message

  useEffect(() => {
    socket.onopen = () => {
      setConnected(true);
    };

    socket.onclose = () => {
      setConnected(false);
    };

    socket.onmessage = (event) => {
      const str = event.data;
      const substringToFind1 = 'gptj_model_load:';
      const substringToFind2 = 'Found model file at';

      const index1 = str.indexOf(substringToFind1);
      const index2 = str.indexOf(substringToFind2);
      if (index1 !== -1) {
        console.log(`Substring "${substringToFind1}" found at index ${index1}.`);
      } else if (index2 !== -1) {
        console.log(`Substring "${substringToFind2}" found at index ${index2}.`);
      } else {
        handleMessage('Bot', event.data);
      }
    };
  }, []);
  const handleMessage = (sendFrom, msg) => {

    let asd = true
    if (sendFrom === 'Bot' && (msg === ' ' || msg === '' || msg === userLastMessage)) { asd = false }
    if (asd) {
      setMessages((prevMessages) => [...prevMessages, [sendFrom, msg]]);
      if (sendFrom === 'Bot') { setSpinerEnable(false) }
    }
  }
  
  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
    setUserLastMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (userMessage.trim() !== '') {
      handleMessage('User', userMessage);
      socket.send(userMessage);
      setUserMessage('');
    }
    setSpinerEnable(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (userMessage.trim() !== '') {
        handleMessage('User', userMessage);
        socket.send(userMessage);
        setUserMessage('');
      }
      setSpinerEnable(true);
    }
  };

  return (
    <>
      <div className='library_card2'>
        <h1 className='Library_heading2'>QUERY ME ?</h1>
      </div>
      <div className='chatclass'>
        {/* <MenuContent /> */}
        <div className='chatbot-container'>
          <div className='chatbot-header'>
            <img src={welcome} style={{ height: '30PX' }}></img>

            {connected ? (
              <span style={{ color: '#52c41a', float: 'right' }}>online</span>
            ) : (
              <span style={{ color: '#ff1a1a', float: 'right' }}>offline</span>
            )}
            {connected ? (
              <span style={{ float: 'right' }}>
                <CheckCircleTwoTone twoToneColor='#52c41a' />
              </span>
            ) : (
              <span style={{ float: 'right' }}>
                <CloseCircleTwoTone twoToneColor='#ff1a1a' />
              </span>
            )}
          </div>
          <div className='chatbot-messages'>
            {messages.map((msg, index) => (
              <div
                style={{
                  backgroundColor: msg[0] === 'Bot' ? '#f2e6ff' : '#e6f7ff',
                }}
                key={index}
                className='message'
              >
                {msg[0] === 'Bot' ? (
                  <>
                    <img src={img2} alt="Image 1" style={{ height: '20px' }} /> {''}
                    {msg[1] === latestBotMessage && isTyping ? (
                      <>{currentBotMessage}</>
                    ) : (
                      <>{msg[1]}</>
                    )}
                  </>
                ) : (
                  <>
                    <img src={img1} alt="Image 2" style={{ height: '20px' }} /> {' '}
                    {msg[1]}
                  </>
                )}
              </div>
            ))}
          </div>
          <div>
            {spinerEnable ? (
              <>
                <Spin size='small' /> {'bot responding ...'}
              </>
            ) : (
              ''
            )}
          </div>
          <div className='chatbot-input'>
            <input
              type='text'
              value={userMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder='Type your message...'
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
