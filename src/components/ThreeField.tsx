import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore — example module
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import anime from "animejs";
import { lerp } from "../lib/core";

/** Reusable floating-geometry Three.js field (furniture-like constellation). */
export default function ThreeField({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf6f1e8, 26, 60);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
    camera.position.set(0, 0.8, 30);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.add(new THREE.AmbientLight(0xfff4e0, 0.7));
    const key = new THREE.DirectionalLight(0xffedd2, 1.4);
    key.position.set(7, 11, 9);
    scene.add(key);

    const group = new THREE.Group();
    scene.add(group);

    const mats = [
      new THREE.MeshStandardMaterial({ color: 0xefe6d3, roughness: 0.5, metalness: 0.08 }),
      new THREE.MeshStandardMaterial({ color: 0xb9c6b5, roughness: 0.65, metalness: 0.05 }),
      new THREE.MeshStandardMaterial({ color: 0xc39a4a, roughness: 0.2, metalness: 1 }),
      new THREE.MeshStandardMaterial({ color: 0x14402f, roughness: 0.45, metalness: 0.2 }),
    ];

    const geoFor = (kind: string, s: number): any => {
      switch (kind) {
        case "box":
          return new THREE.BoxGeometry(s, s * 0.78, s);
        case "cyl":
          return new THREE.CylinderGeometry(s * 0.48, s * 0.48, s * 1.15, 36);
        case "torus":
          return new THREE.TorusGeometry(s * 0.55, s * 0.19, 24, 72);
        default:
          return new THREE.IcosahedronGeometry(s * 0.62, 0);
      }
    };

    const defs: Array<[string, number, [number, number, number], number]> = [
      ["box", 0, [-8, 1.5, -4], 2.2],
      ["box", 2, [9, -2, -5], 1.6],
      ["cyl", 3, [-5, -3.4, -2], 1.2],
      ["icosa", 1, [6.4, 3, -3], 1.3],
      ["torus", 2, [0.6, 3.6, -7], 1.5],
      ["box", 1, [0, -3.6, -6], 1.4],
      ["cyl", 0, [11.5, 2.4, -9], 1.5],
      ["icosa", 2, [-11.8, -1.4, -8], 1.2],
    ];

    const meshes: any[] = defs.map(([kind, mi, pos, s], i) => {
      const mesh = new THREE.Mesh(geoFor(kind, s), mats[mi]);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.scale.setScalar(0.0001);
      mesh.userData = {
        by: pos[1],
        a: 0.4 + Math.random() * 0.5,
        s: 0.4 + Math.random() * 0.6,
        p: Math.random() * Math.PI * 2,
        rx: 0.05 + Math.random() * 0.1,
        ry: 0.06 + Math.random() * 0.12,
        i,
      };
      group.add(mesh);
      return mesh;
    });

    meshes.forEach((m) => {
      anime({
        targets: m.scale,
        x: 1,
        y: 1,
        z: 1,
        delay: 200 + m.userData.i * 90,
        duration: 1600,
        easing: "easeOutElastic(1, 0.65)",
      });
    });

    let raf = 0;
    let mx = 0;
    let smx = 0;
    let running = true;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const setSize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(host);

    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(host);

    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!running) return;
      const t = (performance.now() - t0) / 1000;
      smx = lerp(smx, mx, 0.04);
      group.rotation.y = t * 0.06 + smx * 0.25;
      for (const m of meshes) {
        const u = m.userData;
        m.position.y = u.by + Math.sin(t * u.s + u.p) * u.a;
        m.rotation.x = t * u.rx + u.p;
        m.rotation.y = t * u.ry + u.p * 0.5;
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      meshes.forEach((m) => m.geometry.dispose());
      mats.forEach((m) => m.dispose());
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" style={{ opacity }} />
    </div>
  );
}
