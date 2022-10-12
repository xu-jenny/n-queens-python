import React from "react";
import { useState } from "react";
import axios from "axios";
import Chessboard from "./components/chessboard";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const Game = () => {
  const [chessboardSize, setChessboardSize] = useState(4);
  const [solution, setSolution] = useState([]);
  const [solutionPage, setSolutionPage] = useState(0);
  const [solutionPieces, setSolutionPieces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getData() {
    if (chessboardSize > 8) {
      // only use loading spinner if api actually takes a while
      setIsLoading(true);
    }
    axios
      .post("http://127.0.0.1:5000/profile", {
        size: parseInt(chessboardSize),
      })
      .then(function (res) {
        console.log(res.data.solutions);
        setSolution(res.data.solutions);
        setSolutionPieces(res.data.solutions[solutionPage]);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const setViewingSolution = (num) => {
    setSolutionPage(num);
    setSolutionPieces(solution[num]);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        style={{ "margin-top": "inherit" }}
      >
        <Grid>
          <div>
            <label htmlFor="n_queens_input">
              Show me solutions for board of size
            </label>
            <TextField
              style={{
                backgroundColor: "white",
                marginLeft: "5px",
                maxWidth: "3rem",
              }}
              variant="standard"
              type="number"
              value={chessboardSize}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setChessboardSize(e.target.value == "" ? 4 : e.target.value);
                setSolutionPieces([]);
              }}
            />
          </div>
          <Button
            onClick={getData}
            style={{ backgroundColor: "white", "margin-top": "1rem" }}
          >
            Let's Go!
          </Button>
        </Grid>
        <Grid item>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Chessboard size={chessboardSize} pieces={solutionPieces} />
          )}
        </Grid>
        <Grid
          container
          xs={12}
          style={{ "margin-top": "2rem" }}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {solutionPage > 0 && (
            <Grid item xs={3}>
              <Button
                onClick={() => setViewingSolution(solutionPage - 1)}
                variant="outlined"
                style={{ backgroundColor: "white" }}
                startIcon={<ArrowLeftIcon />}
              >
                Prev Solution
              </Button>
            </Grid>
          )}

          {solutionPage < solution.length - 1 && (
            <Grid item xs={3}>
              <Button
                onClick={() => setViewingSolution(solutionPage + 1)}
                variant="outlined"
                style={{ backgroundColor: "white" }}
                endIcon={<ArrowRightIcon />}
              >
                Next Solution
              </Button>
            </Grid>
          )}
        </Grid>
        {solution.length > 1 && (
          <div style={{ "margin-top": "2rem" }}>
            <span>Jump to solution </span>
            <Select
              variant="standard"
              style={{ backgroundColor: "white", "text-align": "right" }}
              value={solutionPage}
              onChange={(event) => setViewingSolution(event.target.value)}
            >
              {Array.from({ length: solution.length }, (_, i) => (
                <MenuItem value={i}>{i + 1}</MenuItem>
              ))}
            </Select>
          </div>
        )}
      </Grid>
    </>
  );
};

export default Game;
