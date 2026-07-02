"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ThreeHero = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const testCanvas = document.createElement("canvas");
    const context =
      testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!context) {
      setHasWebGL(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    const originalConsoleError = console.error;
    try {
      console.error = (...args: Parameters<typeof console.error>) => {
        const [message] = args;
        if (
          typeof message === "string" &&
          message.includes("THREE.WebGLRenderer")
        ) {
          return;
        }
        originalConsoleError(...args);
      };
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    } catch {
      setHasWebGL(false);
      return;
    } finally {
      console.error = originalConsoleError;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const red = new THREE.Color("#ef4444");
    const white = new THREE.Color("#f8fafc");
    const graphite = new THREE.Color("#27272a");

    const core = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.35, 0.28, 180, 18),
      new THREE.MeshStandardMaterial({
        color: red,
        roughness: 0.28,
        metalness: 0.72,
        emissive: "#5f0f18",
        emissiveIntensity: 0.55,
      })
    );
    scene.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.55, 2),
      new THREE.MeshBasicMaterial({
        color: white,
        transparent: true,
        opacity: 0.16,
        wireframe: true,
      })
    );
    scene.add(wire);

    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index++) {
      const radius = 3.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: graphite,
        size: 0.035,
        transparent: true,
        opacity: 0.82,
      })
    );
    scene.add(particles);

    const lightOne = new THREE.PointLight("#ffffff", 2.4, 20);
    lightOne.position.set(3, 4, 5);
    scene.add(lightOne);

    const lightTwo = new THREE.PointLight("#ef4444", 2.8, 18);
    lightTwo.position.set(-3, -2, 4);
    scene.add(lightTwo);
    scene.add(new THREE.AmbientLight("#ffffff", 0.8));

    const pointer = new THREE.Vector2(0, 0);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    let frameId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      core.rotation.x = elapsed * 0.28 + pointer.y * 0.18;
      core.rotation.y = elapsed * 0.46 + pointer.x * 0.22;
      wire.rotation.y = -elapsed * 0.15;
      wire.rotation.z = elapsed * 0.08;
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", handlePointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", handlePointerMove);
      particlesGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      (core.geometry as THREE.BufferGeometry).dispose();
      (core.material as THREE.Material).dispose();
      (wire.geometry as THREE.BufferGeometry).dispose();
      (wire.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative h-[360px] w-full md:h-[560px]"
      aria-hidden="true"
    >
      {!hasWebGL && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-64 w-64 animate-pulse rounded-full border border-red-400/40 bg-red-500/20 shadow-[0_0_120px_rgba(239,68,68,0.45)] md:h-96 md:w-96" />
          <div className="absolute h-80 w-80 rotate-45 rounded-lg border border-white/15 md:h-[28rem] md:w-[28rem]" />
          <div className="absolute h-52 w-52 -rotate-12 rounded-lg border border-red-300/25 md:h-72 md:w-72" />
        </div>
      )}
    </div>
  );
};

export default ThreeHero;
