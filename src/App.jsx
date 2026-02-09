import { useState } from 'react';
import { useFFmpeg } from './hooks/useFFmpeg';
import { useConversion } from './hooks/useConversion';
import { FileUpload } from './components/FileUpload';
import { PreviewPane } from './components/PreviewPane';
import { ConversionControls } from './components/ConversionControls';
import { ProgressBar } from './components/ProgressBar';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [quality, setQuality] = useState('medium');

  const { ffmpeg, loaded, loadProgress, error: ffmpegError } = useFFmpeg();
  const { convertToGif, isConverting, progress, error: conversionError } = useConversion(ffmpeg);

  const handleConvert = () => {
    if (videoFile) {
      convertToGif(videoFile, quality);
    }
  };

  const handleClear = () => {
    setVideoFile(null);
    setQuality('medium');
  };

  const error = ffmpegError || conversionError;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MP4 to GIF Converter</h1>
        <p>Convert your videos to GIFs instantly in your browser</p>
      </header>

      <main className="app-main">
        {!loaded && (
          <ProgressBar
            progress={loadProgress}
            label="Loading converter..."
          />
        )}

        {loaded && !videoFile && !isConverting && (
          <FileUpload onFileSelect={setVideoFile} />
        )}

        {loaded && videoFile && !isConverting && (
          <>
            <PreviewPane file={videoFile} />
            <ConversionControls
              quality={quality}
              onQualityChange={setQuality}
              onConvert={handleConvert}
              onClear={handleClear}
              disabled={isConverting}
            />
          </>
        )}

        {isConverting && (
          <ProgressBar
            progress={progress}
            label="Converting..."
          />
        )}

        {error && <ErrorMessage message={error} />}
      </main>

      <footer className="app-footer">
        <p>All processing happens in your browser. Files never leave your device.</p>
      </footer>
    </div>
  );
}

export default App;
