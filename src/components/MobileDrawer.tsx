import useGeometryStore from "../store/useGeometryStore";

interface Props { open: boolean; }

const SHAPES = [
  { id: "sphere",      label: "Sphere" },
  { id: "box",         label: "Box" },
  { id: "icosahedron", label: "Ico" },
  { id: "torus",       label: "Torus" },
];

function MobileDrawer({ open }: Props) {
  const count           = useGeometryStore((s) => s.count);
  const limit           = useGeometryStore((s) => s.limit);
  const increment       = useGeometryStore((s) => s.increment);
  const decrement       = useGeometryStore((s) => s.decrement);
  const metalness       = useGeometryStore((s) => s.metalness);
  const increaseMetal   = useGeometryStore((s) => s.increaseMetal);
  const decreaseMetal   = useGeometryStore((s) => s.decreaseMetal);
  const roughness       = useGeometryStore((s) => s.roughness);
  const increaseRough   = useGeometryStore((s) => s.increaseRough);
  const decreaseRough   = useGeometryStore((s) => s.decreaseRough);
  const color           = useGeometryStore((s) => s.color);
  const updateColor     = useGeometryStore((s) => s.updateColor);
  const wireframeActive = useGeometryStore((s) => s.wireframeActive);
  const toggleWireframe = useGeometryStore((s) => s.toggleWireframe);
  const geometry        = useGeometryStore((s) => s.geometry);
  const updateGeometry  = useGeometryStore((s) => s.updateGeometry);
  const download        = useGeometryStore((s) => s.download);

  const handleDeform = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const diff = val - count;
    if (diff > 0) for (let i = 0; i < diff; i++) increment();
    else          for (let i = 0; i < Math.abs(diff); i++) decrement();
  };

  const handleMetal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const diff = Math.round((val - metalness) / 0.1);
    if (diff > 0) for (let i = 0; i < diff; i++) increaseMetal();
    else          for (let i = 0; i < Math.abs(diff); i++) decreaseMetal();
  };

  const handleRough = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const diff = Math.round((val - roughness) / 0.1);
    if (diff > 0) for (let i = 0; i < diff; i++) increaseRough();
    else          for (let i = 0; i < Math.abs(diff); i++) decreaseRough();
  };

  return (
    <div className={`mobile-drawer${open ? " mobile-drawer--open" : ""}`}>

      {/* Deformation */}
      <div className="mobile-control-row">
        <div className="mobile-control-icon" aria-hidden>⬡</div>
        <div className="mobile-control-body">
          <span className="mobile-control-label">Deformation</span>
          <input
            type="range"
            className="slider"
            min={0} max={limit} step={1}
            value={count}
            onChange={handleDeform}
          />
        </div>
      </div>

      <div className="mobile-divider" />

      {/* Shape */}
      <div className="mobile-control-row">
        <div className="mobile-control-icon" aria-hidden>◈</div>
        <div className="mobile-control-body">
          <span className="mobile-control-label">Shape</span>
          <div className="geometry-grid">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                className={`geo-btn${geometry === s.id ? " geo-btn--active" : ""}`}
                onClick={() => updateGeometry(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-divider" />

      {/* Metalness */}
      <div className="mobile-control-row">
        <div className="mobile-control-icon" aria-hidden>◎</div>
        <div className="mobile-control-body">
          <span className="mobile-control-label">Metalness</span>
          <input
            type="range"
            className="slider"
            min={0} max={1} step={0.1}
            value={metalness}
            onChange={handleMetal}
          />
        </div>
      </div>

      <div className="mobile-divider" />

      {/* Roughness */}
      <div className="mobile-control-row">
        <div className="mobile-control-icon" aria-hidden>▦</div>
        <div className="mobile-control-body">
          <span className="mobile-control-label">Roughness</span>
          <input
            type="range"
            className="slider"
            min={0} max={1} step={0.1}
            value={roughness}
            onChange={handleRough}
          />
        </div>
      </div>

      <div className="mobile-divider" />

      {/* Color + Wireframe */}
      <div className="mobile-control-row">
        <div className="mobile-control-icon" aria-hidden>◐</div>
        <div className="mobile-control-body">
          <span className="mobile-control-label">Material</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div className="color-swatch" style={{ backgroundColor: color }}>
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(e.target.value)}
                aria-label="Pick color"
              />
            </div>
            <span className="color-hex">{color.toUpperCase()}</span>
            <label className="toggle" style={{ marginLeft: "auto" }}>
              <input
                type="checkbox"
                checked={wireframeActive}
                onChange={toggleWireframe}
              />
              <span className="toggle-track" />
              <span className="toggle-thumb" />
            </label>
          </div>
        </div>
      </div>

      <div className="mobile-divider" />

      {/* Download */}
      <button
        className="mobile-download-btn"
        onClick={() => download?.()}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Save as PNG
      </button>

    </div>
  );
}

export default MobileDrawer;