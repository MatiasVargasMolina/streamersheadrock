const express = require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
const app=express();
const axios=require("axios");
const WebsocketServer= require("socket.io");
const http = require("http");
const streamers = ["oscarped","maachete"]
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(cookieParser())
const server= http.createServer(app);
const io= WebsocketServer(server)
io.on('connection', socket => {
  socket.emit("server:loadstreamers",streamers);
  socket.on("client:changestreamer1",((streamer1)=>{streamers[0]=streamer1;socket.emit("server:loadstreamers",streamers);}));
  socket.on("client:changestreamer2",((streamer2)=>{streamers[1]=streamer2;socket.emit("server:loadstreamers",streamers);}));
});
server.listen(3001,function(){
    console.log("hola")
})

