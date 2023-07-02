import React from "react";
import Logo from "../assets/logo.svg";
import { useLocation } from "react-router-dom";

const GameInterface = () => {
  const location = useLocation();
  const { gridSize } = location.state;

  const fixedGridSize = gridSize.split("x").map((num) => parseInt(num));
  // console.log(fixedGridSize);

  let totalNumbers;
  const numberCreator = () => {
    totalNumbers = fixedGridSize[0] * fixedGridSize[1];
    console.log(totalNumbers);
  };

  numberCreator();

  let numbersForCircles = [];

  const numberGenerator = () => {
    for (let i = 1; i <= totalNumbers / 2; i++) {
      numbersForCircles.push(i, i);
    }
  };

  console.log(numbersForCircles);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  numberGenerator();
  shuffleArray(numbersForCircles);

  return (
    <>
      <div className="gameInterfaceMainDiv">
        <div className="header">
          <img src={Logo} className="logoSize" />
          <button className="menuButton">Menu</button>
        </div>

        <div
          className={
            numbersForCircles.length === 16
              ? "circlesDisplay16"
              : "circlesDisplay36"
          }
        >
          {numbersForCircles.map((circle, index) => {
            return (
              <div
                key={index}
                className={
                  numbersForCircles.length === 16 ? "circle16" : "circle36"
                }
              >
                {circle}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GameInterface;
