import React from "react";
import Tile from "../tile/index.js";
import "./index.css";

export default function Chessboard({
  size,
  pieces,
}: {
  size: number,
  pieces: number[][],
}) {
  document.documentElement.style.setProperty("--size", size);
  let board = [];
  // let pieces = [
  //   [0, 0],
  //   [2, 2],
  // ];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const number = j + i + 2;
      board.push(
        <Tile
          key={`${j},${i}`}
          hasQueen={pieces.some((piece) => piece[0] == i && piece[1] == j)}
          number={number}
        />
      );
    }
  }

  return <div id="chessboard">{board}</div>;
}
