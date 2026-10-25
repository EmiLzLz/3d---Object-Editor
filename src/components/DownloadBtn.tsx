import useGeometryStore from "../store/useGeometryStore";

function DownloadBtn() {
  const download = useGeometryStore((state) => state.download);
  const download3D = useGeometryStore((state) => state.download3D);

  return (
    <div className="panel download-panel">
      <span className="panel-label">/export</span>
      <span className="panel-title">Export</span>
      <button className="download-btn" onClick={() => download?.()}>
        Save as PNG
      </button>
      <button className="download-btn" onClick={() => download3D?.()}>
        Save as 3D Object
      </button>
    </div>
  );
}

export default DownloadBtn;
