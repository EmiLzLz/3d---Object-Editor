import useGeometryStore from "../store/useGeometryStore";

function MaterialPanel() {
  const color           = useGeometryStore((state) => state.color);
  const updateColor     = useGeometryStore((state) => state.updateColor);
  const wireframeActive = useGeometryStore((state) => state.wireframeActive);
  const toggleWireframe = useGeometryStore((state) => state.toggleWireframe);

  return (
    <div className="panel material-panel">
      <span className="panel-label"><span className="icon">◐</span> Material</span>
      <div className="color-row">
        <div className="color-swatch" style={{ backgroundColor: color }}>
          <input type="color" value={color} onChange={(e) => updateColor(e.target.value)} aria-label="Pick color" />
        </div>
        <span className="color-hex">{color.toUpperCase()}</span>
      </div>
      <div className="toggle-row">
        <span className="toggle-label"><span className="icon">⊞</span> Wireframe</span>
        <label className="toggle">
          <input type="checkbox" checked={wireframeActive} onChange={toggleWireframe} />
          <span className="toggle-track" />
          <span className="toggle-thumb" />
        </label>
      </div>
    </div>
  );
}

export default MaterialPanel;