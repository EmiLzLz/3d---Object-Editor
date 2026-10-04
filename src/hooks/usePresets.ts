import useGeometryStore from "../store/useGeometryStore";
import { useShallow } from 'zustand/react/shallow';

export interface Preset {
  id: string;
  count: number;
  metalness: number;
  roughness: number;
  color: string;
  wireframe: boolean;
  geometry: string;
}

export function usePresets() {
  const materialProps = useGeometryStore(useShallow((state) => ({
  count: state.count,
  metalness: state.metalness,
  roughness: state.roughness,
  color: state.color,
  wireframe: state.wireframeActive,
  geometry: state.geometry,
})));

  const setCount = useGeometryStore((state) => state.setCount);
  const setMetalness = useGeometryStore((state) => state.setMetalness);
  const setRoughness = useGeometryStore((state) => state.setRoughness);
  const updateColor = useGeometryStore((state) => state.updateColor);
  const setWireframe = useGeometryStore((state) => state.setWireframe);
  const geometrySelected = useGeometryStore((state) => state.updateGeometry);

  const handlePresetsSave = () => {
    if (!materialProps) return;

    const newPreset = {
      id: crypto.randomUUID(),
      ...materialProps,
    };

    const presetsHistory =
      JSON.parse(localStorage.getItem("my-presets") ?? "[]") || [];

    presetsHistory.push(newPreset);

    localStorage.setItem("my-presets", JSON.stringify(presetsHistory));

    console.log("presets saved!", presetsHistory);
  };

  const loadSelectedPreset = (id: string) => {
    const presetsHistory: Preset[] = JSON.parse(
      localStorage.getItem("my-presets") ?? "[]",
    );

    const selectedPreset = presetsHistory.find((p) => p.id === id) ?? null;

    if (selectedPreset) {
      setCount(selectedPreset.count);
      setMetalness(selectedPreset.metalness);
      setRoughness(selectedPreset.roughness);
      updateColor(selectedPreset.color);
      setWireframe(selectedPreset.wireframe);
      geometrySelected(selectedPreset.geometry);
    }
  };

  const deleteId = (id: string) => {
    const presetsHistory: Preset[] = JSON.parse(
      localStorage.getItem("my-presets") ?? "[]",
    );

    const updatePresets = presetsHistory.filter((p) => p.id !== id);

    localStorage.setItem("my-presets", JSON.stringify(updatePresets));
  };

  return {
    handlePresetsSave,
    loadSelectedPreset,
    deleteId,
  };
}

export const getAllPresets = () => {
    const presetsHistory =
      JSON.parse(localStorage.getItem("my-presets") ?? "[]") || [];

    return presetsHistory;
  };