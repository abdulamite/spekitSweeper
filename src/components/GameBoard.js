import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { makeStyles, Button } from "@material-ui/core";

import generateGameBoard from "../helpers/GenerateGameBoard";

const useStyles = makeStyles({
  game: {
    "background-color": "#055052",
    padding: "10px",
  },
  "game-board-container": {
    "max-width": "500px",
    margin: "auto",
  },
  "game-board-row": {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px auto",
  },
  "game-board-interface": {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    color: "#FAFAFA",
    "font-weight": "bold",
    flexDirection: "row",
    background: "#53B8BB",
    "align-items": "center",
  },
  "game-board-reset-button": {
    background: "#055052",
  },
});

export default function GameBoard(props) {
  const { bombs, height, width } = props.gameSettings;
  const board = new generateGameBoard(height, width, bombs);
  const validBoard = board.generateValidGameSession();

  const [timeLeft, setTimeLeft] = React.useState(99);
  const [gameBoard, setGameBoard] = useState(validBoard);
  const [gameStatus, setGameStatus] = useState("PENDING");

  function getStatusEmoji() {
    switch (gameStatus) {
      case "PENDING":
        return "🙂";
      case "LOST":
        return "😭";
      default:
        return "🙂";
    }
  }

  function resetBoard() {
    const board = new generateGameBoard(height, width, bombs);
    const newBoard = board.generateValidGameSession();
    setGameBoard(newBoard);
  }

  function reveal(x, y) {
    let updated = gameBoard;
    updated[x][y].isRevealed = true;
    console.log(updated[x][y]);
    setGameBoard(updated);
  }

  function handeCellClick(cellData) {
    if (!cellData.isRevealed) {
      reveal(cellData.x, cellData.y);
    }
    if (cellData.isBomb) {
      alert("Sorry you Lose");
      setGameStatus("LOST");
    }
  }

  const styles = useStyles();

  return (
    <div>
      <div className="game-board-options"></div>
      <div className={styles["game-board-container"]}>
        <div className={styles["game-board-interface"]}>
          <span className="game-board-mine-count">
            {props.gameSettings.bombs}
          </span>
          <Button
            className={styles["game-board-reset-button"]}
            onClick={() => {
              resetBoard();
            }}
          >
            <span className="game-board-status">{getStatusEmoji()}</span>
          </Button>
          <span className="game-board-timer">{timeLeft}</span>
        </div>
        <div className={styles.game}>
          <div>
            {validBoard.map((row, i) => (
              <div key={i} className={styles["game-board-row"]}>
                {row.map((cell, j) => (
                  <Cell key={j} cellData={cell} handleClick={handeCellClick} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
