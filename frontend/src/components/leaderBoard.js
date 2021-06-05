import './css/leaderBoard.css';

export function LeaderBoard(props){
    return(
        <div>
            {props.players.map((player,key) =>(
                <Person player={player} propsKey={key}></Person>
            ))}
        </div>
    )
}

function Person(props){
    var className = "";
    if(props.player.guessedCorrectly)
        className = "guessedCorrectly ";

    return(
        <div className={className + "Person"} key={props.propsKey}>
            <div>{props.player.name}</div>
            <div>Score: {props.player.score}</div>
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