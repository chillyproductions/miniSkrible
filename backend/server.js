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
        
        let newPlayer = {name: data.name, id: socket.id ,points: 0}

        lobbys[data.id].players.push(newPlayer);

        socket.to(data.id).emit("msg-recived", {name: data.name, msg:"connected"})
    })

    socket.on('send-msg', data=>{
        socket.to(players[socket.id]).emit("msg-recived", data);
    })

    socket.on('draw', data=>{
        if(data.code == lobbys[players[socket.id]].painter)
            socket.to(players[socket.id]).emit("draw", data.paint);
    })

    socket.on('clearDraw', (code)=>{
        if(code == lobbys[players[socket.id]].painter)
            socket.to(players[socket.id]).emit("clearDraw",{bong:"bong"});
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
    let code = generateCode(5);
    lobbys[req.query.id] = {players:[],started:false,painter:code}
    res.send(code);
})

function generateCode(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
}

http.listen(3001);