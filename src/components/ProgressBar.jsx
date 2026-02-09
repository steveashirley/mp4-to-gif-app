export const ProgressBar = ({ progress, label }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-label">{label}</div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-percentage">{progress}%</div>
    </div>
  );
};
