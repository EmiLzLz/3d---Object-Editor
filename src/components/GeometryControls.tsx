import useGeometryStore from "../store/useGeometryStore";

const SHAPES = [
  { id: "sphere", label: "Sphere" },
  { id: "box", label: "Box" },
  { id: "icosahedron", label: "Ico" },
  { id: "torus", label: "Torus" },
];

function GeometryControls() {
  const geometry = useGeometryStore((state) => state.geometry);
  const updateGeometry = useGeometryStore((state) => state.updateGeometry);

  return (
    <div
      className="panel shape-panel"
      role="region"
      aria-label="Shape controls"
    >
      <span className="panel-label">/shape</span>
      <span className="panel-title">Shape</span>
      <div
        className="geometry-grid"
        role="group"
        aria-label="Geometry selection"
      >
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
  );
}

export default GeometryControls;
