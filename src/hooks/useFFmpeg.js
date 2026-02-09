import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { useState, useEffect, useRef } from 'react';

export const useFFmpeg = () => {
  const ffmpegRef = useRef(new FFmpeg());
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = ffmpegRef.current;

      try {
        ffmpeg.on('log', ({ message }) => {
          console.log(message);
        });

        setLoadProgress(10);

        const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
        setLoadProgress(30);

        const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
        setLoadProgress(50);

        await ffmpeg.load({
          coreURL,
          wasmURL,
        });

        setLoadProgress(100);
        setLoaded(true);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load FFmpeg:', err);
      }
    };

    load();
  }, []);

  return {
    ffmpeg: ffmpegRef.current,
    loaded,
    loadProgress,
    error
  };
};
