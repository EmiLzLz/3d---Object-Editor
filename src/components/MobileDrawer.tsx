import useGeometryStore from "../store/useGeometryStore";
import PresetsList from "./PresetsList";

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
  const download3D      = useGeometryStore((s) => s.download3D);

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
    <div
      className={`mobile-drawer${open ? " mobile-drawer--open" : ""}`}
      role="region"
      aria-label="Controls"
      inert={!open}
    >

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
            aria-label="Deformation"
          />
        </div>
      </div>

      <div className="mobile-divider" />

      {/* Shape */}
      <div className="mobile-control-row">
        <div className="mobile-control-icon" aria-hidden>◈</div>
        <div className="mobile-control-body">
          <span className="mobile-control-label">Shape</span>
          <div className="geometry-grid" role="group" aria-label="Geometry selection">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                className={`geo-btn${geometry === s.id ? " geo-btn--active" : ""}`}
                onClick={() => updateGeometry(s.id)}
                aria-pressed={geometry === s.id}
                aria-label={`Select ${s.label} geometry`}
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
            aria-label="Metalness"
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
            aria-label="Roughness"
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
                aria-label="Geometry color"
              />
            </div>
            <span className="color-hex" aria-live="polite">{color.toUpperCase()}</span>
            <label className="toggle" style={{ marginLeft: "auto" }} aria-label="Toggle wireframe mode">
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

      {/* Presets */}
      <div className="mobile-presets">
        <div className="mobile-control-row">
          <div className="mobile-control-icon" aria-hidden>⊹</div>
          <span className="mobile-control-label">Presets</span>
        </div>
        <PresetsList embedded />
      </div>

      <div className="mobile-divider" />

      {/* Export */}
      <div className="mobile-export">
        <button
          className="mobile-download-btn"
          onClick={() => download?.()}
          aria-label="Download geometry as PNG image"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Save as PNG
        </button>
        <button
          className="mobile-download-btn"
          onClick={() => download3D?.()}
          aria-label="Download geometry as 3D GLTF file"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M8 1.5L14 4.75V11.25L8 14.5L2 11.25V4.75L8 1.5Z M8 8V14.5 M8 8L14 4.75 M8 8L2 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Save as 3D Object
        </button>
      </div>

    </div>
  );
}

export default MobileDrawer;