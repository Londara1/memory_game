import { useState } from "react";
import { Link } from "react-router-dom";

const GameMenu = () => {
  const [theme, setTheme] = useState(1);
  const [playerNumber, setPlayerNumber] = useState([1]);
  const [gridSize, setGridSize] = useState("4x4");

  const [themeClass, setThemeClass] = useState(1);

  return (
    <>
      <div className="menuMainDiv">
        <h1 className="gameLogo">memory</h1>

        <div className="menuDiv">
          <p className="options">Select Theme</p>
          <div className="buttonsSection">
            <button
              onClick={() => setTheme(1)}
              className={
                theme === 1
                  ? "numberButton colorForMenu"
                  : "numberButton colorForMenu2"
              }
            >
              Numbers
            </button>
            <button
              onClick={() => setTheme(2)}
              className={
                theme === 2
                  ? "iconButton colorForMenu"
                  : "iconButton colorForMenu2"
              }
            >
              Icons
            </button>
          </div>

          <p className="playerOption">Numbers of Players</p>
          <div className="playerNumberDiv">
            <button
              onClick={() => setPlayerNumber([1])}
              className={
                playerNumber.length === 1
                  ? "playerNumbersButton colorForMenu"
                  : "playerNumbersButton colorForMenu2"
              }
            >
              1
            </button>
            <button
              onClick={() => setPlayerNumber([1, 2])}
              className={
                playerNumber.length === 2
                  ? "playerNumbersButton colorForMenu"
                  : "playerNumbersButton colorForMenu2"
              }
            >
              2
            </button>
            <button
              onClick={() => setPlayerNumber([1, 2, 3])}
              className={
                playerNumber.length === 3
                  ? "playerNumbersButton colorForMenu"
                  : "playerNumbersButton colorForMenu2"
              }
            >
              3
            </button>
            <button
              onClick={() => setPlayerNumber([1, 2, 3, 4])}
              className={
                playerNumber.length === 4
                  ? "playerNumbersButton colorForMenu"
                  : "playerNumbersButton colorForMenu2"
              }
            >
              4
            </button>
          </div>

          <p className="gridOption">Grid Size</p>
          <div className="gridDiv">
            <button
              className={
                gridSize === "4x4"
                  ? "gridButton colorForMenu"
                  : "gridButton colorForMenu2"
              }
              onClick={() => setGridSize("4x4")}
            >
              4x4
            </button>
            <button
              className={
                gridSize === "6x6"
                  ? "gridButton colorForMenu"
                  : "gridButton colorForMenu2"
              }
              onClick={() => setGridSize("6x6")}
            >
              6x6
            </button>
          </div>

          <Link state={{ theme, gridSize, playerNumber }} to={"/game"}>
            <button className="startButton">Start Game</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GameMenu;
