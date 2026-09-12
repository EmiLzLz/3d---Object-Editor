import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useGeometryStore from "../store/useGeometryStore";

function ScreenshotHelper() {
const { gl, scene, camera } = useThree();  const setDownload = useGeometryStore((state) => state.setDownload);

  useEffect(() => {
    const captureGeometry = () => {
      try {

        gl.render(scene, camera);
        const imgDataUrl = gl.domElement.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = imgDataUrl;
        link.download = "geometry-ss.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Fail to download SS: ", error);
      }
    };

    setDownload(captureGeometry);

    return () => setDownload(() => {});
  }, [gl, setDownload]);

  return null;
}
export default ScreenshotHelper;
