import useGeometryStore from "../store/useGeometryStore";

function MetalnessControls() {
  const metalness     = useGeometryStore((state) => state.metalness);
  const increaseMetal = useGeometryStore((state) => state.increaseMetal);
  const decreaseMetal = useGeometryStore((state) => state.decreaseMetal);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val  = parseFloat(e.target.value);
    const diff = Math.round((val - metalness) / 0.1);
    if (diff > 0) for (let i = 0; i < diff; i++) increaseMetal();
    else          for (let i = 0; i < Math.abs(diff); i++) decreaseMetal();
  };

  return (
    <div className="panel metalness-panel">
      <span className="panel-label"><span className="icon">◎</span> Metalness</span>
      <div className="slider-row">
        <input type="range" className="slider" min={0} max={1} step={0.1} value={metalness} onChange={handleSlider} />
        <span className="panel-value">{metalness.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default MetalnessControls;