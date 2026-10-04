import { create } from "zustand";

interface GeometryState {
  count: number;
  limit: number;
  metalness: number;
  metalRoughLimit: number;
  roughness: number;
  color: string;
  wireframeActive: boolean;
  geometry: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  increaseMetal: () => void;
  decreaseMetal: () => void;
  increaseRough: () => void;
  decreaseRough: () => void;
  updateColor: (newColor: string) => void;
  updateGeometry: (newGeometry: string) => void;
  toggleWireframe: () => void;
  download: (() => void) | null;
  setDownload: (geometryImg: () => void) => void;
  setCount: (n: number) => void;
  setMetalness: (n: number) => void;
  setRoughness: (n: number) => void;
  setWireframe: (active: boolean) => void;
}

const useGeometryStore = create<GeometryState>((set) => ({
  limit: 8,
  count: 0,
  metalness: 0.0,
  metalRoughLimit: 1.0,
  roughness: 0.0,
  color: "#ffffff",
  geometry: "sphere",
  wireframeActive: false,
  download: null,
  increment: () =>
    set((state) => ({
      count: state.count === state.limit ? state.count : state.count + 1,
    })),
  decrement: () =>
    set((state) => ({
      count: state.count === 0 ? state.count : Math.max(0, state.count - 1),
    })),
  reset: () => set({ count: 0 }),
  increaseMetal: () =>
    set((state) => ({
      metalness:
        state.metalness >= state.metalRoughLimit
          ? state.metalness
          : state.metalness + 0.1,
    })),
  decreaseMetal: () =>
    set((state) => ({
      metalness:
        state.metalness <= 0.0
          ? state.metalness
          : Math.max(0, state.metalness - 0.1),
    })),
  increaseRough: () =>
    set((state) => ({
      roughness:
        state.roughness >= state.metalRoughLimit
          ? state.roughness
          : state.roughness + 0.1,
    })),
  decreaseRough: () =>
    set((state) => ({
      roughness:
        state.roughness <= 0.0
          ? state.roughness
          : Math.max(0, state.roughness - 0.1),
    })),
  updateColor: (newColor) => set({ color: newColor }),
  toggleWireframe: () =>
    set((state) => ({ wireframeActive: !state.wireframeActive })),
  updateGeometry: (newGeometry) => set({ geometry: newGeometry }),
  setDownload: (geometryImg) => set({ download: geometryImg }),
  setCount: (n) => set({ count: n }),
  setMetalness: (n) => set({ metalness: n }),
  setRoughness: (n) => set({ roughness: n }),
  setWireframe: (active) => set({ wireframeActive: active }),
}));

export default useGeometryStore;
