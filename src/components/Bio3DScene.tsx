
import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Minimal glowing pulse + circuit combo
function PulseLine() {
  // Draw a wavy line resembling both EKG and digital trace
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 70; i++) {
    // Mix sine for heartbeat, step for "circuit trace"
    let x = i * 0.1 - 3.5;
    let y =
      Math.sin(i * 0.25) * 0.25 +
      (i > 10 && i < 14 ? 1 : 0) + // "EKG spike"
      (i > 22 && i < 26 ? 0.7 : 0) +
      (i > 44 && i < 49 ? 1.2 : 0) +
      (i > 60 ? 0.5 - (i - 60) * 0.09 : 0); // Curve end down
    points.push(new THREE.Vector3(x, y, 0));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160));
  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial
        attach="material"
        color="#64DFC2"
        linewidth={2}
      />
    </line>
  );
}

// Glowing circuits "chips" - minimalist
function CircuitNode({ pos = [0,0,0] }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshStandardMaterial 
        color="#2176FF" 
        emissive="#2176FF"
        emissiveIntensity={0.7}
        />
    </mesh>
  );
}

// "Heartbeat" orb following the line
function PulseDot() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Follow the main pulse at a time-varying position
    const i = 20 + Math.sin(t * 1.5) * 22;
    let x = i * 0.1 - 3.5;
    let y =
      Math.sin(i * 0.25) * 0.25 +
      (i > 10 && i < 14 ? 1 : 0) +
      (i > 22 && i < 26 ? 0.7 : 0) +
      (i > 44 && i < 49 ? 1.2 : 0) +
      (i > 60 ? 0.5 - (i - 60) * 0.09 : 0);
    if (ref.current) {
      ref.current.position.set(x, y, 0.01);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 20, 20]} />
      <meshStandardMaterial
        color="#FF7F51"
        emissive="#FFDF00"
        emissiveIntensity={0.9}
      />
    </mesh>
  );
}

export default function Bio3DScene() {
  // Responsive height for both mobile & desktop
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 70 }}>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.48} />
        <pointLight position={[0, 2, 8]} intensity={0.38} />
        <Suspense fallback={null}>
          <PulseLine />
          {/* Blend some circuit "node" dots at bends */}
          <CircuitNode pos={[-2.3, 1.01, 0.04]} />
          <CircuitNode pos={[0.8, 2.23, 0.04]} />
          <CircuitNode pos={[2.2, 1.1, 0.02]} />
          <CircuitNode pos={[1.3, -0.6, 0.01]} />
          {/* Heartbeat/pulse orb */}
          <PulseDot />
        </Suspense>
      </Canvas>
    </div>
  );
}
