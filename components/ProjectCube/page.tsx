"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTranslation } from "../../hooks/useTranslation";

interface Project {
  title: string;
  text: string;
  imageUrl: string;
  technologies: string[];
  video?: string;
}

interface ProjectCubeProps {
  projects: Project[];
  onSelectProject: (index: number) => void;
  selectedIndex: number;
}

const ProjectCube = ({ projects, onSelectProject, selectedIndex }: ProjectCubeProps) => {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carouselRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);
  
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: -0.05, y: 0 });
  const targetRotationRef = useRef({ x: -0.05, y: 0 });
  const autoRotateRef = useRef(true);
  
  const [hasWebGL, setHasWebGL] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // WebGL check
    const testCanvas = document.createElement("canvas");
    const ctx = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!ctx) { setHasWebGL(false); return; }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    
    // Adjust camera distance based on number of projects
    const count = projects.length;
    const radius = Math.max(2.8, (count * 2.6) / (2 * Math.PI)); 
    const cameraZ = radius + 4.5;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZ);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight("#ffffff", 1.2));
    const dirLight = new THREE.DirectionalLight("#ffffff", 2.5);
    dirLight.position.set(0, 5, cameraZ);
    scene.add(dirLight);
    const redLight = new THREE.PointLight("#ef4444", 4, 20);
    redLight.position.set(0, -2, radius + 2);
    scene.add(redLight);

    // Carousel Group
    const carousel = new THREE.Group();
    carouselRef.current = carousel;
    scene.add(carousel);

    const loader = new THREE.TextureLoader();
    let loadedCount = 0;

    // Create planes for each project
    projects.forEach((proj, i) => {
      const angle = (i / count) * Math.PI * 2;
      const planeGeo = new THREE.PlaneGeometry(2.4, 2.4);
      
      const material = new THREE.MeshStandardMaterial({
        color: "#1a1a2e",
        roughness: 0.3,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(planeGeo, material);
      
      // Position in circle
      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.z = Math.cos(angle) * radius;
      mesh.rotation.y = angle;
      mesh.userData = { projectIndex: i };

      // Red border
      const edgesGeo = new THREE.EdgesGeometry(planeGeo);
      const edgesMat = new THREE.LineBasicMaterial({ color: "#ef4444", transparent: true, opacity: 0.6 });
      const border = new THREE.LineSegments(edgesGeo, edgesMat);
      mesh.add(border);

      carousel.add(mesh);

      // Load texture asynchronously
      if (proj.imageUrl) {
        loader.load(
          proj.imageUrl,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            material.color = new THREE.Color("#ffffff");
            material.needsUpdate = true;
            loadedCount++;
            if (loadedCount === count) setLoaded(true);
          },
          undefined,
          () => {
            loadedCount++;
            if (loadedCount === count) setLoaded(true);
          }
        );
      } else {
        loadedCount++;
        if (loadedCount === count) setLoaded(true);
      }
    });

    // Particle field
    const particleCount = 150;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 20;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: "#ef4444", size: 0.05, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Initial rotation
    const startAngle = -selectedIndex * (Math.PI * 2) / count;
    carousel.rotation.y = startAngle;
    rotationRef.current = { x: -0.05, y: startAngle };
    targetRotationRef.current = { x: -0.05, y: startAngle };

    // --- Mouse / Touch interaction ---
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
      mount.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - previousMouseRef.current.x;
      const dy = e.clientY - previousMouseRef.current.y;
      targetRotationRef.current.y += dx * 0.01;
      targetRotationRef.current.x += dy * 0.005;
      targetRotationRef.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationRef.current.x));
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onClick = (e: MouseEvent) => {
      if (!carouselRef.current || !rendererRef.current || !cameraRef.current) return;
      const rect = mount.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
      const hits = raycaster.intersectObjects(carouselRef.current.children, false);
      
      if (hits.length > 0) {
        // Find the closest plane
        const hit = hits[0].object;
        if (hit.userData.projectIndex !== undefined) {
          onSelectProject(hit.userData.projectIndex);
        }
      }
    };

    mount.addEventListener("pointerdown", onPointerDown);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerup", onPointerUp);
    mount.addEventListener("click", onClick);

    // Resize handler
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (autoRotateRef.current) {
        targetRotationRef.current.y += delta * 0.2; // slow auto rotation
      }

      // Smooth lerp
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;

      carousel.rotation.x = rotationRef.current.x;
      carousel.rotation.y = rotationRef.current.y;
      particles.rotation.y = elapsed * 0.04;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onPointerDown);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerup", onPointerUp);
      mount.removeEventListener("click", onClick);
      
      carousel.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) child.material.dispose();
        }
      });
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // Re-initialize only if projects array completely changes length (it won't)
    // We intentionally ignore changes to avoid reloading textures when language changes
    // The images don't have text on them. The text is in the HTML.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Snap to selected project face when selectedIndex changes
  useEffect(() => {
    if (!carouselRef.current) return;
    autoRotateRef.current = false;
    
    const count = projects.length;
    // Target Y rotation is negative to face the selected index
    const targetY = -(selectedIndex * (Math.PI * 2)) / count;
    
    // Normalize current rotation to take the shortest path
    const current = targetRotationRef.current.y;
    const turns = Math.round((current - targetY) / (Math.PI * 2));
    targetRotationRef.current.y = targetY + turns * Math.PI * 2;
    targetRotationRef.current.x = -0.05;
  }, [selectedIndex, projects.length]);

  if (!hasWebGL) {
    return (
      <div className="flex items-center justify-center h-[420px] w-full">
        <div className="h-64 w-64 animate-pulse rounded-2xl border border-red-400/40 bg-red-500/20 shadow-[0_0_80px_rgba(239,68,68,0.3)]" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[420px] md:h-[480px] cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      {/* Hint */}
      {loaded && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 dark:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 pointer-events-none whitespace-nowrap z-10">
          <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
          <span className="text-white/70 text-xs font-medium">
            {t.cube?.dragHintMobile || "Arrastra o haz click para explorar"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectCube;
