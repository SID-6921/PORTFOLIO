
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Helper: Generate a vertical column of animated "binary" digits.
function BinaryColumn({ startX = -9.5, count = 7, color = "#2176FF" }) {
  const group = useRef<THREE.Group>(null);

  // Animate slight up/down floating for whole binary group
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.25;
    }
  });

  // Alternate 1s and 0s for the column
  return (
    <group ref={group} position={[startX, 0, 0]}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <mesh key={i} position={[0, 2.4 * (i - count/2), 0]}>
            {/* Each bit as "1" or "0" with slightly randomized jitter */}
            <textGeometry args={[(i % 2 === 0 ? "1" : "0"), { size: 0.98, height: 0.12, font: undefined }]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
    </group>
  );
}

// The "flowing" binary -- 1s and 0s float in left-to-right
function AnimatedBinaryStream() {
  // Multiple binary columns with a horizontal drifting motion
  const columns = [0, 1, 2];
  return (
    <group>
      {columns.map((colIdx) => (
        <BinaryColumn
          key={colIdx}
          startX={-9.5 + colIdx * 1.7}
          count={6 + (colIdx % 2)}
          color="#2176FF"
        />
      ))}
    </group>
  );
}

// Heartbeat/EKG-like polyline
function HeartBeatLine() {
  const points: THREE.Vector3[] = [];
  // This starts after the binary part ends, approx x= -5 onward
  const scale = 1.7;
  const yOffset = -0.2;
  const seq = [
    { x: -5.7, y: 0 },
    { x: -4.1, y: 0 },
    { x: -3.8, y: 0.14 },
    { x: -3.7, y: -0.15 },
    { x: -3.5, y: 0.22 },
    { x: -3.3, y: 0 },
    { x: -2.0, y: 0 },
    { x: 0.1, y: 0.38 },
    { x: 0.40, y: -0.27 },
    { x: 0.7, y: 0 },
    { x: 2.2, y: 0 },
    { x: 2.4, y: 0.45 },
    { x: 2.6, y: -0.28 },
    { x: 2.8, y: 0 },
    { x: 3.7, y: 0 },
  ];
  seq.forEach(p =>
    points.push(
      new THREE.Vector3(p.x * scale, (p.y + yOffset) * scale, 0)
    )
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: "#2FC8A8" });

  // Optionally animate the line color (to draw the eye)
  useFrame(({ clock }) => {
    // color shift, fade in and out between blue and mint
    const pulse = 0.6 + 0.4 * Math.sin(clock.getElapsedTime() * 0.5);
    material.color.setRGB(0.13 + pulse * 0.5, 0.7, 1.1 - 0.2 * pulse);
  });

  return <primitive object={new THREE.Line(geometry, material)} />;
}

// A pulsing heart/material dot at the right end of the line
function PulseHeartDot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseX = 3.7 * 1.7;
  const baseY = (-0.0 - 0.2) * 1.7;
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Heart pulse scale
      const s = 1 + 0.20 * Math.abs(Math.sin(t * 2.2));
      meshRef.current.scale.set(s, s, s);
    }
  });
  // Optionally use a "heart" geometry or just a prominent sphere
  // Here, a big glowing sphere
  return (
    <mesh ref={meshRef} position={[baseX, baseY, 0.06]}>
      <sphereGeometry args={[0.53, 32, 32]} />
      <meshStandardMaterial emissive="#FF808A" color="#FF3245" emissiveIntensity={0.54} />
    </mesh>
  );
}

export default function Bio3DScene() {
  // Responsive design: adjust height, more horizontal span
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 128, minWidth: 330 }}>
      <Canvas
        camera={{ position: [0, 0, 19], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 6, 16]} intensity={0.32} />
        {/* Digital side */}
        <AnimatedBinaryStream />
        {/* ECG/biomedical line */}
        <HeartBeatLine />
        {/* Heart dot */}
        <PulseHeartDot />
      </Canvas>
    </div>
  );
}

