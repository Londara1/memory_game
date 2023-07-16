import React, { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.svg";
import { useLocation } from "react-router-dom";
import GameOver from "./GameOver";
import Menu from "./Menu";

const GameInterface = () => {
  const location = useLocation();
  const { playerNumber, gridSize } = location.state;
  const fixedGridSize = gridSize?.split("x").map((num) => parseInt(num));
  const totalNumbers = fixedGridSize[0] * fixedGridSize[1];
  const [numbersForCircles, setNumbersForCircles] = useState([]);

  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [time, setTime] = useState(0);

  const timerRef = useRef(null);

  const [moves, setMoves] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

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
    }

    setSelectedCards([]);
    setMoves((prevMoves) => prevMoves + 1);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleCardClick = (index) => {
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

  const [showMenu, setShowMenu] = useState(false);

  // console.log(playerNumber);

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

            return (
              <div
                key={index}
                className={cardClass}
                onClick={() => handleCardClick(index)}
              >
                {isCardMatched(index) || isCardSelected(index) ? circle : ""}
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
              <div className="playerDivs" key={index}>
                <h1 className="playerNumber">P{index + 1}</h1>
                <h1 className="score">0</h1>
              </div>
            ))}
        </div>
      </div>

      {allValuesMatched && (
        <GameOver
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
