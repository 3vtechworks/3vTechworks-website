import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 3. Particle Constellation Theme Configuration
    const particleCount = 850;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(isDark ? '#00e5ff' : '#00b4d8');
    const blueColor = new THREE.Color('#0077b6');
    const contrastColor = new THREE.Color(isDark ? '#0b1a30' : '#023e8a');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 160;

      const mixedColor = cyanColor.clone().lerp(
        Math.random() > 0.5 ? blueColor : contrastColor,
        Math.random()
      );
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isDark ? 1.9 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Central 3D Cyber Core (Geometric Holographic Wireframe)
    const geoOuter = new THREE.IcosahedronGeometry(22, 1);
    const matOuter = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00b4d8 : 0x0077b6,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.35,
    });
    const outerMesh = new THREE.Mesh(geoOuter, matOuter);
    scene.add(outerMesh);

    const geoInner = new THREE.OctahedronGeometry(14, 2);
    const matInner = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00e5ff : 0x00b4d8,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.4 : 0.55,
    });
    const innerMesh = new THREE.Mesh(geoInner, matInner);
    scene.add(innerMesh);

    // Responsive Mesh Scaling & Positioning (Avoid clutter on mobile screens)
    const updateResponsiveMesh = () => {
      const isMobile = window.innerWidth < 768;
      const scale = isMobile ? 0.48 : 1.0;
      outerMesh.scale.set(scale, scale, scale);
      innerMesh.scale.set(scale, scale, scale);

      if (isMobile) {
        // Move wireframe up and back so it gracefully frames the header without colliding with cards
        outerMesh.position.set(0, 28, -15);
        innerMesh.position.set(0, 28, -15);
        matOuter.opacity = isDark ? 0.12 : 0.15;
        matInner.opacity = isDark ? 0.16 : 0.20;
      } else {
        outerMesh.position.set(0, 0, 0);
        innerMesh.position.set(0, 0, 0);
        matOuter.opacity = isDark ? 0.25 : 0.35;
        matInner.opacity = isDark ? 0.4 : 0.55;
      }
    };
    updateResponsiveMesh();

    // Dynamic point lights
    const lightCyan = new THREE.PointLight(isDark ? 0x00e5ff : 0x00b4d8, isDark ? 2 : 1.5, 100);
    lightCyan.position.set(20, 20, 30);
    scene.add(lightCyan);

    const lightNavy = new THREE.PointLight(0x0077b6, isDark ? 3 : 2, 120);
    lightNavy.position.set(-30, -20, 20);
    scene.add(lightNavy);

    // 5. Mouse Parallax Reaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.04;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Smooth Scroll Synchronization
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateResponsiveMesh();
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards mouse position
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.08;

      camera.position.x = targetX;
      camera.position.y = -targetY - scrollY * 0.025;
      camera.lookAt(0, -scrollY * 0.025, 0);

      // Continuous & scroll-reactive Rotations
      particles.rotation.y += 0.0006 + scrollY * 0.000002;
      particles.rotation.x += 0.0003;

      outerMesh.rotation.x += 0.002;
      outerMesh.rotation.y += 0.003 + scrollY * 0.00001;

      innerMesh.rotation.x -= 0.004;
      innerMesh.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      geoOuter.dispose();
      matOuter.dispose();
      geoInner.dispose();
      matInner.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return <div ref={mountRef} className="three-canvas-container" />;
};

export default ThreeBackground;
