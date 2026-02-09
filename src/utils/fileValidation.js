export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!file.type.includes('video/mp4')) {
    return { valid: false, error: 'Only MP4 files are supported' };
  }

  if (file.size > 50 * 1024 * 1024) { // 50MB
    return { valid: false, error: 'File size must be under 50MB' };
  }

  return { valid: true };
};
