"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

interface UniverseCanvasProps {
  scrollProgress: number; // 0 to 1
}

// ─────────────────────────────────────────────────────
// Camera Controller: moves along a 3D spline path
// ─────────────────────────────────────────────────────
function CameraController({ scrollProgress, lowPerf }: { scrollProgress: number; lowPerf: boolean }) {
  const { camera } = useThree();
  const LERP = lowPerf ? 0.18 : 0.07;

  const cameraPath = [
    { pos: [0, 0, 12], look: [0, 0, 0] },          // 0: Gateway
    { pos: [-3.5, 1.8, 6], look: [-1, 0, 0] },      // 1: Origin
    { pos: [0, 0, -2], look: [0, 0, -10] },          // 2: Corridor
    { pos: [3, -1.5, -12], look: [1.2, -0.5, -16] },// 3: Museum
    { pos: [-4, -2.5, -24], look: [-2, -1.8, -28] },// 4: Workshop
    { pos: [0, 3.5, -36], look: [0, 0, -40] },       // 5: Library
    { pos: [3.5, 1, -48], look: [1.5, 0.5, -52] },   // 6: Archive
    { pos: [0, 1.5, -60], look: [0, 3, -68] },       // 7: Observatory
    { pos: [0, 0, -78], look: [0, 0, -84] },         // 8: Portal
  ] as const;

  useFrame(() => {
    const t = scrollProgress * 8;
    const lowerIdx = Math.min(7, Math.floor(t));
    const upperIdx = Math.min(8, lowerIdx + 1);
    const ratio = t - lowerIdx;

    const p1 = cameraPath[lowerIdx];
    const p2 = cameraPath[upperIdx];

    const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    const er = ease(ratio);

    const targetPos = new THREE.Vector3(
      p1.pos[0] + (p2.pos[0] - p1.pos[0]) * er,
      p1.pos[1] + (p2.pos[1] - p1.pos[1]) * er,
      p1.pos[2] + (p2.pos[2] - p1.pos[2]) * er
    );

    const targetLook = new THREE.Vector3(
      p1.look[0] + (p2.look[0] - p1.look[0]) * er,
      p1.look[1] + (p2.look[1] - p1.look[1]) * er,
      p1.look[2] + (p2.look[2] - p1.look[2]) * er
    );

    camera.position.lerp(targetPos, LERP);

    const tempMatrix = new THREE.Matrix4();
    tempMatrix.lookAt(camera.position, targetLook, new THREE.Vector3(0, 1, 0));
    const targetRotation = new THREE.Quaternion().setFromRotationMatrix(tempMatrix);
    camera.quaternion.slerp(targetRotation, LERP);
  });

  return null;
}

// ─────────────────────────────────────────────────────
// Starfield
// ─────────────────────────────────────────────────────
function Starfield({ lowPerf }: { lowPerf: boolean }) {
  const starsRef = useRef<THREE.Points>(null);
  const starCount = lowPerf ? 700 : 2200;

  const starPositions = useMemo(() => {
    const arr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 25 + Math.random() * 80;
      arr[i * 3]     = dist * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = 20 - Math.random() * 130;
    }
    return arr;
  }, [starCount]);

  // Generate varying star sizes for depth
  const starSizes = useMemo(() => {
    const arr = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      arr[i] = Math.random() * 0.04 + 0.01;
    }
    return arr;
  }, [starCount]);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.018;
      starsRef.current.rotation.z = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#e8d9be"
        size={lowPerf ? 0.04 : 0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────
// Nebula Glow Clouds (large soft spheres with additive blending)
// ─────────────────────────────────────────────────────
function NebulaClouds() {
  const clouds = useMemo(() => [
    { pos: [-8, 4, -5] as const, color: "#3d2a1a", scale: 12 },
    { pos: [10, -3, -18] as const, color: "#1a2a1a", scale: 14 },
    { pos: [-5, -6, -32] as const, color: "#2a1a0e", scale: 18 },
    { pos: [6, 5, -50] as const, color: "#0e1a2a", scale: 16 },
    { pos: [0, 0, -70] as const, color: "#2a1a1a", scale: 22 },
  ], []);

  return (
    <>
      {clouds.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <sphereGeometry args={[c.scale, 8, 8]} />
          <meshBasicMaterial
            color={c.color}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────
// Corridor: Rotating torus arches
// ─────────────────────────────────────────────────────
function CorridorArches() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z = state.clock.getElapsedTime() * 0.04 * (i % 2 === 0 ? 1 : -1) + i * 0.8;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
        <mesh key={idx} position={[0, 0, -idx * 3]}>
          <torusGeometry args={[2.8, 0.018, 6, 36]} />
          <meshBasicMaterial
            color={idx % 3 === 0 ? "#c5a880" : idx % 3 === 1 ? "#8a7152" : "#3d2a12"}
            wireframe
            transparent
            opacity={0.18 - idx * 0.01}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────
// Museum: Floating glass exhibit slabs
// ─────────────────────────────────────────────────────
function MuseumExhibits() {
  const slab1 = useRef<THREE.Mesh>(null);
  const slab2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (slab1.current) {
      slab1.current.position.y = -1.5 + Math.sin(t * 0.8) * 0.18;
      slab1.current.rotation.y = t * 0.18;
    }
    if (slab2.current) {
      slab2.current.position.y = -1.2 + Math.cos(t * 0.65) * 0.14;
      slab2.current.rotation.x = t * 0.12;
      slab2.current.rotation.y = t * 0.09;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      <mesh ref={slab1} position={[2.5, -1.5, -2]}>
        <boxGeometry args={[1.6, 2.4, 0.08]} />
        <meshPhysicalMaterial transparent opacity={0.08} roughness={0.05} transmission={0.92} thickness={0.4} color="#c5a880" clearcoat={1} />
      </mesh>
      <mesh ref={slab2} position={[4.2, -1.2, -7]}>
        <boxGeometry args={[1.7, 2.2, 0.12]} />
        <meshPhysicalMaterial transparent opacity={0.07} roughness={0.1} transmission={0.88} thickness={0.5} color="#8a7152" clearcoat={0.9} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────
// Library: Circular bookshelf
// ─────────────────────────────────────────────────────
function LibraryShelf() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, -40]}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 4;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, (i * 0.15) - 0.8, Math.sin(angle) * r]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[1.1, 0.08, 0.35]} />
            <meshBasicMaterial color="#8a7152" transparent opacity={0.1} wireframe />
          </mesh>
        );
      })}
    </group>
  );
}

// ─────────────────────────────────────────────────────
// Observatory: Constellation map
// ─────────────────────────────────────────────────────
function Observatory() {
  const STARS = [
    { pos: [-1.5, 2.5, 0] as const, r: 0.13, c: "#c5a880" },
    { pos: [0, 3.5, 0] as const, r: 0.17, c: "#f3e5ab" },
    { pos: [1.8, 2.8, -1] as const, r: 0.11, c: "#c5a880" },
    { pos: [0.5, 1.5, 0.5] as const, r: 0.09, c: "#8a7152" },
    { pos: [-0.5, 4.0, -0.5] as const, r: 0.08, c: "#e2cbb0" },
  ];

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRefs.current.forEach((m, i) => {
      if (m) {
        m.position.y = STARS[i].pos[1] + Math.sin(t * 0.5 + i * 1.2) * 0.08;
        const s = 1 + Math.sin(t * 1.5 + i) * 0.15;
        m.scale.set(s, s, s);
      }
    });
  });

  return (
    <group position={[0, 1.5, -68]}>
      {STARS.map((s, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} position={s.pos}>
          <sphereGeometry args={[s.r, 16, 16]} />
          <meshBasicMaterial color={s.c} />
        </mesh>
      ))}
      <Line
        points={STARS.map((s) => s.pos)}
        color="#c5a880"
        lineWidth={0.6}
        transparent
        opacity={0.15}
      />
    </group>
  );
}

// ─────────────────────────────────────────────────────
// Portal: Animated singularity ring
// ─────────────────────────────────────────────────────
function Portal() {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.z = -t * 0.7;
      const s = 1 + Math.sin(t * 2.5) * 0.07;
      torusRef.current.scale.set(s, s, 1);
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group position={[0, 0, -84]}>
      {/* Outer ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3.2, 0.35, 16, 72]} />
        <meshBasicMaterial color="#c5a880" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Middle ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[2.0, 0.12, 8, 48]} />
        <meshBasicMaterial color="#8a7152" transparent opacity={0.1} />
      </mesh>
      {/* Dark singularity fill */}
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[3.0, 64]} />
        <meshBasicMaterial color="#020202" transparent opacity={0.97} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────
// Main Canvas
// ─────────────────────────────────────────────────────
export default function UniverseCanvas({ scrollProgress }: UniverseCanvasProps) {
  const [lowPerf, setLowPerf] = useState(false);

  useEffect(() => {
    const handle = (e: Event) => {
      if ((e as CustomEvent).detail?.low) setLowPerf(true);
    };
    window.addEventListener("low-performance-mode", handle);
    return () => window.removeEventListener("low-performance-mode", handle);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0" style={{ background: "#070707" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 44, near: 0.1, far: 180 }}
        gl={{
          antialias: !lowPerf,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={lowPerf ? 1 : [1, 1.5]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 10, 5]} intensity={0.3} color="#f3e5ab" />
        <pointLight position={[0, 0, -8]} intensity={1.0} color="#c5a880" distance={18} decay={2} />
        <pointLight position={[0, 0, -84]} intensity={1.5} color="#c5a880" distance={20} decay={2} />

        <CameraController scrollProgress={scrollProgress} lowPerf={lowPerf} />
        <Starfield lowPerf={lowPerf} />
        {!lowPerf && <NebulaClouds />}
        <CorridorArches />
        <MuseumExhibits />
        <LibraryShelf />
        <Observatory />
        <Portal />
      </Canvas>
    </div>
  );
}
