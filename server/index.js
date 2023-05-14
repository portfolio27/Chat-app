const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const http = require('http')
const cors = require('cors')
const { Server } = require("socket.io");
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

// Configure
dotenv.config();
app.use(express.json())
app.use(cors());


app.use(require('./routes/auth.js'))
app.use(require('./routes/contact.js'))
app.use(require('./routes/addContact.js'))
app.use(require('./routes/chat.js'))
  
const users = {};
  
io.on("connection", (socket) => {
    console.log("User connected");
  
    socket.on("connectToUser", ({ userId, destinationUserId }) => {
      console.log(`User ${userId} is connecting to user ${destinationUserId}`);
    
      users[userId] = socket;
    
      const destinationSocket = users[destinationUserId];
      if (!destinationSocket) {
        console.log(`User ${destinationUserId} is not connected`);
        return;
      }
    
      destinationSocket.emit("userConnected", { userId });
    });
  
    socket.on("message", ({ message, destinationUserId }) => {
      console.log(`User ${socket.id} sent message to user ${destinationUserId}`);
      const destinationUser = users[destinationUserId]
      if (!destinationUser) {
          socket.emit("userUnavailable", { destinationUserId });
          return;
      }
      destinationUser.emit("message", { sender: socket.id, message });
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
  

mongoose.connect(process.env.MONGODB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( ()=> {server.listen(5000, ()=> {console.log('Server hosted')})})
    .catch( (err) => {console.log(err)})