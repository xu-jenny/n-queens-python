import "./index.css";

interface Props {
  number: number;
  hasQueen: boolean;
}

export default function Tile({ number, hasQueen = false }: Props) {
  const className: string = [
    "tile",
    number % 2 === 0 && "black-tile",
    number % 2 !== 0 && "white-tile",
    hasQueen && "chess-piece-tile",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {hasQueen && <div className="chess-piece"></div>}
    </div>
  );
}
