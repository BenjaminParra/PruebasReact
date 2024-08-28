export function Header({ resetGame }) {
  return (
    <header>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
    </header>
  );
}
