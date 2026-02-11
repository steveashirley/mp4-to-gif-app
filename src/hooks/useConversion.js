import { useState, useCallback } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { getQualityPreset } from '../utils/ffmpegConfig';
import { downloadFile } from '../utils/downloadHelper';

export const useConversion = (ffmpeg) => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);
  const [gifFilename, setGifFilename] = useState(null);

  const convertToGif = useCallback(async (file, quality = 'medium') => {
    if (!ffmpeg) {
      setError('FFmpeg is not loaded');
      return;
    }

    try {
      setIsConverting(true);
      setProgress(0);
      setError(null);

      // Listen to progress events
      ffmpeg.on('progress', ({ progress: p }) => {
        setProgress(Math.round(p * 100));
      });

      // Write input file to ffmpeg virtual filesystem
      const inputData = await fetchFile(file);
      await ffmpeg.writeFile('input.mp4', inputData);

      // Get quality preset
      const preset = getQualityPreset(quality);

      // Pass 1: Generate palette
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', `${preset.filters},palettegen`,
        'palette.png'
      ]);

      // Pass 2: Convert with palette
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-i', 'palette.png',
        '-filter_complex', `${preset.filters}[x];[x][1:v]paletteuse`,
        'output.gif'
      ]);

      // Read output file
      const data = await ffmpeg.readFile('output.gif');

      // Create blob, store preview URL, and trigger download
      const blob = new Blob([data.buffer], { type: 'image/gif' });
      const filename = file.name.replace(/\.[^/.]+$/, '') + '.gif';
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      setGifFilename(filename);
      downloadFile(blob, filename);

      // Cleanup
      await ffmpeg.deleteFile('input.mp4');
      await ffmpeg.deleteFile('palette.png');
      await ffmpeg.deleteFile('output.gif');

      setIsConverting(false);
      setProgress(100);

    } catch (err) {
      setError(err.message);
      setIsConverting(false);
      console.error('Conversion error:', err);
    }
  }, [ffmpeg]);

  const clearGif = useCallback(() => {
    setGifUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setGifFilename(null);
    setProgress(0);
  }, []);

  return {
    convertToGif,
    isConverting,
    progress,
    error,
    gifUrl,
    gifFilename,
    clearGif,
  };
};
