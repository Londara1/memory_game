import React from "react";
import { useState } from "react";
import "./styles.scss";
import GameMenu from "./components/GameMenu";
import GameInterface from "./components/GameInterface";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="game" element={<GameInterface />} />
      </Routes>
    </>
  );
}

export default App;
