import { useState } from "react";
import { Link } from "react-router-dom";

const GameOver = ({
  score,
  playerNumber,
  movesCounted,
  timeCounted,
  gridSize,
}) => {
  const restartFunction = () => {
    window.location.reload();
  };

  console.log(score);

  const sortedPlayers = playerNumber.sort((a, b) => score[b] - score[a]);

  return (
    <>
      <div className="gameOverDivMain">
        <div className="gameOverDiv">
          {playerNumber.length === 1 && (
            <>
              <h1 className="commend">You did it!</h1>
              <p className="resultIntro">Game over! Here's how you got on...</p>
              <div className="timeElapsed">
                <h1 className="results">Time Elapsed</h1>
                <h1 className="resultDetail">{timeCounted}</h1>
              </div>
              <div className="movesTaken">
                <h1 className="results">Moves Taken</h1>
                <h1 className="resultDetail">{movesCounted} Moves</h1>
              </div>
            </>
          )}

          {playerNumber.length > 1 && (
            <>
              <h1 className="commend">Player {sortedPlayers[0]} Wins!</h1>
              <p className="resultIntro">Game over! Here are the results…</p>

              {playerNumber.map((player, index) => (
                <div key={index} className="movesTaken">
                  <h1 className="results">Player {player}</h1>
                  <h1 className="resultDetail">{score[player]} Pairs</h1>
                </div>
              ))}
            </>
          )}

          <div className="gameOverFooter">
            <Link
              className="restartButtonLink"
              state={{ gridSize }}
              to={"/game"}
              onClick={() => restartFunction()}
            >
              <button className="restartButton">Restart</button>
            </Link>
            <Link className="setupButtonLink" to={"/"}>
              <button className="setupButton">Setup New Game</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;
