import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { makeStyles, Button } from "@material-ui/core";

import { createGameTemplate, placeBombs } from "../helpers/GameHelpers";

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
  "game-status": {
    textAlign: "center",
  },
});

export default function GameBoard(props) {
  const { bombs, height, width } = props.gameSettings;

  const [timeLeft, setTimeLeft] = useState(99);
  const [gameBoard, setGameBoard] = useState(
    createGameBoard(height, width, bombs)
  );
  const [bombsLeft, setBombsLeft] = useState(bombs);
  const [gameStatus, setGameStatus] = useState("PENDING");
  const [flaggedCells, setFlaggedCells] = useState([]);

  useEffect(() => {
    if (gameStatus === "IN PROGRESS") {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 0) {
          setGameStatus("LOST");
          alert("Sorry you Lose");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStatus, timeLeft]);

  useEffect(() => {
    const bombFlaggedCells = flaggedCells.filter((cell) => {
      return cell.isBomb;
    });

    if (bombFlaggedCells.length === 10) {
      setGameStatus("WON");
      alert("You Win");
    }
  }, [flaggedCells, bombsLeft]);

  function getStatusEmoji() {
    switch (gameStatus) {
      case "PENDING":
        return "🙂";
      case "LOST":
        return "😭";
      case "WON":
        return "🥰";
      default:
        return "🙂";
    }
  }

  function createGameBoard(height, width, bombs) {
    let board = createGameTemplate(height, width);
    board = placeBombs(board, height, width, bombs);
    return board;
  }

  function allSurroundingCells(x, y, height, width) {
    const board = gameBoard;
    let surroundingCells = [];

    if (x > 0) {
      surroundingCells.push(board[x - 1][y]);
    }

    if (x < height - 1) {
      surroundingCells.push(board[x + 1][y]);
    }

    if (y > 0) {
      surroundingCells.push(board[x][y - 1]);
    }

    if (y < width - 1) {
      surroundingCells.push(board[x][y + 1]);
    }

    if (x > 0 && y > 0) {
      surroundingCells.push(board[x - 1][y - 1]);
    }

    if (x > 0 && y < width - 1) {
      surroundingCells.push(board[x - 1][y + 1]);
    }

    if (x < height - 1 && y < width - 1) {
      surroundingCells.push(board[x + 1][y + 1]);
    }

    if (x < height - 1 && y > 0) {
      surroundingCells.push(board[x + 1][y - 1]);
    }

    return surroundingCells;
  }

  function resetBoard() {
    setBombsLeft(10);
    setFlaggedCells([]);
    setTimeLeft(99);
    setGameStatus("PENDING");
    setGameBoard(createGameBoard(height, width, bombs));
  }

  function copyBoardState(currentState) {
    return JSON.parse(JSON.stringify(currentState));
  }

  function revealCell(x, y) {
    const copyBoard = copyBoardState(gameBoard);
    const surroundingCells = allSurroundingCells(x, y, height, width);
    const bombCells = allSurroundingCellsWithBombs(surroundingCells);
    if (!copyBoard[x][y].isRevealed) {
      copyBoard[x][y].isRevealed = true;
      copyBoard[x][y].bombsInProximity = bombCells.length;
      updateGameBoard(copyBoard);
    }
  }

  function revealBoard() {
    const copyBoard = copyBoardState(gameBoard);
    copyBoard.map((datarow) => {
      datarow.map((cell) => {
        cell.isRevealed = true;
      });
    });
    updateGameBoard(copyBoard);
  }

  function flagCell(event, cellData) {
    event.preventDefault();

    const copyBoard = copyBoardState(gameBoard);
    if (!copyBoard[cellData.x][cellData.y].isFlagged) {
      copyBoard[cellData.x][cellData.y].isFlagged = true;
      setFlaggedCells((flaggedCells) => [
        ...flaggedCells,
        copyBoard[cellData.x][cellData.y],
      ]);
      updateGameBoard(copyBoard);
    } else {
      unFlag(copyBoard[cellData.x][cellData.y]);
    }
  }

  function unFlag(cellData) {
    const copyBoard = copyBoardState(gameBoard);
    if (copyBoard[cellData.x][cellData.y].isFlagged) {
      copyBoard[cellData.x][cellData.y].isFlagged = false;
      updateGameBoard(copyBoard);
    }
  }

  function allSurroundingCellsWithBombs(cells) {
    return cells.filter((cell) => {
      return cell.isBomb;
    });
  }

  function handeCellClick(cellData) {
    if (gameStatus === "PENDING") {
      setGameStatus("IN PROGRESS");
    }
    if (!cellData.isRevealed) {
      revealCell(cellData.x, cellData.y);
    }
    if (cellData.isBomb) {
      revealBoard();
      alert("Sorry you Lose");
      setGameStatus("LOST");
    }
  }

  function updateGameBoard(newState) {
    setGameBoard(newState);
  }

  const styles = useStyles();

  return (
    <div>
      <div className={styles["game-status"]}>{gameStatus}</div>
      <div className="game-board-options"></div>
      <div className={styles["game-board-container"]}>
        <div className={styles["game-board-interface"]}>
          <span className="game-board-mine-count">{bombsLeft}</span>
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
            {gameBoard.map((row, i) => (
              <div key={i} className={styles["game-board-row"]}>
                {row.map((cell, j) => (
                  <Cell
                    key={j}
                    cellData={cell}
                    handleClick={handeCellClick}
                    handleRightClick={flagCell}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
