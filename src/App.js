import React from "react";
import GameBoard from "./components/GameBoard";
import Rules from "./components/Rules";
import "./App.css";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  "game-title": {
    margin: "0 auto",
    textAlign: "center",
  },
});

export default function App() {
  const board = { height: 9, width: 9, bombs: 10 };
  const styles = useStyles();
  return (
    <div className="main-container">
      <div className={styles["game-title"]}>
        <h1>SpekitSweeper</h1>
      </div>
      <div className="game-board">
        <GameBoard gameSettings={board} />
      </div>
      <Rules />
    </div>
  );
}
