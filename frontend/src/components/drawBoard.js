import {useEffect, useRef, useState} from 'react';

import './css/drawBoard.css'
import blackImg from './assets/blackBrush.png';
import blueImg from './assets/blueBrush.png';
import brownImg from './assets/brownBrush.png';
import greenImg from './assets/greenBrush.png';
import purpleImg from './assets/purpleBrush.png';
import redImg from './assets/redBrush.png';
import yellowImg from './assets/yellowBrush.png';
import eraserImg from './assets/eraser.png';
import whiteBucketImg from './assets/whiteBucket.png';

var pxPerBlock;
var socket;
var ctx;
var color = "black"
var painting = false;
var lastPaintLocation;
var drawPixel;

export default function DrawBoard(props){
    var canvasRef = useRef();

    useEffect(()=>{
        socket = props.socket;

        socket.on('draw', data=>{
            ctx.fillStyle = data.color;
            ctx.fillRect(data.coordinates[0], data.coordinates[1], pxPerBlock,pxPerBlock);
        })

        socket.on('clearDraw', ()=>{
            ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        })

        props.socket.on('new-drawing',(name)=>{
            ctx.fillStyle = '#000000';
            color = "black";
        })

        ctx = canvasRef.current.getContext('2d');;
    },[])

    useEffect(()=>{
        pxPerBlock = canvasRef.current.width / props.size;
    },[props.size])

    drawPixel = (x,y)=>{
        let baseX = Math.floor(x / pxPerBlock) * pxPerBlock;
        let baseY = Math.floor(y / pxPerBlock) * pxPerBlock;

        ctx.fillRect(baseX,baseY,pxPerBlock,pxPerBlock);
        socket.emit('draw', {code: sessionStorage.getItem("painterCode"),paint:{coordinates: [baseX,baseY], color:color}});
    }

    function canvasDraw(e){
        if(!painting){
            return
        }

        if(sessionStorage.getItem("painter") != "true")
            return

        let coordinates = getCoordinates(canvasRef,e);

        drawPixel(coordinates[0],coordinates[1]);

        if(!lastPaintLocation){
            lastPaintLocation = [coordinates[0],coordinates[1]];
            return
        }

        feelTheGap(coordinates);

        lastPaintLocation = coordinates;
    }

    function changeColor(newColor){
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = newColor;
        color = newColor;
    }

    return(
        <div>
            <canvas 
            ref={canvasRef} 
            onMouseDown={(e)=>{painting = true; canvasDraw(e)}}
            onMouseUp={()=>{painting = false; lastPaintLocation = null}}
            onContextMenu={()=>{painting = false; lastPaintLocation = null}}
            onMouseOut={()=>{painting = false; lastPaintLocation = null}}
            onMouseMove={(e)=>canvasDraw(e)} 
            width="800" height="800" 
            style={{border:"1px dashed black"}}
            ></canvas>
            <div className="toolsCover">
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
    if(sessionStorage.getItem("painter") == "true"){
        ctx.clearRect(0,0,ref.current.width,ref.current.height);
        socket.emit('clearDraw', sessionStorage.getItem("painterCode"));
    }
}

function feelTheGap(coordinates){
    var ix = lastPaintLocation[0];
    var iy = lastPaintLocation[1];
    
    var changeX = ((coordinates[0]-ix)/(Math.abs(coordinates[0]-ix) + Math.abs(coordinates[1]-iy))) * pxPerBlock;
    var changeY = ((coordinates[1]-iy)/(Math.abs(coordinates[0]-ix) + Math.abs(coordinates[1]-iy))) * pxPerBlock;

    changeX = changeX * 2/3;
    changeY = changeY * 2/3;


    var stateX;
    var stateY;
    if(ix < coordinates[0] && iy < coordinates[1]){
        stateX = "<";
        stateY = "<";
    }
    else if(ix < coordinates[0] && iy > coordinates[1]){
        stateX = "<";
        stateY = ">";
    }
    else if(ix > coordinates[0] && iy < coordinates[1]){
        stateX = ">";
        stateY = "<";
    }
    else if(ix > coordinates[0] && iy > coordinates[1]){
        stateX = ">";
        stateY = ">";
    }
        
    while(stateCheck(stateX,stateY)){
        ix += changeX;
        iy += changeY;
        drawPixel(Math.floor(ix),Math.floor(iy));
    }

    function stateCheck(x,y){
        if(x == ">" && y == ">")
            return ix > coordinates[0] || iy > coordinates[1]
        if(x == ">" && y == "<")
            return ix > coordinates[0] || iy < coordinates[1]
        if(x == "<" && y == ">")
            return ix < coordinates[0] || iy > coordinates[1]
        if(x == "<" && y == "<")
            return ix < coordinates[0] || iy < coordinates[1]
    }
}
