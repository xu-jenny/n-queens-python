import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Chessboard from "./components/chesseboard";
import "./App.css";

function App() {
  const [chessboardSize, setChessboardSize] = useState(4);
  const [solution, setSolution] = useState([]);
  const [solutionPage, setSolutionPage] = useState(0);
  const [solutionPieces, setSolutionPieces] = useState([]);

  function getData() {
    axios
      .post("http://127.0.0.1:5000/profile", {
        size: parseInt(chessboardSize),
      })
      .then(function (res) {
        console.log(res.data.solutions);
        setSolution(res.data.solutions);
        setSolutionPieces(res.data.solutions[solutionPage]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const setViewingSolution = (num) => {
    console.log(num);
    setSolutionPage(num);
    setSolutionPieces(solution[num]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Chessboard size={chessboardSize} pieces={solutionPieces} />
        <button onClick={getData}>Show me</button>
        {solutionPage < solution.length - 1 && (
          <button onClick={() => setViewingSolution(solutionPage + 1)}>
            {" "}
            Next Solution >>
          </button>
        )}
        {solutionPage > 0 && (
          <button onClick={() => setViewingSolution(solutionPage - 1)}>
            {`<<`} Prev Solution
          </button>
        )}
        <div>
          <label htmlFor="n_queens_input">
            Show me solutions for board of size:
          </label>
          <input
            id="n_queens_input"
            type="number"
            name="n_queens_input"
            onChange={(e) => {
              setChessboardSize(e.target.value == "" ? 4 : e.target.value);
            }}
          />
        </div>

        <div>
          <span>Jump to solution</span>
          <select name="solutions">
            {Array.from({ length: solution.length }, (_, i) => (
              <option
                value={i}
                onClick={() => {
                  console.log(i);
                }}
              >
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </header>
    </div>
  );
}

export default App;
