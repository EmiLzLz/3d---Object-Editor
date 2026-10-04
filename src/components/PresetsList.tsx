import { useState } from "react";
import { usePresets, getAllPresets, type Preset  } from "../hooks/usePresets";


const SHAPE_ICONS: Record<string, string> = {
  sphere: "●",
  box: "■",
  icosahedron: "▲",
  torus: "◎",
};

function PresetsList() {
  const { handlePresetsSave, loadSelectedPreset, deleteId } =
    usePresets();

  const [presets, setPresets] = useState(() => getAllPresets());

  const handleSave = () => {
    handlePresetsSave();
    setPresets(getAllPresets());
  };

  const handleDelete = (id: string) => {
    deleteId(id);
    setPresets(getAllPresets());
  };

  const handleLoad = (id: string) => {
    loadSelectedPreset(id);
  };

  return (
    <div className="panel presets-panel">
      <span className="panel-label">⊹ My Presets</span>

      <div className="presets-list">
        {presets.length === 0 ? (
          <p className="presets-empty">No presets saved yet</p>
        ) : (
          <ul className="presets-items">
            {presets.map((preset: Preset, index: number) => (
              <li key={preset.id} className="preset-item">
                <button
                  className="preset-load-btn"
                  onClick={() => handleLoad(preset.id)}
                >
                  <span
                    className="preset-icon"
                    style={{ color: preset.color }}
                  >
                    {SHAPE_ICONS[preset.geometry] ?? "●"}
                  </span>
                  <span className="preset-info">
                    <span className="preset-name">Preset {index + 1}</span>
                    <span className="preset-meta">
                      {preset.color.toUpperCase()} · M{preset.metalness.toFixed(1)} · R{preset.roughness.toFixed(1)}
                    </span>
                  </span>
                </button>
                <button
                  className="preset-delete-btn"
                  onClick={() => handleDelete(preset.id)}
                  aria-label="Delete preset"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="preset-save-btn" onClick={handleSave}>
        + Save current preset
      </button>
    </div>
  );
}

export default PresetsList;