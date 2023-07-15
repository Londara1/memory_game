import { Link } from "react-router-dom";

const Menu = ({ setShowMenu, showMenu, setIsPaused }) => {
  const restartFunction = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="GameMenuDivMain">
        <div className="GameMenuDiv">
          <button onClick={() => restartFunction()} className="restartButton">
            Restart
          </button>
          <Link className="newGameButtonLink" to={"/"}>
            <button className="newGameButton">New Game</button>
          </Link>
          <button
            onClick={() => {
              setShowMenu(!showMenu);
              setIsPaused(false);
            }}
            className="resumeButton"
          >
            Resume Game
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
