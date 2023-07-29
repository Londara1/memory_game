import React, { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.svg";
import { useLocation, Link } from "react-router-dom";
import GameOver from "./GameOver";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faHeart,
  faStar,
  faThumbsUp,
  faCheckCircle,
  faEnvelope,
  faMusic,
  faSun,
  faMoon,
  faCamera,
  faTree,
  faGamepad,
  faPlane,
  faRocket,
  faSmile,
  faCrown,
  faCar,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";

const GameInterface = () => {
  const location = useLocation();
  const { theme, playerNumber, gridSize } = location.state;
  const fixedGridSize = gridSize?.split("x").map((num) => parseInt(num));
  const totalNumbers = fixedGridSize[0] * fixedGridSize[1];
  const [numbersForCircles, setNumbersForCircles] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const [moves, setMoves] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({});

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setTime((prevTime) => prevTime + 1000);
      }
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const numberGenerator = () => {
      const numbers = [];
      for (let i = 1; i <= totalNumbers / 2; i++) {
        numbers.push(i, i);
      }
      shuffleArray(numbers);
      setNumbersForCircles(numbers);
    };

    numberGenerator();
  }, [totalNumbers]);

  useEffect(() => {
    const initialScores = {};
    playerNumber.forEach((player) => {
      initialScores[player] = 0;
    });
    setScores(initialScores);
  }, [playerNumber]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const timer = setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }, [selectedCards]);

  const checkMatch = () => {
    if (
      selectedCards[0].value === selectedCards[1].value &&
      !matchedCards.includes(selectedCards[0].value)
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        selectedCards[0].value,
      ]);

      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));

      setSelectedCards([]);
      setMoves((prevMoves) => prevMoves + 1);
    } else {
      setSelectedCards([]);
      setMoves((prevMoves) => prevMoves + 1);
      setCurrentPlayer((prevPlayer) => getNextPlayer(prevPlayer));
    }
  };

  const getNextPlayer = (currentPlayer) => {
    const currentIndex = playerNumber.indexOf(currentPlayer);
    const nextIndex = (currentIndex + 1) % playerNumber.length;
    return playerNumber[nextIndex];
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleCardClick = (index) => {
    const isAlreadySelected = selectedCards.some(
      (card) => card.index === index
    );
    const isAlreadyMatched = isCardMatched(index);

    if (isAlreadySelected || isAlreadyMatched) {
      return;
    }

    if (selectedCards.length === 1) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { index, value: numbersForCircles[index] },
      ]);
    } else {
      setSelectedCards([{ index, value: numbersForCircles[index] }]);
    }
  };

  const isCardSelected = (index) => {
    return selectedCards.some((card) => card.index === index);
  };

  const isCardMatched = (index) => {
    return matchedCards.includes(numbersForCircles[index]);
  };

  const allValuesMatched = matchedCards.length === totalNumbers / 2;

  if (allValuesMatched) {
    clearInterval(timerRef.current);
  }

  const restartFunction = () => {
    window.location.reload();
  };

  library.add(
    faCoffee,
    faHeart,
    faStar,
    faThumbsUp,
    faCheckCircle,
    faEnvelope,
    faMusic,
    faSun,
    faMoon,
    faCamera,
    faTree,
    faGamepad,
    faPlane,
    faRocket,
    faSmile,
    faCrown,
    faCar,
    faBicycle
  );

  const iconMapping = {
    1: faCoffee,
    2: faHeart,
    3: faStar,
    4: faThumbsUp,
    5: faCheckCircle,
    6: faEnvelope,
    7: faMusic,
    8: faSun,
    9: faMoon,
    10: faCamera,
    11: faTree,
    12: faGamepad,
    13: faPlane,
    14: faRocket,
    15: faSmile,
    16: faCrown,
    17: faCar,
    18: faBicycle,
  };

  return (
    <>
      <div className="gameInterfaceMainDiv">
        <div className="header">
          <img src={Logo} className="logoSize" alt="Logo" />
          <button
            onClick={() => {
              setShowMenu(!showMenu);
              setIsPaused(true);
            }}
            className="menuButton"
          >
            Menu
          </button>

          <div className="headerButtons">
            <button onClick={() => restartFunction()} className="restartButton">
              Restart
            </button>
            <Link to={"/"}>
              <button className="newGameButton">New Game</button>
            </Link>
          </div>
        </div>

        {showMenu && (
          <Menu
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            setIsPaused={setIsPaused}
          />
        )}

        <div
          className={
            numbersForCircles.length === 16
              ? "circlesDisplay16"
              : "circlesDisplay36"
          }
        >
          {numbersForCircles.map((circle, index) => {
            const cardClass = `${
              numbersForCircles.length === 16 ? "circle16" : "circle36"
            } ${isCardSelected(index) ? "selected" : ""} ${
              isCardMatched(index) ? "matched" : ""
            }`;

            let content =
              theme === 2 ? (
                <FontAwesomeIcon icon={iconMapping[circle]} />
              ) : (
                circle
              );

            return (
              <div
                key={index}
                className={cardClass}
                onClick={() => handleCardClick(index)}
              >
                {isCardMatched(index) || isCardSelected(index) ? content : ""}
              </div>
            );
          })}
        </div>

        {playerNumber == 1 && (
          <div className="footer">
            <div className="timeDiv">
              <h1 className="timeText">Time</h1>
              <h1 className="timer">{formatTime(time)}</h1>
            </div>

            <div className="movesDiv">
              <h1 className="MovesText">Moves</h1>
              <h1 className="moves">{moves}</h1>
            </div>
          </div>
        )}

        <div className="playerTurnsMainDiv">
          {playerNumber.length > 1 &&
            playerNumber.map((number, index) => (
              <div key={index} className="scoreShower">
                <div
                  className={
                    currentPlayer === number
                      ? "activePlayerDiv triangleDiv"
                      : "playerDivs triangleDiv"
                  }
                  key={index}
                >
                  {currentPlayer === number && <div className="triangle"></div>}
                  <h1
                    className={
                      currentPlayer === number
                        ? "activePlayerNumber"
                        : "playerNumber"
                    }
                  >
                    P{number}
                  </h1>

                  <h1
                    className={
                      currentPlayer === number
                        ? "activePlayerNumb"
                        : "playerNumb"
                    }
                  >
                    Player {number}
                  </h1>
                  <h1
                    className={
                      currentPlayer === number ? "activePlayerScore" : "score"
                    }
                  >
                    {scores[number]}
                  </h1>
                </div>
                {currentPlayer === number && (
                  <h1 className="turnStyles">CURRENT TURN</h1>
                )}
              </div>
            ))}
        </div>
      </div>

      {allValuesMatched && (
        <GameOver
          score={scores}
          playerNumber={playerNumber}
          gridSize={gridSize}
          matchedCards={matchedCards}
          numbersForCircles={numbersForCircles}
          selectedCards={selectedCards}
          movesCounted={moves}
          timeCounted={formatTime(time)}
        />
      )}
    </>
  );
};

export default GameInterface;
