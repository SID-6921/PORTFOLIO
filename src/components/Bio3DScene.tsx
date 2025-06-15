
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HeartBeatLine() {
  // Heartbeat ECG line, now larger and thicker for prominence
  const points: THREE.Vector3[] = [];
  const scale = 1.8; // Increased scale for all points
  const yOffset = -0.3; // Lower baseline so it appears centered vertically

  const seq = [
    { x: -3.8, y: 0 },
    { x: -3.3, y: 0 },
    { x: -2.8, y: 0.3 },
    { x: -2.6, y: -0.22 },
    { x: -2.2, y: 0.8 },
    { x: -2.15, y: -0.3 },
    { x: -2.0, y: 0 },
    { x: -1.0, y: 0 },
    { x: 0.0, y: 0 },
    { x: 0.3, y: 0.25 },
    { x: 0.6, y: -0.2 },
    { x: 0.9, y: 0 },
    { x: 1.8, y: 0 },
    { x: 2.2, y: 0.42 },
    { x: 2.5, y: -0.3 },
    { x: 2.7, y: 0.1 },
    { x: 3.0, y: 0 },
    { x: 3.3, y: 0 },
    { x: 3.8, y: 0 }
  ];

  seq.forEach(p =>
    points.push(
      new THREE.Vector3(p.x * scale, (p.y + yOffset) * scale, 0)
    )
  );
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // Use a much thicker line (but note: actual thickness support depends on renderer)
  const material = new THREE.LineBasicMaterial({ color: "#2176FF" });

  return (
    <primitive object={new THREE.Line(geometry, material)} />
  );
}

function PulseDot() {
  // Larger, more dramatic motion for the pulse dot
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = 1.8;
  const baseX = -2.2 * scale;
  const baseY = (0.8 - 0.3) * scale; // Apply yOffset
  const amplitude = 0.3 * scale; // Larger vertical movement

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = baseX + Math.sin(t * 1.4) * 0.11 * scale;
      meshRef.current.position.y = baseY + Math.abs(Math.sin(t * 1.4)) * amplitude;
    }
  });

  return (
    <mesh ref={meshRef} position={[baseX, baseY, 0.01]}>
      <sphereGeometry args={[0.28 * scale, 32, 32]} />
      <meshStandardMaterial>
        <color attach="color" args={["#FF7F51"]} />
      </meshStandardMaterial>
    </mesh>
  );
}

export default function Bio3DScene() {
  // Increased height, more vertical center, and padding for clarity
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 110 }}>
      <Canvas
        camera={{ position: [0, 0, 22], fov: 43 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.67} />
        <pointLight position={[0, 8, 17]} intensity={0.35} />
        <HeartBeatLine />
        <PulseDot />
      </Canvas>
    </div>
  );
}
