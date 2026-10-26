import useGeometryStore from "../store/useGeometryStore";

function DownloadBtn() {
  const download = useGeometryStore((state) => state.download);
  const download3D = useGeometryStore((state) => state.download3D);

  return (
    <div
      className="panel download-panel"
      role="region"
      aria-label="Export controls"
    >
      <span className="panel-label">/export</span>
      <span className="panel-title">Export</span>
      <button
        className="download-btn"
        onClick={() => download?.()}
        aria-label="Download geometry as PNG image"
      >
        Save as PNG
      </button>
      <button
        className="download-btn"
        onClick={() => download3D?.()}
        aria-label="Download geometry as 3D GLTF file"
      >
        Save as 3D Object
      </button>
    </div>
  );
}

export default DownloadBtn;
