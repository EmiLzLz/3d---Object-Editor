import useGeometryStore from "../store/useGeometryStore";

function ColorControl() {
  const color = useGeometryStore((state) => state.color);
  const changeColor = useGeometryStore((state) => state.updateColor);
  return (
    <div className="color-control">
      <h3>COLOR CONTROL</h3>
      <div className="actions">
        <h4>Current: {color}</h4>
        <input type="color" onChange={(e) => changeColor(e.target.value)} />
      </div>
    </div>
  );
}

export default ColorControl;
