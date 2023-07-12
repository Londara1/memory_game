import { useState } from "react";

const GameOver = ({ movesCounted, timeCounted }) => {
  return (
    <>
      <div className="gameOverDivMain">
        <div className="gameOverDiv">
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

          <div className="gameOverFooter">
            <button className="restartButton">Restart</button>
            <button className="setupButton">Setup New Game</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;
