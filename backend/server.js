const cors = require('cors');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {cors:{origin:'http://localhost:3000'}});

app.use(cors({origin:'http://localhost:3000'}))


const firstSizeFaze = 5 * 1000;
const secondSizeFaze = 5 * 1000 + firstSizeFaze;
const thirdSizeFaze = 5 * 1000 + secondSizeFaze;
const finalSizeFazeLength = 5 * 1000 + thirdSizeFaze 

var players = {};
var lobbys = {};

io.on('connection', socket =>{
    socket.on('join-room', data=>{
        socket.join(data.id);

        players[socket.id] = {room:data.id, name:data.name};
        
        let newPlayer = {name: data.name, id: socket.id, score: 0 , guessedCorrectly: false}

        lobbys[data.id].players.push(newPlayer);

        io.to(data.id).emit("msg-recived", {name: data.name, msg:"connected"});
        updateLobby(data.id);
    })

    socket.on('send-msg', data=>{
        const roomId = players[socket.id].room;

        if(data.msg == lobbys[roomId].word){
            if(socket.id != lobbys[roomId].painter){
                socket.to(roomId).emit("msg-recived", {msg: data.name + "guessed the word!", gameTalking:true});
                
                for(player of lobbys[roomId].players){
                    if(player.id == socket.id){
                        player.guessedCorrectly = true;
                        let timePassed = (new Date().getTime() - lobbys[roomId].startingTime) / (finalSizeFazeLength);
                        player.score += Math.floor(200 * timePassed  + 50);
                        break;
                    }
                }

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
        const lobbyPlayers = lobbys[roomId].players;
        for(var i = 0; lobbyPlayers[i].id != lobbys[roomId].painter && i < lobbyPlayers.length; i++){}

        let newId = lobbyPlayers[(i+1)%(lobbyPlayers.length)].id;

        io.to(lobbys[roomId].painter).emit('stop-painter');

        let newCode = generateCode(5);
        lobbys[roomId].painterCode = newCode;
        lobbys[roomId].painter = newId;
        io.to(newId).emit('painter',newCode);

        newDrawing(newId);
    }
    

    function newDrawing(id){
        const roomId = players[id].room;
       
        function updateSize(size){
            io.to(roomId).emit('size-change',size);
            io.to(roomId).emit("clearDraw");
        }

        const word = getWord();
        const dashedWord = dashWord(word);
        lobbys[roomId].currentWord = word;
        io.to(roomId).emit('new-word',dashedWord);
        io.to(id).emit('new-word', word);
        updateSize(3);
        setTimeout(()=>{updateSize(4)},firstSizeFaze);
        setTimeout(()=>{updateSize(5)},secondSizeFaze);
        setTimeout(()=>{updateSize(6)},thirdSizeFaze);
        setTimeout(()=>{nextPainter(roomId)},finalSizeFazeLength)
        lobbys[roomId].startingTime = new Date().getTime();

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
        let lobbyPlayers = lobbys[players[socket.id].room].players;
        for(let i = 0; i < lobbyPlayers.length; i++)
            if(socket.id == lobbyPlayers[i].id)
                lobbyPlayers.splice(i,1);

        if(lobbys[players[socket.id].room].painter == socket.id)
            nextPainter();
        
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

http.listen(3001);

function generateCode(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
}

function getWord(){
    return "hello";
}

function dashWord(word){
    let s = "";
    for(let i = 0; i < word.length; i++)
        s+="_ ";

    return s;
}
