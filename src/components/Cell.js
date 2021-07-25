import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  cell: {
    display: "inline-block",
    background: cellData => cellData.isRevealed ? "#53B8BB" : "#FCFAF9",
    border: 0,
    borderRadius: 2,
    height: "45px",
    width: "45px",
    padding: "0 1px",
    "line-height": "45px",
    cursor: "pointer",
    "text-align": "center",
    color: cellData => cellData.isRevealed ? "#FAFAFA" : "#FCFAF9",
    "font-weight": "bold",
  },
});

export default function Cell(props) {
  function getCellContent(cellData) {
    if (cellData.isFlagged) {
      return "🚩";
    }
    if (cellData.isRevealed && cellData.isBomb) {
      return "💣";
    }
    if (cellData.isRevealed && !cellData.isFlagged && cellData.bombsInProximity) {
      return cellData.bombsInProximity;
    }
    if (cellData.isRevealed && !cellData.isFlagged) {
      return null;
    }
  }
  
  const styles = useStyles(props.cellData);

  return (
    <div
      className={styles.cell}
      onClick={() => props.handleClick(props.cellData)}
      onContextMenu={(event) => props.handleRightClick(event, props.cellData)}
    >
      {getCellContent(props.cellData)}
    </div>
  );
}
