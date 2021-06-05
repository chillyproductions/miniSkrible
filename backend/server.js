const fs = require('fs');
const cors = require('cors');
const path = require('path');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {cors:{origin:'http://localhost:3000'}});

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.static("build"));

const startingDrawSize = 20;
const firstSizeFaze = 20 * 1000;
const secondSizeFaze = 45 * 1000 + firstSizeFaze;
const finalSizeFazeLength = 45 * 1000 + secondSizeFaze;
const words = JSON.parse(fs.readFileSync('./words.json', 'utf8'));

var players = {};
var lobbys = {};

var firstFazeTimeOut;
var secondFazeTimeOut;
var finalFazeTimeOut;



io.on('connection', socket =>{
    socket.on('join-room', data=>{
        socket.join(data.id);

        players[socket.id] = {room:data.id, name:data.name};
        
        let newPlayer = {name: data.name, id: socket.id, score: 0 , guessedCorrectly: false}
        lobbys[data.id].players.push(newPlayer);

        io.to(data.id).emit("msg-recived", {name: data.name, msg:"connected"});
        updateLobby(data.id);
        if(lobbys[data.id].started){
            io.to(socket.id).emit('new-drawing', {word:dashWord(lobbys[data.id].currentWord), time:lobbys[data.id].startingTime, roundTime:finalSizeFazeLength, name:"Some one"});
        }
    })

    socket.on('send-msg', data=>{   
        const roomId = players[socket.id].room;

        if(data.msg == lobbys[roomId].currentWord){
            if(socket.id != lobbys[roomId].painter){
                io.to(roomId).emit("msg-recived", {msg: data.name + "guessed the word!", gameTalking:true});
                
                for(player of lobbys[roomId].players){
                    if(player.id == socket.id){
                        player.guessedCorrectly = true;
                        let timePassed = (finalSizeFazeLength - (new Date().getTime() - lobbys[roomId].startingTime)) / (finalSizeFazeLength);
                        player.score += Math.floor(200 * timePassed  + 50);
                    }
                    if(player.id == lobbys[roomId].painter){
                        let timePassed = (finalSizeFazeLength - (new Date().getTime() - lobbys[roomId].startingTime)) / (finalSizeFazeLength * 2);
                        player.score += Math.floor(200 * timePassed  + 50);
                    }
                }

                for(var i = 0; i < lobbys[roomId].players.length; i++)
                    if(!lobbys[roomId].players[i].guessedCorrectly && lobbys[roomId].players[i].id != lobbys[roomId].painter)
                        break;

                if(i == lobbys[roomId].players.length)
                    nextPainter(roomId);
                

                updateLobby(roomId);
            }
        }
        else{
            socket.to(roomId).emit("msg-recived", data);
        }
    })

    socket.on('draw', data=>{
        if(data.code == lobbys[players[socket.id].room].painterCode)
            socket.to(players[socket.id].room).emit("draw", data.paint);
    })

    socket.on('clearDraw', (code)=>{
        if(code == lobbys[players[socket.id].room].painterCode)
            socket.to(players[socket.id].room).emit("clearDraw");
    })

    socket.on('start', (code)=>{
        const room = lobbys[players[socket.id].room];
        if(code == room.painterCode){
            room.started = true;
            room.painter = socket.id;
            updateLobby(players[socket.id].room);
            newDrawing(socket.id);
            io.to(players[socket.id].room).emit('msg-recived', {msg:"Guess the correct word to win", gameTalking:true});
        }
    })

    function nextPainter(roomId){
        if(!lobbys[roomId])
            return

        const lobbyPlayers = lobbys[roomId].players;

        for(var i = 0; i < lobbyPlayers.length && lobbyPlayers[i].id != lobbys[roomId].painter; i++){}

        if(!lobbyPlayers[(i+1)%(lobbyPlayers.length)])
            return

        let newId = lobbyPlayers[(i+1)%(lobbyPlayers.length)].id;
        let Name = lobbyPlayers[(i+1)%(lobbyPlayers.length)].name;

        io.to(lobbys[roomId].painter).emit('stop-painter');

        let newCode = generateCode(5);
        lobbys[roomId].painterCode = newCode;
        lobbys[roomId].painter = newId;
        io.to(newId).emit('painter',newCode);
        clearTimeout(firstFazeTimeOut);
        clearTimeout(secondFazeTimeOut);
        clearTimeout(finalFazeTimeOut);

        newDrawing(newId,Name);
    }

    function newDrawing(id,Name){
        const roomId = players[id].room;
       
        function updateSize(size){
            io.to(roomId).emit('size-change',size);
        }

        const word = getWord();
        const dashedWord = dashWord(word);
        lobbys[roomId].currentWord = word;
        lobbys[roomId].startingTime = new Date().getTime();
        io.to(roomId).emit('new-drawing', {word:dashedWord, time:new Date().getTime(), roundTime:finalSizeFazeLength, name:Name});
        io.to(id).emit('new-drawing', {word:word, time:new Date().getTime(), roundTime:finalSizeFazeLength, name:Name});

        updateSize(startingDrawSize);
        io.to(roomId).emit("clearDraw");
        firstFazeTimeOut = setTimeout(()=>{updateSize(startingDrawSize * 2)},firstSizeFaze);
        secondFazeTimeOut = setTimeout(()=>{updateSize(startingDrawSize * 4)},secondSizeFaze);
        finalFazeTimeOut = setTimeout(()=>{nextPainter(roomId)},finalSizeFazeLength)

        for(player of lobbys[roomId].players){
            player.guessedCorrectly = false;
        }
        updateLobby(roomId);
    }

    function updateLobby(id){
        let saveWord = lobbys[id].currentWord;
        lobbys[id].currentWord = null;
        io.to(id).emit("lobby-change", lobbys[id]);
        lobbys[id].currentWord = saveWord;
    }

    socket.on('disconnect', ()=>{
        if(!players[socket.id])
            return

        let lobbyPlayers = lobbys[players[socket.id].room].players;
        for(let i = 0; i < lobbyPlayers.length; i++)
            if(socket.id == lobbyPlayers[i].id)
                lobbyPlayers.splice(i,1);

        if(lobbys[players[socket.id].room].painter == socket.id)
            nextPainter(players[socket.id].room);
        
        socket.to(players[socket.id].room).emit("msg-recived", {name: players[socket.id].name , msg:"disconected"});
        updateLobby(players[socket.id].room);
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
    lobbys[req.query.id] = {players:[],started:false,painterCode:code}
    res.send(code);
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.listen(process.env.PORT || 3001);

function generateCode(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
}

function getWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function dashWord(word){
    let s = "";
    for(let i = 0; i < word.length; i++)
        s+="_ ";

    return s;
}
