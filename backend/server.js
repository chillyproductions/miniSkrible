// const fs = require('fs');
const cors = require('cors');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {cors:{origin:'http://localhost:3000'}});

app.use(cors({origin:'http://localhost:3000'}))

var players = [];
var lobbys = {};

io.on('connection', socket =>{
    socket.on('join-room', data=>{
        socket.join(data.id);

        players[socket.id] = data.id;
        
        let newPlayer = {name: data.name, points: 0}

        lobbys[data.id].players.push(newPlayer);

        socket.to(data.id).emit("msg-recived", {name: data.name, msg:"connected"})
        // socket.to(socket.id).emit("get-lobby", lobbys[data.id]);
    })

    socket.on('send-msg', data=>{
        socket.to(players[socket.id]).emit("msg-recived", {name:data.name , msg:data.msg});
    })

    io.on('disconnect', ()=>{
        socket.to(players[socket.id]).emit("msg-recived", {name:data.name , msg:"disconected"});
    })
})

app.get('/check-lobby', (req,res)=>{
    if(lobbys[req.query.id])
        res.send('ok');
    else
        res.send('not ok')
})

app.post('/create-Lobby', (req,res) =>{
    lobbys[req.query.id] = {players:[],started:false}
    res.send("ok");
})

http.listen(3001);