
import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function BioLine() {
  // Simple pulse line: sin curve
  const points = [];
  for (let i = 0; i <= 70; i++) {
    let x = i * 0.11 - 3.8;
    let y = Math.sin(i * 0.23) * 0.34;
    points.push(new THREE.Vector3(x, y, 0));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(140));
  const material = new THREE.LineBasicMaterial({ color: "#2176FF", linewidth: 3 });
  return <primitive object={new THREE.Line(geometry, material)} />;
}

function PulseDot() {
  // Pulse dot in the middle
  return (
    <mesh position={[0.1, 0, 0.01]}>
      <sphereGeometry args={[0.15, 24, 24]} />
      <meshStandardMaterial color="#FF7F51" emissive="#FFDF00" emissiveIntensity={0.8} />
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
        <ambientLight intensity={0.58} />
        <pointLight position={[0, 2, 8]} intensity={0.28} />
        <BioLine />
        <PulseDot />
      </Canvas>
    </div>
  );
}
