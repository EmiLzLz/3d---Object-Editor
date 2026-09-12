import useGeometryStore from "../store/useGeometryStore";

function DeformControls() {
  const count     = useGeometryStore((state) => state.count);
  const limit     = useGeometryStore((state) => state.limit);
  const increment = useGeometryStore((state) => state.increment);
  const decrement = useGeometryStore((state) => state.decrement);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val  = Number(e.target.value);
    const diff = val - count;
    if (diff > 0) for (let i = 0; i < diff; i++) increment();
    else          for (let i = 0; i < Math.abs(diff); i++) decrement();
  };

  return (
    <div className="panel deform-panel">
      <span className="panel-label"><span className="icon">⬡</span> Deformation</span>
      <div className="slider-row">
        <input type="range" className="slider" min={0} max={limit} step={1} value={count} onChange={handleSlider} />
        <span className="panel-value">{count}</span>
      </div>
    </div>
  );
}

export default DeformControls;