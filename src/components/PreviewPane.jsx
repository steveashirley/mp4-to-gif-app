import { useEffect, useState } from 'react';

export const PreviewPane = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [metadata, setMetadata] = useState({
    name: '',
    size: '',
    duration: '',
  });

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      setMetadata({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        duration: '',
      });

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const handleLoadedMetadata = (e) => {
    const duration = Math.round(e.target.duration);
    setMetadata(prev => ({
      ...prev,
      duration: `${duration} seconds`,
    }));
  };

  return (
    <div className="preview-pane">
      <h3>Preview</h3>
      {previewUrl && (
        <>
          <video
            src={previewUrl}
            controls
            className="preview-video"
            onLoadedMetadata={handleLoadedMetadata}
          />
          <div className="metadata">
            <div className="metadata-item">
              <strong>File:</strong> {metadata.name}
            </div>
            <div className="metadata-item">
              <strong>Size:</strong> {metadata.size}
            </div>
            {metadata.duration && (
              <div className="metadata-item">
                <strong>Duration:</strong> {metadata.duration}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
