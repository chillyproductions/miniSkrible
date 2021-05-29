import {useEffect, useRef, useState} from 'react';

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
        pxPerBlock = canvasRef.current.width / props.size;
    },[])

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
                <button onClick={()=>changeColor('#000000')}>black</button>
                <button onClick={()=>changeColor('#ff0000')}>red</button>
                <button onClick={()=>changeColor('#0033cc')}>blue</button>
                <button onClick={()=>changeColor('#00cc00')}>green</button>
                <button onClick={()=>changeColor('#cccc00')}>yellow</button>
                <button onClick={()=>changeColor('#9900cc')}>purple</button>
                <button onClick={()=>changeColor('#663300')}>brown</button>
                <button onClick={()=>changeColor('#ffffff')}>erase</button>
                <button onClick={()=>eraseAll(canvasRef)}>ease all</button>
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
