const express = require('express'); 
const app = express();
const socketio = require('socket.io');



app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);

const io = socketio(expressServer,{
  path: '/socket.io',  
});

const adminIo = io.of('/admin');

io.on('connection',(socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient);
  })
  socket.on('newMessageToServer', (msg) => {
    // console.log(msg);
    io.emit('messageToClients',{ text: msg.text })
  })

  // The server can stil communicate across namespace
  // but on the clientInformation, the socket needs be in THAT namespace 
  // in order to get the events
  
  //서버는 여전히 네임스페이스를 통해 통신할 수 있습니다.
  //이벤트를 받기 위해서는 clientSide에서 동일한 네임스페이스에 있어야 합니다.
  //
  setTimeout(() => {
    io.of('/admin').emit('welcome',"welcome to the admin channel, from the main channel");
  },2000)
  
})

adminIo.on('connection', (socket) => {
  adminIo.emit('messageToAdmin',{data: 'Hello Admin!'})
  console.log('어드민 페이지에 접속하셨습니다.')
})
