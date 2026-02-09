export const QUALITY_PRESETS = {
  low: {
    label: 'Low Quality (Fast)',
    fps: 10,
    scale: 320,
    estimatedSize: '< 2MB',
    filters: 'fps=10,scale=320:-1:flags=lanczos'
  },
  medium: {
    label: 'Medium Quality (Balanced)',
    fps: 15,
    scale: 480,
    estimatedSize: '2-5MB',
    filters: 'fps=15,scale=480:-1:flags=lanczos'
  },
  high: {
    label: 'High Quality (Slow)',
    fps: 20,
    scale: 640,
    estimatedSize: '5-10MB',
    filters: 'fps=20,scale=640:-1:flags=lanczos'
  }
};

export const getQualityPreset = (quality) => {
  return QUALITY_PRESETS[quality] || QUALITY_PRESETS.medium;
};
