
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DNAHelix({
  color,
  position,
  scale = 1,
  speed = 1,
  float = 0.2,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
  float?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    class HelixCurve extends THREE.Curve<THREE.Vector3> {
      getPoint(t: number) {
        const angle = t * Math.PI * 8;
        const y = t * 4 - 2;
        const x = Math.cos(angle) * 0.7;
        const z = Math.sin(angle) * 0.7;
        return new THREE.Vector3(x, y, z);
      }
    }
    return new HelixCurve();
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      const t = clock.getElapsedTime() * speed;
      group.current.rotation.z = t * 0.2;
      group.current.rotation.x = t * 0.1;
      group.current.position.y = position[1] + Math.sin(t * 0.8) * float;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.15, 8, false]} />
        <meshStandardMaterial
          args={[
            {
              color,
              roughness: 0.4,
              metalness: 0.1,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </mesh>
    </group>
  );
}

function BioCell({
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
      {/* Cell membrane */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          args={[{
            color,
            transparent: true,
            opacity: 0.4,
            roughness: 0.2,
            metalness: 0.1,
          }]}
        />
      </mesh>
      {/* Nucleus */}
      <mesh scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          args={[{
            color,
            roughness: 0.5,
            metalness: 0.1,
            emissive: color,
            emissiveIntensity: 0.4,
          }]}
        />
      </mesh>
    </group>
  );
}

function Molecule({
  color,
  position,
  scale = 1,
  speed = 1,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      const t = clock.getElapsedTime() * speed;
      group.current.rotation.x = t * 0.3;
      group.current.rotation.y = t * 0.2;
      group.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Central atom */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          args={[{
            color,
            metalness: 0.2,
            roughness: 0.3,
          }]}
        />
      </mesh>
      {/* Electron shells */}
      <mesh>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshStandardMaterial
          args={[{
            color,
            transparent: true,
            opacity: 0.6,
          }]}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 8, 32]} />
        <meshStandardMaterial
          args={[{
            color,
            transparent: true,
            opacity: 0.4,
          }]}
        />
      </mesh>
    </group>
  );
}

function ProteinChain({
  color,
  position,
  scale = 1,
  speed = 1,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime() * speed;
      mesh.current.rotation.y = t;
      mesh.current.rotation.x = t * 0.3;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusKnotGeometry args={[0.7, 0.2, 128, 16]} />
      <meshStandardMaterial
        args={[{
          color,
          roughness: 0.38,
          metalness: 0.14,
        }]}
      />
    </mesh>
  );
}

const biomedPalette = [
  "#4FC3F7", // light blue - oxygen
  "#81C784", // light green - carbon
  "#FFB74D", // light orange - phosphorus
  "#F06292", // light pink - nitrogen
  "#BA68C8", // light purple - proteins
  "#64B5F6", // sky blue - water
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
        opacity: 0.6,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.92} />
        <directionalLight
          position={[5, 3, 9]}
          intensity={0.18}
          color="#fff8ed"
        />
        
        {/* DNA Helixes */}
        <DNAHelix color={biomedPalette[0]} position={[-6, 1, -3]} scale={0.8} speed={0.5} float={0.3} />
        <DNAHelix color={biomedPalette[1]} position={[7, -1, -4]} scale={0.7} speed={0.7} float={0.2} />
        
        {/* Bio Cells */}
        <BioCell color={biomedPalette[2]} position={[-4, 3, 0]} scale={1.2} speed={0.8} float={0.4} />
        <BioCell color={biomedPalette[3]} position={[3, -3, -1]} scale={1.0} speed={1.2} float={0.3} />
        <BioCell color={biomedPalette[4]} position={[6, 2, 0]} scale={1.1} speed={0.9} float={0.35} />
        
        {/* Molecules */}
        <Molecule color={biomedPalette[5]} position={[-2, -2, -2]} scale={1.3} speed={0.7} />
        <Molecule color={biomedPalette[0]} position={[5, 0, -3]} scale={1.1} speed={1.1} />
        
        {/* Protein Chains */}
        <ProteinChain color={biomedPalette[1]} position={[-7, -1, -5]} scale={0.9} speed={0.6} />
        <ProteinChain color={biomedPalette[4]} position={[8, 1, -6]} scale={0.8} speed={0.8} />
      </Canvas>
    </div>
  );
}
