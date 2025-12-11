'use client';

import { useEffect, useRef } from 'react';

/**
 * Aurora Effect Component - Optimized Canvas-Based Animation
 *
 * Features:
 * - IntersectionObserver for performance (pauses when off-screen)
 * - Transparent background (section colors show through)
 * - Randomized start times (desync for multiple instances)
 * - Mouse interaction and parallax scrolling
 * - Hardcoded pink highlights with customizable main color
 */

interface AuroraProps {
  /** The dominant color of the blobs (matches your section color) */
  mainColor?: string;
  /** Transparency of the blobs (0.0 - 1.0) */
  opacity?: number;
  /** Optional className for styling */
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  baseRadius: number;
  currentRadius: number;
  wanderRange: number;
  phaseX: number;
  phaseY: number;
  phaseR: number;
  speedX: number;
  speedY: number;
  speedR: number;
}

interface Layer {
  nodes: Node[];
  tether: number;
}

export function Aurora({
  mainColor = '#ef4444',
  opacity = 0.7,
  className = ''
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for state
  const mouse = useRef({ x: -1000, y: -1000, isActive: false });
  const scroll = useRef(0);
  const requestRef = useRef<number | undefined>(undefined);
  const isVisible = useRef(false); // Optimization: Track if on screen
  const timeOffset = useRef(Math.random() * 10000); // DESYNC: Random start time

  // CONSTANTS
  const HIGHLIGHT_COLOR = '#db2777'; // Pink must always stay pink

  // PHYSICS CONFIG
  const TETHER_STRENGTH = { deep: 0.015, main: 0.005, highlight: 0.003 };
  const MOUSE_REACTION_RANGE = 500;
  const MOUSE_FORCE = 0.6;
  const SPEED_SCALE = 0.15;

  const createNodes = (count: number, color: string, radiusBase: number, wanderRange: number, speedMod: number = 1): Node[] => {
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: 0, y: 0, vx: 0, vy: 0,
        color: color,
        baseRadius: radiusBase + Math.random() * 40,
        currentRadius: radiusBase,
        wanderRange: wanderRange,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseR: Math.random() * Math.PI * 2,
        speedX: (0.001 + Math.random() * 0.002) * SPEED_SCALE * speedMod,
        speedY: (0.001 + Math.random() * 0.002) * SPEED_SCALE * speedMod,
        speedR: (0.002 + Math.random() * 0.003) * SPEED_SCALE
      });
    }
    return nodes;
  };

  // Initialize layers based on the passed 'mainColor' prop
  const layers = useRef<Layer[]>([
    // 1. Deep Core (same as main color, relies on opacity for depth)
    { nodes: createNodes(4, mainColor, 90, 60, 0.8), tether: TETHER_STRENGTH.deep },
    // 2. Main Body (The requested Main Color)
    { nodes: createNodes(6, mainColor, 110, 180, 1.0), tether: TETHER_STRENGTH.main },
    // 3. Highlights (ALWAYS PINK)
    { nodes: createNodes(5, HIGHLIGHT_COLOR, 85, 240, 1.2), tether: TETHER_STRENGTH.highlight }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;

    // --- OPTIMIZATION: Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
          }
          requestRef.current = requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);

    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.isActive = true;
    };

    const handleScroll = () => {
      scroll.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleResize();

    const updateNode = (node: Node, time: number, tetherStrength: number, centerX: number, centerY: number) => {
      // 1. Organic Wandering
      const offsetX = Math.sin(time * node.speedX + node.phaseX) * node.wanderRange;
      const offsetY = Math.cos(time * node.speedY + node.phaseY) * (node.wanderRange * 0.8);

      const targetX = centerX + offsetX;
      const targetY = centerY + offsetY;

      // Breathing Radius
      node.currentRadius = node.baseRadius + Math.sin(time * node.speedR + node.phaseR) * 20;

      // Tether Force
      const dxTarget = targetX - node.x;
      const dyTarget = targetY - node.y;
      node.vx += dxTarget * tetherStrength;
      node.vy += dyTarget * tetherStrength;

      // 2. Mouse Interaction
      const dxMouse = mouse.current.x - node.x;
      const dyMouse = mouse.current.y - node.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < MOUSE_REACTION_RANGE) {
        const force = (MOUSE_REACTION_RANGE - distMouse) / MOUSE_REACTION_RANGE;
        const repulsionX = -(dxMouse / distMouse) * force * MOUSE_FORCE;
        const repulsionY = -(dyMouse / distMouse) * force * MOUSE_FORCE;
        node.vx += repulsionX;
        node.vy += repulsionY;
      }

      // 3. Physics Steps
      node.vx *= 0.96;
      node.vy *= 0.96;
      node.x += node.vx;
      node.y += node.vy;
    };

    const drawNode = (node: Node) => {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.currentRadius
      );

      gradient.addColorStop(0, node.color);
      gradient.addColorStop(0.4, node.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.arc(node.x, node.y, node.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (timestamp: number) => {
      if (!isVisible.current) return;

      const time = timestamp + timeOffset.current;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      // Subtle Parallax: Shifts center slightly based on scroll
      const centerY = (height / 2) + (Math.sin(scroll.current * 0.002) * 50);

      ctx.globalCompositeOperation = 'screen';

      layers.current.forEach(layer => {
        layer.nodes.forEach(node => {
          updateNode(node, time, layer.tether, centerX, centerY);
          drawNode(node);
        });
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mainColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-visible flex items-center justify-center pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{ opacity: opacity }}
        className="block w-full h-full blur-[80px] saturate-150"
      />
    </div>
  );
}

// Service color mappings for reference (using hex colors instead of hues)
export const serviceColors: Record<string, string> = {
  'website-design': '#f43f5e',    // Rose-500
  'branding': '#a855f7',          // Purple-500
  'social-media': '#06b6d4',      // Cyan-500
  'content-creation': '#f59e0b',  // Amber-500
  'photography': '#f97316',       // Orange-500
  'seo': '#10b981',               // Emerald-500
};
