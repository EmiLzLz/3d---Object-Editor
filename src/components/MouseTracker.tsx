import React, { useEffect } from "react";
import type { RefObject } from "react";

function MouseTracker({
  mouseRef,
}: {
  mouseRef: RefObject<{ x: number; y: number }>;
}) {
  useEffect(() => {
    const mouseMovement = (e:MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", mouseMovement);

    return () => {
      window.removeEventListener("mousemove", mouseMovement);
    };
  }, [mouseRef]);

  return null;
}

export default MouseTracker;
