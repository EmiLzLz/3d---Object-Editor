import React, { useEffect } from "react";
import { error } from "three";
import { GLTFExporter } from "three/examples/jsm/Addons.js";
import useGeometryStore from "../store/useGeometryStore";
import * as THREE from "three";
import type { RefObject } from "react";

function Download3DHelper({ meshRef }: { meshRef: RefObject<THREE.Mesh> }) {
  const setDownload3D = useGeometryStore((state) => state.setDownload3D);

  useEffect(() => {
    const downloadFigure = (content: string, fileName: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    };
    const exportGLB = () => {
      if (!meshRef.current) return;

      const exporter = new GLTFExporter();

      exporter.parse(
        meshRef.current,
        (gltf) => {
          const output = JSON.stringify(gltf, null, 2);
          downloadFigure(output, "figure_3d.gltf");
        },
        (error) => console.error("Something went wrong with export: ", error),
        { binary: false },
      );
    };

    setDownload3D(exportGLB);
    return () => setDownload3D(() => {});
  }, [meshRef, setDownload3D]);

  return null;
}

export default Download3DHelper;
