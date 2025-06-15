
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Heartbeat polyline (EKG spike)
function HeartBeatLine({ color = "#20B2AA" }) {
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
        [1, 0],
      ].map(([x, y]) => new THREE.Vector3(x, y, 0)),
    []
  );

  // Create geometry and material once and reuse
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(points);
    return geo;
  }, [points]);

  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color = new THREE.Color(color);
    }
  }, [color]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Animate color for subtle pulse effect
      const pulse = 0.6 + 0.4 * Math.sin(clock.getElapsedTime() * 0.9);
      materialRef.current.color.setRGB(
        0.09 + pulse * 0.22,
        0.7 + 0.08 * pulse,
        0.92 + 0.02 * pulse
      );
    }
  });

  return (
    <primitive
      object={new THREE.Line(geometry, new THREE.LineBasicMaterial())}
      key={color}
      renderOrder={1}
      dispose={null}
    >
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial ref={materialRef} attach="material" />
    </primitive>
  );
}

function PulseDot() {
  const x = 0.28;
  const y = 0.6;
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + 0.29 * Math.abs(Math.sin(clock.getElapsedTime() * 2.2));
      meshRef.current.scale.set(s, s, s);
    }
  });

  useEffect(() => {
    if (matRef.current) {
      matRef.current.color = new THREE.Color("#ff3245");
      matRef.current.emissive = new THREE.Color("#ff808a");
      matRef.current.emissiveIntensity = 0.8;
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[x, y, 0.05]} castShadow>
      <sphereGeometry args={[0.034, 32, 32]} attach="geometry" />
      <meshStandardMaterial ref={matRef} attach="material" />
    </mesh>
  );
}

export default function Bio3DScene() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: 128, minWidth: 320 }}
    >
      <Canvas camera={{ position: [0.35, 0.2, 2], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1} />
        <pointLight position={[0.5, 1.2, 2]} intensity={0.18} />
        <HeartBeatLine />
        <PulseDot />
      </Canvas>
    </div>
  );
}
