import { useState } from "react";
import { Link } from "react-router-dom";

const GameMenu = () => {
  const [gridSize, setGridSize] = useState("");
  return (
    <>
      <div className="menuMainDiv">
        <h1 className="gameLogo">memory</h1>

        <div className="menuDiv">
          <p className="options">Select Theme</p>
          <div className="buttonsSection">
            <button className="numberButton">Numbers</button>
            <button className="iconButton">Icons</button>
          </div>

          <p className="playerOption">Numbers of Players</p>
          <div className="playerNumberDiv">
            <button className="playerNumbersButton">1</button>
            <button className="playerNumbersButton">2</button>
            <button className="playerNumbersButton">3</button>
            <button className="playerNumbersButton">4</button>
          </div>

          <p className="gridOption">Grid Size</p>
          <div className="gridDiv">
            <button className="gridButton" onClick={() => setGridSize("4x4")}>
              4x4
            </button>
            <button className="gridButton" onClick={() => setGridSize("6x6")}>
              6x6
            </button>
          </div>

          <Link state={{ gridSize }} to={"/game"}>
            <button className="startButton">Start Game</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GameMenu;
