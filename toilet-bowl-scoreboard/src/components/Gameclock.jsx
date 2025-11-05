export default function GameClock({ gameTime, toggleGameClock }) {

  const formatTime = (secs) =>
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <div className="game-clock" onClick={toggleGameClock}>
      {formatTime(gameTime)}
    </div>
  );
}
