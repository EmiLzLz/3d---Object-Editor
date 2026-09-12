import { useRef } from "react";
import * as THREE from "three";
import useGeometryStore from "../store/useGeometryStore";
import { useFrame } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material";

function MyObject() {
  const count = useGeometryStore((state) => state.count);
  const metalness = useGeometryStore((state) => state.metalness);
  const roughness = useGeometryStore((state) => state.roughness);
  const color = useGeometryStore((state) => state.color);
  const wireframe = useGeometryStore((state) => state.wireframeActive);
  const materialRef = useRef<any>(null);
  const geometry = useGeometryStore((state) => state.geometry);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uCount.value = count;
    }
  });

  const updateGeometryJsx = () => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[1.2, 64, 64]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1.2, 1]} />;
      case "box":
        return <boxGeometry args={[1.2, 1.2, 1.2, 32, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 64, 64]} />;
    }
  };

  return (
    <>
      <mesh>
        {/* With low values we get a low poly version */}

        {updateGeometryJsx()}
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshPhysicalMaterial}
          vertexShader={`
          uniform float uTime;
          uniform float uCount;

          void main(){
          vec3 pos = position;
          float noise = 1.0 + sin(pos.x * uCount + uTime * 0.3) * cos(pos.y * uCount + uTime * 0.3) * 0.8;
          pos *= noise;

          csm_Position = pos;
          }
        `}
          uniforms={{
            uTime: { value: 1 },
            uCount: { value: 0 },
          }}
          color={color}
          flatShading={true}
          metalness={metalness}
          roughness={roughness}
          wireframe={wireframe}
        />
      </mesh>
    </>
  );
}

export default MyObject;
