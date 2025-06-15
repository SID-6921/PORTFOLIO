
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HeartBeatLine() {
  // This produces a more angular, heart-beat style line (like ECG)
  const points: THREE.Vector3[] = [];
  // Classic heartbeat sequence (ECG spike)
  // You can tune these values for a more "heartbeat" look
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
  seq.forEach(p => points.push(new THREE.Vector3(p.x, p.y, 0)));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: "#2176FF", linewidth: 3 });

  return <primitive object={new THREE.Line(geometry, material)} />;
}

function PulseDot() {
  // Animate upward motion at the main ECG spike
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // dot "bounces" up and down at a main spike
    if (meshRef.current) {
      // sync dot to appear at ECG main peak, x: -2.2
      const baseY = 0.8;
      meshRef.current.position.x = -2.2 + Math.sin(t * 1.4) * 0.06;
      meshRef.current.position.y = baseY + Math.abs(Math.sin(t * 1.4)) * 0.14;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2.2, 0.8, 0.01]}>
      <sphereGeometry args={[0.13, 24, 24]} />
      <meshStandardMaterial>
        <color attach="color" args={["#FF7F51"]} />
      </meshStandardMaterial>
    </mesh>
  );
}

export default function Bio3DScene() {
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 70 }}>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.53} />
        <pointLight position={[0, 2, 8]} intensity={0.22} />
        <HeartBeatLine />
        <PulseDot />
      </Canvas>
    </div>
  );
}
