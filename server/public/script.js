    // Namespace - endpoint(path)의 이름으로 식별되는 지정된 범위에서의 연결된 소켓 풀을 나타냅니다.
    // client는 항상 /(endpoint:main namespace)에 연결한 뒤 잠재적으로 다른 namespaces에 연결할 수 있습니다.
    // (동일한 기본 연결을 사용하는 동안)
    // Rooms  - 각 네임스페이스 내에서 소켓이 입장 및 퇴장할 수 있는 임의의 채널을 정의할 수도 있습니다.

    const socket = io('http://localhost:8000') // the slash / endpoint

    const adminSocket = io('http://localhost:8000/admin');
  
    socket.on('messageFromServer',(message)=>{
      console.log(message)
      socket.emit('dataToServer',{data: 'Data From the client'});

      socket.on('joined', (msg) => {
        console.log(msg);
      })
  });


    adminSocket.on('welcome',(dataFormServer) => {
      console.log(dataFormServer);
    })

    document.querySelector('#message-form').addEventListener('submit',(event) => {
      event.preventDefault();
      const newMessage = document.querySelector('#user-message').value;
      socket.emit('newMessageToServer', { text: newMessage });
    })
