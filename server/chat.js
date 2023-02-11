const express = require('express'); 
const app = express();
// const socketio = require('socket.io');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const http = require('http').createServer(app);

const cors = require("cors");

app.use(cors());

http.listen(8000, () => {
  console.log('Server is running');
});

const io = require('socket.io')(http,{
  cors: {
    origin: '*'
  }
})



const adminIo = io.of('/admin');

io.on('connect',(socket) => {
  
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });
  socket.on('dataToServer', (dataFromClient) => {
    console.log(dataFromClient);
  })
  socket.join('level1');
  socket.on('dataFromRN',(msg) => {
    console.log(msg)
  })
  //콜백의 socket.to()는 해당하는 Rooms로 emit을 보내기 때문에,
  // 아직 입장전인 자신을 제외한 모두에게 emit을 보낸다.
  socket.to('level1').emit('joined', `${socket.id} have joined the level 1 room!`);
  
  //namespace.to()는 서버에서 emit을 보내기에 자신을 포함한 모두가 emit을 받는다.
  // io.of('/').to('level1').emit('joined', `${socket.id} have joined the level 1 room!`);
})

adminIo.on('connection', (socket) => {
  adminIo.emit('messageToAdmin',{data: 'Hello Admin!'})
  console.log('어드민 페이지에 접속하셨습니다.')
})
