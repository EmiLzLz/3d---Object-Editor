import { useEffect, useState } from "react";
import {
  usePresets,
  getAllPresets,
  PRESETS_CHANGED_EVENT,
  type Preset,
} from "../hooks/usePresets";

const SHAPE_ICONS: Record<string, string> = {
  sphere: "●",
  box: "■",
  icosahedron: "▲",
  torus: "◎",
};

interface Props {
  // true when rendered inside the mobile drawer (no floating panel styles)
  embedded?: boolean;
}

function PresetsList({ embedded = false }: Props) {
  const { handlePresetsSave, loadSelectedPreset, deleteId } = usePresets();

  const [presets, setPresets] = useState<Preset[]>(() => getAllPresets());

  // Desktop panel and mobile drawer both stay mounted, so keep them in sync
  useEffect(() => {
    const sync = () => setPresets(getAllPresets());
    window.addEventListener(PRESETS_CHANGED_EVENT, sync);
    return () => window.removeEventListener(PRESETS_CHANGED_EVENT, sync);
  }, []);

  return (
    <div
      className={embedded ? "presets-embedded" : "panel presets-panel"}
      role="region"
      aria-label="Saved presets"
    >
      {!embedded && (
        <>
          <span className="panel-label">/presets</span>
          <span className="panel-title">My Presets</span>
        </>
      )}
      <div className="presets-list">
        {presets.length === 0 ? (
          <p className="presets-empty" role="status">
            No presets saved yet
          </p>
        ) : (
          <ul className="presets-items" aria-label="Preset list">
            {presets.map((preset, index) => (
              <li key={preset.id} className="preset-item">
                <button
                  className="preset-load-btn"
                  onClick={() => loadSelectedPreset(preset.id)}
                  aria-label={`Load preset ${index + 1} — ${preset.geometry}, color ${preset.color}`}
                >
                  <span className="preset-icon" style={{ color: preset.color }}>
                    {SHAPE_ICONS[preset.geometry] ?? "●"}
                  </span>
                  <span className="preset-info">
                    <span className="preset-name">Preset {index + 1}</span>
                    <span className="preset-meta">
                      {preset.color.toUpperCase()} · M
                      {preset.metalness.toFixed(1)} · R
                      {preset.roughness.toFixed(1)}
                    </span>
                  </span>
                </button>
                <button
                  className="preset-delete-btn"
                  onClick={() => deleteId(preset.id)}
                  aria-label={`Delete preset ${index + 1}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="preset-save-btn"
        onClick={handlePresetsSave}
        aria-label="Save current geometry configuration as preset"
      >
        + Save current preset
      </button>
    </div>
  );
}

export default PresetsList;