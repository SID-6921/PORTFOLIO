
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Glowing pulse line
function PulseLine() {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 70; i++) {
      let x = i * 0.1 - 3.5;
      let y =
        Math.sin(i * 0.25) * 0.25 +
        (i > 10 && i < 14 ? 1 : 0) +
        (i > 22 && i < 26 ? 0.7 : 0) +
        (i > 44 && i < 49 ? 1.2 : 0) +
        (i > 60 ? 0.5 - (i - 60) * 0.09 : 0);
      points.push(new THREE.Vector3(x, y, 0));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160));
    const mat = new THREE.LineBasicMaterial({
      color: "#64DFC2",
      linewidth: 2,
    });
    // Line2 could be used for thick lines, but stick to basic Line here
    const lineObj = new THREE.Line(geo, mat);
    // For debugging
    // console.log("lineObj", lineObj, "geo", geo, "mat", mat);
    return lineObj;
  }, []);
  return <primitive object={line} />;
}

// Circuit node sphere
function CircuitNode({ pos = [0, 0, 0] }: { pos?: [number, number, number] }) {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#2176FF",
      emissive: new THREE.Color("#2176FF"),
      emissiveIntensity: 0.7,
    });
  }, []);
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

// Heartbeat pulse dot
function PulseDot() {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#FF7F51",
      emissive: new THREE.Color("#FFDF00"),
      emissiveIntensity: 0.9,
    });
  }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
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
      <primitive object={material} attach="material" />
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
        <ambientLight intensity={0.48} />
        <pointLight position={[0, 2, 8]} intensity={0.38} />
        <Suspense fallback={null}>
          <PulseLine />
          <CircuitNode pos={[-2.3, 1.01, 0.04]} />
          <CircuitNode pos={[0.8, 2.23, 0.04]} />
          <CircuitNode pos={[2.2, 1.1, 0.02]} />
          <CircuitNode pos={[1.3, -0.6, 0.01]} />
          <PulseDot />
        </Suspense>
      </Canvas>
    </div>
  );
}
