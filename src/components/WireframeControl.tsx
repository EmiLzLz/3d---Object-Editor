import useGeometryStore from "../store/useGeometryStore";

function WireframeControl() {
  const wireframeActive = useGeometryStore((state) => state.wireframeActive);
  const toggleWireframe = useGeometryStore((state) => state.toggleWireframe);
  return (
    <div className="wireframe-control">
      <h3>TOGGLE WIREFRAME</h3>
      <div className="actions">
        <h4>Current: {wireframeActive}</h4>
        <input type="checkbox" onChange={() => toggleWireframe()}/>
      </div>
    </div>
  );
}

export default WireframeControl