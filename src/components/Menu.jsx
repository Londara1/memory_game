import { Link } from "react-router-dom";

const Menu = () => {
  const restartFunction = () => {
    window.location.reload();
    console.log(121);
  };
  return (
    <>
      <div className="GameMenuDivMain">
        <div className="GameMenuDiv">
          <button onClick={() => restartFunction()} className="restartButton">
            Restart
          </button>
          <button className="newGameButton">New Game</button>
          <button className="resumeButton">Resume Game</button>
        </div>
      </div>
    </>
  );
};

export default Menu;
