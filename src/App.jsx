import { useState } from "react";

import Player from "./Component/player";
import GameBoard from "./Component/GameBoard";
import Log from "./Component/Log";
import GameOver from "./Component/GameOver";
import { WINNING_COMBINATIONS } from "./WINING_COMBINATIONS.JS";

const PLAYERS = {
  X: 'Player 1',
  O: 'PLayer 2'
}

const INITIAL_GAME_BORD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BORD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard
}

function deriveWinner(gameBoard) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  return winner
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard);
  
  function handelSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handelRestart() {
    setGameTurns([]);
  }
  
  function handelEditPlayer(symbol, newName) {
    setPlayers(prevPlayers => ({...prevPlayers, [symbol]: newName}))
  }
  
  return (
    <main>
      <div className="game-container">
        <ol className="players highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onEditName={handelEditPlayer}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onEditName={handelEditPlayer}
          />
        </ol>
        {(winner || gameTurns.length === 9) && (
          <GameOver winner={players[winner]} onRestart={handelRestart} />
        )}
        <GameBoard onSelectSquare={handelSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
