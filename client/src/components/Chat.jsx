import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = ({userId, destinationUserId, chatId}) => {
  // const [userId, setUserId] = useState("");
  // const [destinationUserId, setDestinationUserId] = useState("");

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("https://chat-app-backend-zeta.vercel.app/"));
    getChats();
  }, []);

  useEffect(()=> {
      console.log('friend change')
      setChatMessages([]);
      getChats();
  }, [chatId])

  const getChats = async () => {
    const response = await fetch('/get-chat', {
      method: "POST",
      headers: {
          'Content-Type': "application/json",
          'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({
          chatId: chatId
      })
    })

    const data = await response.json();
    setChatMessages([...data.message.chats])
  }

  const sendMessageUser = async () => {
    const response = await fetch('/chat', {
      method: "POST",
      headers: {
          'Content-Type': "application/json",
          'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({
          chatId: chatId,
          message: {
            sender: userId,
            message: message
          }
      })
  })
    const data = await response.json()
    console.log(data.message)
    setChatMessages([...data.message.chats, ...chatMessages])
  }

  const sendMessage = () => {
    console.log(destinationUserId);
    if (socket) {
      socket.emit("message", { message, destinationUserId });
      setChatMessages([...chatMessages, { sender: userId, message }]);
      setMessage("");
    }
    sendMessageUser();
    
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connectToUser", { userId, destinationUserId });
    }
    if (socket) {
      socket.on("message", (data) => {
        setChatMessages([...chatMessages, { sender: data.sender, message: data.message }]);
      });
    }
  }, [chatMessages, socket]);

  return (
    <div>
      {/* <button onClick={connectToUser}>Connect to User</button> */}
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>
            {msg.sender === userId ? msg.sender: destinationUserId}: {msg.message}
          </div>
        ))}

      </div>
      <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Chat;
