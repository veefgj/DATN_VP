import React, { useEffect } from "react";
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import './chat.css';

const projectID = 'b4f510a5-aa2d-41c4-bede-f05f433e0097';

const Chat = (props) => {
  useEffect(() =>{
    props.changeHeaderHandler(6);
  }, []);

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      renderNewChatForm={(creds) => {}}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default Chat;
