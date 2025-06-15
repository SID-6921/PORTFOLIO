
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generates a single normalized heartbeat waveform
function HeartBeatLine({ color = "#20B2AA" }) {
  // Polyline: [0, 0] rising to peak at [0.5, 0.5] then down to [1, 0]
  const points = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.15, 0, 0),
      new THREE.Vector3(0.22, 0.11, 0),
      new THREE.Vector3(0.25, -0.1, 0),
      new THREE.Vector3(0.26, 0.2, 0), // "QRS upstroke"
      new THREE.Vector3(0.3, 0.5, 0),  // Peak
      new THREE.Vector3(0.35, 0, 0),   // Return to baseline
      new THREE.Vector3(1, 0, 0)
    ],
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(points);
    return geo;
  }, [points]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, linewidth: 2 }),
    [color]
  );

  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);
  const lineRef = useRef<THREE.Line>(null);

  // Animate the color a little for subtle effect
  useFrame(({ clock }) => {
    if (
      lineRef.current &&
      lineRef.current.material &&
      (lineRef.current.material as THREE.LineBasicMaterial).color
    ) {
      const pulse = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 0.6);
      (lineRef.current.material as THREE.LineBasicMaterial).color.setRGB(
        0.11 + pulse * 0.2,
        0.75,
        1.1 - 0.1 * pulse
      );
    }
  });

  return <primitive ref={lineRef} object={line} />;
}

// Pulsing dot that sits at the "peak" of the heartbeat
function PulseDot() {
  const meshRef = useRef<THREE.Mesh>(null);
  // The X and Y for the main peak point (see points above)
  const x = 0.3;
  const y = 0.5;

  const geometry = useMemo(() => new THREE.SphereGeometry(0.025, 32, 32), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xff3245,
        emissive: 0xff808a,
        emissiveIntensity: 0.75
      }),
    []
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Animate scale for pulse
      const s = 1 + 0.25 * Math.abs(Math.sin(t * 2));
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, 0.04]}
      geometry={geometry}
      material={material}
      castShadow
    />
  );
}

// Main 3D scene: simple normalized heartbeat
export default function Bio3DScene() {
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 128, minWidth: 330 }}>
      <Canvas
        camera={{ position: [0.5, 0.16, 2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.99} />
        <pointLight position={[0.5, 1.6, 2]} intensity={0.14} />
        <HeartBeatLine />
        <PulseDot />
      </Canvas>
    </div>
  );
}
