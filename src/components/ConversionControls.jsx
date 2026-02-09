import { QUALITY_PRESETS } from '../utils/ffmpegConfig';

export const ConversionControls = ({
  quality,
  onQualityChange,
  onConvert,
  onClear,
  disabled,
}) => {
  const preset = QUALITY_PRESETS[quality];

  return (
    <div className="conversion-controls">
      <div className="quality-selector">
        <label htmlFor="quality">Quality:</label>
        <select
          id="quality"
          value={quality}
          onChange={(e) => onQualityChange(e.target.value)}
          disabled={disabled}
        >
          {Object.entries(QUALITY_PRESETS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
        <span className="estimated-size">
          Estimated: {preset?.estimatedSize}
        </span>
      </div>

      <div className="button-group">
        <button
          className="btn-primary"
          onClick={onConvert}
          disabled={disabled}
        >
          Convert to GIF
        </button>
        <button
          className="btn-secondary"
          onClick={onClear}
          disabled={disabled}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
