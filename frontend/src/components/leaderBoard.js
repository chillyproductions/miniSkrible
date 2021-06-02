export function LeaderBoard(props){
    return(
        <div>
            {props.players.map((player,key) =>(
                <div key={key}>
                    <div>{player.name}</div>
                    <div>{player.score}</div>
                </div>
            ))}
        </div>
    )
}

export function PreLeaderBoard(props){
    return(
        <div>
            {props.players.map((player,key) =>(
                <div key={key}>{player.name}</div>
            ))}
        </div>
    )
}