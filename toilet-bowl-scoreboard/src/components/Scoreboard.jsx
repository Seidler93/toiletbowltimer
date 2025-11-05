export default function ScoreBoard({
  homeScore, setHomeScore,
  awayScore, setAwayScore,
  homeTimeouts, awayTimeouts,
  triggerTimeout
}) {
  return (
    <div className="score-row">
      <div className="team">
        HOME: {homeScore}
        <button onClick={() => setHomeScore(s => s + 1)}>+</button>
        <button onClick={() => setHomeScore(s => Math.max(s - 1, 0))}>-</button>
        <div>TO: {"✅".repeat(homeTimeouts)}</div>
        <button onClick={() => triggerTimeout("home")}>TIMEOUT</button>
      </div>

      <div className="team">
        AWAY: {awayScore}
        <button onClick={() => setAwayScore(s => s + 1)}>+</button>
        <button onClick={() => setAwayScore(s => Math.max(s - 1, 0))}>-</button>
        <div>TO: {"✅".repeat(awayTimeouts)}</div>
        <button onClick={() => triggerTimeout("away")}>TIMEOUT</button>
      </div>
    </div>
  );
}
