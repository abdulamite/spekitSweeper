import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  cell: {
    display: "inline-block",
    background: "#FCFAF9",
    border: 0,
    borderRadius: 2,
    height: "45px",
    width: "45px",
    padding: "0 1px",
    "line-height": "45px",
    cursor: "pointer",
    "text-align": "center",
    color: "#333333",
    "font-weight": "bold",
  },
});

export default function Cell(props) {
  function getCellContent(cellData) {
    if (!cellData.isRevealed) {
      return cellData.isFlagged ? "🚩" : null;
    }
    if (cellData.isBomb) {
      return "💣";
    }
    if (cellData.neighbour === 0) {
      return null;
    }
    return cellData.neighbour;
  }
  const styles = useStyles();

  return (
    <div
      className={styles.cell}
      onClick={() => props.handleClick(props.cellData)}
    >
      {getCellContent(props.cellData)}
    </div>
  );
}
