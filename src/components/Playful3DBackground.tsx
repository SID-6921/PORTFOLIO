import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WobbleSphere({
  color,
  position,
  scale = 1,
  speed = 1,
  float = 0.3,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
  float?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime() * speed;
      mesh.current.position.y = position[1] + Math.sin(t) * float;
      mesh.current.rotation.x = t * 0.5;
      mesh.current.rotation.y = t * 0.4;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.18} />
    </mesh>
  );
}

function WiggleCube({
  color,
  position,
  scale = 1,
  speed = 1,
  float = 0.3,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
  float?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime() * speed;
      mesh.current.position.x = position[0] + Math.cos(t) * float;
      mesh.current.rotation.y = t;
      mesh.current.rotation.x = t * 0.3;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.38} metalness={0.14} />
    </mesh>
  );
}

/**
 * Pastel playful backplane for "toddler/kid" vibe
 * Appears fixed and blurred behind all content, never blocks interactions
 */
const pastelPalette = [
  "#B6E3FA", // soft blue
  "#FFD6E0", // soft pink
  "#FFF7AE", // soft yellow
  "#B2F9CC", // soft green
  "#FAB6EB", // soft purple/pink
];

export default function Playful3DBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
        filter: "blur(0.5px) brightness(1.03)",
        opacity: 0.5, // subtle!
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Soft ambient lighting */}
        <ambientLight intensity={0.92} />
        <directionalLight
          position={[5, 3, 9]}
          intensity={0.18}
          color="#fff8ed"
        />
        {/* Spheres (bubbles/balls) */}
        <WobbleSphere color={pastelPalette[0]} position={[-5, 2.5, 0]} scale={1.55} speed={0.8} float={0.44} />
        <WobbleSphere color={pastelPalette[1]} position={[2, -2.8, -1]} scale={1.2} speed={1.23} float={0.36} />
        <WobbleSphere color={pastelPalette[2]} position={[6, 3, 0]} scale={1.34} speed={0.93} float={0.42} />
        {/* Cubes */}
        <WiggleCube color={pastelPalette[3]} position={[-2.7, -2, -2]} scale={1.1} speed={0.78} float={0.49} />
        <WiggleCube color={pastelPalette[4]} position={[4.7, 0, -2]} scale={1.25} speed={1.15} float={0.37} />
      </Canvas>
    </div>
  );
}
