
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WobbleCell({
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
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      const t = clock.getElapsedTime() * speed;
      group.current.position.y = position[1] + Math.sin(t) * float;
      group.current.rotation.x = t * 0.2;
      group.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Outer membrane */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.1}
        >
          <color attach="color" args={[color]} />
        </meshStandardMaterial>
      </mesh>
      {/* Nucleus */}
      <mesh scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          roughness={0.5}
          metalness={0.1}
          emissiveIntensity={0.4}
        >
          <color attach="color" args={[color]} />
          <color attach="emissive" args={[color]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
}

function WiggleKnot({
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
      <torusKnotGeometry args={[0.7, 0.2, 128, 16]} />
      <meshStandardMaterial
        roughness={0.38}
        metalness={0.14}
      >
        <color attach="color" args={[color]} />
      </meshStandardMaterial>
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
        {/* Cells */}
        <WobbleCell color={pastelPalette[0]} position={[-5, 2.5, 0]} scale={1.55} speed={0.8} float={0.44} />
        <WobbleCell color={pastelPalette[1]} position={[2, -2.8, -1]} scale={1.2} speed={1.23} float={0.36} />
        <WobbleCell color={pastelPalette[2]} position={[6, 3, 0]} scale={1.34} speed={0.93} float={0.42} />
        {/* Knots */}
        <WiggleKnot color={pastelPalette[3]} position={[-2.7, -2, -2]} scale={1.1} speed={0.78} float={0.49} />
        <WiggleKnot color={pastelPalette[4]} position={[4.7, 0, -2]} scale={1.25} speed={1.15} float={0.37} />
      </Canvas>
    </div>
  );
}
