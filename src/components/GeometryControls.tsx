import useGeometryStore from "../store/useGeometryStore";

const SHAPES = [
  { id: "sphere",      label: "Sphere" },
  { id: "box",         label: "Box" },
  { id: "icosahedron", label: "Ico" },
  { id: "torus",       label: "Torus" },
];

function GeometryControls() {
  const geometry       = useGeometryStore((state) => state.geometry);
  const updateGeometry = useGeometryStore((state) => state.updateGeometry);

  return (
    <div className="panel shape-panel">
      <span className="panel-label"><span className="icon">◈</span> Shape</span>
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
  );
}

export default GeometryControls;