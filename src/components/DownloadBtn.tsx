import useGeometryStore from "../store/useGeometryStore";

function DownloadBtn() {
  const download = useGeometryStore((state) => state.download);

  return (
    <div className="panel download-panel">
      <span className="panel-label">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Export
      </span>
      <button className="download-btn" onClick={() => download?.()}>
        Save as PNG
      </button>
    </div>
  );
}

export default DownloadBtn;