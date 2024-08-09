export default function GameOver({ winner, onRestart }) {
  return (
    <div className="game-over">
      <h2>game over!</h2>
      {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}
      <button onClick={onRestart}>Rematch</button>
    </div>
  );
}
