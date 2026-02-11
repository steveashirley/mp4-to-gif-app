export function GifResult({ gifUrl, gifFilename }) {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = gifUrl;
    a.download = gifFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="gif-result">
      <h3>Converted GIF</h3>
      <img src={gifUrl} alt="Converted GIF" className="gif-preview" />
      <div className="gif-result-footer">
        <span className="gif-filename">{gifFilename}</span>
        <button className="btn-secondary" onClick={handleDownload}>Download again</button>
      </div>
    </div>
  );
}
