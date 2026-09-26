import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import MyObject from "./components/MyObject";
import { OrbitControls, Environment } from "@react-three/drei";
import ScreenshotHelper from "./components/ScreenshotHelper";
import DeformControls from "./components/DeformControls";
import GeometryControls from "./components/GeometryControls";
import MetalnessControls from "./components/MetalnessControls";
import RoughnessControls from "./components/RoughnessControls";
import MaterialPanel from "./components/MaterialPanel";
import DownloadBtn from "./components/DownloadBtn";
import MobileDrawer from "./components/MobileDrawer";
import MouseTracker from "./components/MouseTracker";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle mousemovement with mousetracker
  const mouseRef = useRef({ x: 0, y: 0 });

  return (
    <div id="main-scene">
      <Canvas
        camera={{ fov: 25, near: 2, position: [0, 2.8, 10] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <OrbitControls />
        <Environment preset="studio" />
        <MouseTracker mouseRef={mouseRef}/>
        <MyObject mouseRef={mouseRef} />
        <ScreenshotHelper />
      </Canvas>

      {/* Desktop panels */}
      <DeformControls />
      <GeometryControls />
      <MetalnessControls />
      <RoughnessControls />
      <MaterialPanel />
      <DownloadBtn />

      {/* Mobile drawer + tab */}
      <MobileDrawer open={drawerOpen} />
      <button
        className={`mobile-tab${drawerOpen ? " mobile-tab--open" : ""}`}
        onClick={() => setDrawerOpen((p) => !p)}
        aria-label={drawerOpen ? "Close controls" : "Open controls"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 10L8 5L13 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Controls
      </button>
    </div>
  );
}

export default App;