import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function Rules() {
  const useStyles = makeStyles({
    "game-rules": {
      width: "50%",
      margin: "1rem auto",
      "border-raduis": "5px",
      background: "#f5f5f5",
      padding: "1em",
    },
    "game-rules-title": {
      margin: "0",
    },
  });

  const styles = useStyles();

  return (
    <div className={styles["game-rules"]}>
      <h1 className={styles["game-rules-title"]}>Rules</h1>
      <ul>
        <li>The goal of the game is to find all the mines on the board.</li>
        <li>
          You reveal mines by clicking the cells, if you reveal a mine you
          loose.
        </li>
        <li>
          If you reveal a cell without mine it will show number of mines
          surrounding the cell.
        </li>
        <li>You can flag a field by right clicking it.</li>
        <li>You win when all mines have been found</li>
      </ul>
    </div>
  );
}
