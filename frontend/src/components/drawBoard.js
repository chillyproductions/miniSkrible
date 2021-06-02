import {useEffect, useRef, useState} from 'react';

import './css/drawBoard.css'
import blackImg from './assets/blackbrush.png';
import blueImg from './assets/bluebrush.png';
import brownImg from './assets/brownbrush.png';
import greenImg from './assets/greenbrush.png';
import purpleImg from './assets/purplebrush.png';
import redImg from './assets/redbrush.png';
import yellowImg from './assets/yellowbrush.png';
import eraserImg from './assets/eraser.png';
import whiteBucketImg from './assets/whitebucket.png';

var pxPerBlock;
var socket;
var ctx;

export default function DrawBoard(props){
    var canvasRef = useRef();
    const [color, setColor] = useState("black");

    useEffect(()=>{
        socket = props.socket;

        socket.on('draw', data=>{
            ctx.fillStyle = data.color;
            ctx.fillRect(data.coordinates[0], data.coordinates[1], pxPerBlock,pxPerBlock);
        })

        socket.on('clearDraw', ()=>{
            ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        })

        ctx = canvasRef.current.getContext('2d');;
    },[])

    useEffect(()=>{
        pxPerBlock = canvasRef.current.width / props.size;
    },[props.size])

    function canvasDraw(e){
        if(sessionStorage.getItem("painter") == "true"){
            let coordinates = getCoordinates(canvasRef,e);
            
            let baseX = Math.floor(coordinates[0] / pxPerBlock) * pxPerBlock;
            let baseY = Math.floor(coordinates[1] / pxPerBlock) * pxPerBlock;
            
            ctx.fillRect(baseX, baseY, pxPerBlock,pxPerBlock);
            socket.emit('draw', {code: sessionStorage.getItem("painterCode"),paint:{coordinates: [baseX,baseY], color:color}});
        }
    }

    function changeColor(color){
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = color;
        setColor(color);
    }

    return(
        <div>
            <canvas ref={canvasRef} onClick={(e)=>canvasDraw(e)} width="500" height="500" style={{border:"1px dashed black"}}></canvas>
            <div>
                <button className="brushCover" onClick={()=>changeColor('#000000')}><img className="brush" src={blackImg} alt="black"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#0033cc')}><img className="brush" src={blueImg} alt="blue"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#663300')}><img className="brush" src={brownImg} alt="brown"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#00cc00')}><img className="brush" src={greenImg} alt="green"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#9900cc')}><img className="brush" src={purpleImg} alt="purple"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#ff0000')}><img className="brush" src={redImg} alt="red"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#cccc00')}><img className="brush" src={yellowImg} alt="yellow"></img></button>
                <button className="brushCover" onClick={()=>changeColor('#ffffff')}><img className="brush" src={eraserImg} alt="erase"></img></button>
                <button className="brushCover" onClick={()=>eraseAll(canvasRef)}><img className="brush" src={whiteBucketImg} alt="erase all"></img></button>
            </div>
        </div>
    )
}

function getCoordinates(ref, e){
    let y = e.clientY - ref.current.getBoundingClientRect().y;
    let x = e.clientX - ref.current.getBoundingClientRect().x;
    return[x,y];
}

function eraseAll(ref){
    if(sessionStorage.getItem("painter")){
        ctx.clearRect(0,0,ref.current.width,ref.current.height);
        socket.emit('clearDraw', sessionStorage.getItem("painterCode"));
    }
}
