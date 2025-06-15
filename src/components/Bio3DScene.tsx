import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Helper: Generate a vertical column of animated "binary" digits using shapes
function BinaryColumn({ startX = -9.5, count = 7, color = "#2176FF" }) {
  const group = useRef<THREE.Group>(null);

  // Memoize materials to avoid recreating on each render
  const boxMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color }), [color]);
  const sphereMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color }), [color]);
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.5, 32, 32), []);

  // Animate slight up/down floating for whole binary group
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.25;
    }
  });

  return (
    <group ref={group} position={[startX, 0, 0]}>
      {Array(count)
        .fill(0)
        .map((_, i) => {
          const isOne = i % 2 === 0;
          return (
            <mesh
              key={i}
              position={[0, 2.4 * (i - count / 2), 0]}
              scale={isOne ? [0.6, 1.4, 0.6] : [0.6, 0.6, 0.6]}
              castShadow
              receiveShadow
            >
              {isOne ? (
                <>
                  <primitive object={boxGeometry} />
                  <primitive object={boxMaterial} />
                </>
              ) : (
                <>
                  <primitive object={sphereGeometry} />
                  <primitive object={sphereMaterial} />
                </>
              )}
            </mesh>
          );
        })}
    </group>
  );
}

// The "flowing" binary -- 1s and 0s float left-to-right
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
    { x: 0.4, y: -0.27 },
    { x: 0.7, y: 0 },
    { x: 2.2, y: 0 },
    { x: 2.4, y: 0.45 },
    { x: 2.6, y: -0.28 },
    { x: 2.8, y: 0 },
    { x: 3.7, y: 0 },
  ];
  const points = useMemo(
    () =>
      seq.map((p) => new THREE.Vector3(p.x * scale, (p.y + yOffset) * scale, 0)),
    []
  );

  // Memoize geometry and material for the line
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(points);
    return geo;
  }, [points]);

  const material = useMemo(() => new THREE.LineBasicMaterial({ color: 0x2FC8A8 }), []);

  const lineRef = useRef<THREE.Line>(null);

  // Animate the color of the line to draw attention
  useFrame(({ clock }) => {
    if (
      lineRef.current &&
      lineRef.current.material &&
      (lineRef.current.material as THREE.LineBasicMaterial).color
    ) {
      const pulse = 0.6 + 0.4 * Math.sin(clock.getElapsedTime() * 0.5);
      (lineRef.current.material as THREE.LineBasicMaterial).color.setRGB(
        0.13 + pulse * 0.5,
        0.7,
        1.1 - 0.2 * pulse
      );
    }
  });

  return (
    <line ref={lineRef}>
      <primitive object={geometry} />
      <primitive object={material} />
    </line>
  );
}

// A pulsing heart/dot at the right end of the line
function PulseHeartDot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseX = 3.7 * 1.7;
  const baseY = (-0.0 - 0.2) * 1.7;

  // Memoize geometry/material for the heart dot
  const geometry = useMemo(() => new THREE.SphereGeometry(0.53, 32, 32), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xff3245,
        emissive: 0xff808a,
        emissiveIntensity: 0.54,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Heart pulse scale
      const s = 1 + 0.2 * Math.abs(Math.sin(t * 2.2));
      meshRef.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={meshRef} position={[baseX, baseY, 0.06]}>
      <primitive object={geometry} />
      <primitive object={material} />
    </mesh>
  );
}

export default function Bio3DScene() {
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 128, minWidth: 330 }}>
      <Canvas
        camera={{ position: [0, 0, 19], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 6, 16]} intensity={0.32} />
        {/* Digital code on the left */}
        <AnimatedBinaryStream />
        {/* ECG/biomedical line */}
        <HeartBeatLine />
        {/* Heart dot */}
        <PulseHeartDot />
      </Canvas>
    </div>
  );
}
