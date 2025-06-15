
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Heartbeat polyline (EKG spike)
function HeartBeatLine({ color = "#20B2AA" }) {
  // Normalized heartbeat from (0,0) to (1,0)
  const points = useMemo(
    () =>
      [
        [0, 0],
        [0.08, 0],
        [0.17, 0.13],
        [0.19, -0.11],
        [0.24, 0.24],
        [0.28, 0.6],
        [0.34, 0],
        [1, 0]
      ].map(([x, y]) => new THREE.Vector3(x, y, 0)),
    []
  );
  const lineRef = useRef<THREE.Line>(null);
  const colorRef = useRef(color);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      // Animate color for subtle pulse effect
      const pulse = 0.6 + 0.4 * Math.sin(clock.getElapsedTime() * 0.9);
      // Animate slight color shift on the material
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.color.setRGB(
        0.09 + pulse * 0.22,
        0.7 + 0.08 * pulse,
        0.92 + 0.02 * pulse
      );
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial attach="material" color={colorRef.current} linewidth={2} />
    </line>
  );
}

function PulseDot() {
  // Pulse at the peak of the normalized beat
  const x = 0.28;
  const y = 0.6;
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + 0.29 * Math.abs(Math.sin(clock.getElapsedTime() * 2.2));
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={meshRef} position={[x, y, 0.05]} castShadow>
      <sphereGeometry args={[0.034, 32, 32]} />
      <meshStandardMaterial color="#ff3245" emissive="#ff808a" emissiveIntensity={0.8} />
    </mesh>
  );
}

export default function Bio3DScene() {
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 128, minWidth: 320 }}>
      <Canvas
        camera={{ position: [0.35, 0.2, 2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[0.5, 1.2, 2]} intensity={0.18} />
        <HeartBeatLine />
        <PulseDot />
      </Canvas>
    </div>
  );
}
