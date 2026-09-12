import useGeometryStore from "../store/useGeometryStore";

function RoughnessControls() {
  const roughness     = useGeometryStore((state) => state.roughness);
  const increaseRough = useGeometryStore((state) => state.increaseRough);
  const decreaseRough = useGeometryStore((state) => state.decreaseRough);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val  = parseFloat(e.target.value);
    const diff = Math.round((val - roughness) / 0.1);
    if (diff > 0) for (let i = 0; i < diff; i++) increaseRough();
    else          for (let i = 0; i < Math.abs(diff); i++) decreaseRough();
  };

  return (
    <div className="panel roughness-panel">
      <span className="panel-label"><span className="icon">▦</span> Roughness</span>
      <div className="slider-row">
        <input type="range" className="slider" min={0} max={1} step={0.1} value={roughness} onChange={handleSlider} />
        <span className="panel-value">{roughness.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default RoughnessControls;