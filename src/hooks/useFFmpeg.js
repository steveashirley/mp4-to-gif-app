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
      const ffmpeg = ffmpegRef.current;

      try {
        if (typeof SharedArrayBuffer === 'undefined') {
          throw new Error('SharedArrayBuffer is not supported. Please use Chrome, Firefox, or Edge.');
        }

        ffmpeg.on('log', ({ message }) => {
          console.log('[FFmpeg]', message);
        });

        setLoadProgress(25);

        // Load from same origin (files are copied to public/ at build time)
        // toBlobURL is used so the Worker can import the module correctly
        const coreURL = await toBlobURL('/ffmpeg-core.js', 'text/javascript');
        setLoadProgress(60);

        await ffmpeg.load({
          coreURL,
          wasmURL: '/ffmpeg-core.wasm',
        });

        setLoadProgress(100);
        setLoaded(true);
      } catch (err) {
        setError(err.message || 'Unknown error loading FFmpeg');
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
