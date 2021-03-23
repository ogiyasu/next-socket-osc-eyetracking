const express = require('express')
const app = express();
const http = require('http').Server(app);
const port = 3333

app.get('/', (req, res) => {
  res.send('Hello World!')
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection',function(socket){    
    socket.on('message',function(msg){
        //console.log('message: ' + msg);        
    });
});

const { Client, Server } = require('node-osc');
const oscport = 5000

var oscServer = new Server(oscport, '0.0.0.0', () => {
  console.log(`OSC Server is listening on ${oscport}`);
});

oscServer.on('message', function (msg) {
  console.log(msg)
  io.emit(msg[0], msg[1]);
});