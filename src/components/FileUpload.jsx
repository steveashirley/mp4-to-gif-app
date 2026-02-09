import { useRef } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

export const FileUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const {
    isDragging,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
  } = useFileUpload(onFileSelect);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload-container">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="drop-zone-content">
          <svg
            className="upload-icon"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <h3>Drop your MP4 file here</h3>
          <p>or click to browse</p>
          <button type="button" className="browse-button">
            Choose File
          </button>
        </div>
      </div>
      {error && <div className="error-message-inline">{error}</div>}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};
