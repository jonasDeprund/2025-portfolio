import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// Configuration des formes
const SHAPES_CONFIG = {
  shape1: {
    vertices: [
      { x: 21.4141, y: 0.696594 },
      { x: 487.467, y: 86.9847 },
      { x: 467.086, y: 213.085 },
      { x: 0.108032, y: 122.729 },
    ],
    originalWidth: 488,
    dimensions: {
      width: 475,
      height: 132,
      rotation: 9,
    },
    style: {
      fillStyle: '#F8B6EF',
      strokeStyle: '#F8B6EF',
    },
  },
  shape2: {
    vertices: [
      { x: 36.2244, y: 0.721061 },
      { x: 402.638, y: 45.0797 },
      { x: 375.597, y: 356.055 },
      { x: 0.92734, y: 300.593 },
    ],
    originalWidth: 403,
    dimensions: {
      width: 378,
      height: 323,
      rotation: 5,
    },
    style: {
      fillStyle: '#5166FF',
      strokeStyle: '#5166FF',
    },
  },
  shape3: {
    vertices: [
      { x: 310.591, y: 0 },
      { x: 100.893, y: 59.375 },
      { x: 0, y: 245.417 },
      { x: 342.244, y: 475 },
      { x: 553.92, y: 166.25 },
    ],
    originalWidth: 554,
    dimensions: {
      width: 553,
      height: 475,
      rotation: 0,
    },
    style: {
      fillStyle: '#58BA64',
      strokeStyle: '#58BA64',
    },
  },
  shape4: {
    type: 'circle', // Ajout d'un type pour différencier le cercle
    originalWidth: 148,
    dimensions: {
      radius: 73.5, // Le rayon original du SVG
      width: 148,
      height: 147,
    },
    style: {
      fillStyle: '#FF773D',
      strokeStyle: '#FF773D',
    },
  },
};

// Utilitaires de calcul
const calcUtils = {
  remToPx: (rem) => (rem * 16) / 1.6,
  pxToRem: (px) => (px * 1.6) / 16,
  widthPercent: (percent) => (window.innerWidth * percent) / 100,
  heightPercent: (percent) => (window.innerHeight * percent) / 100,
  degToRad: (deg) => deg * (Math.PI / 180),
};

const AnimatedShapes = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } =
      Matter;

    // Création du moteur physique
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    // Création du rendu
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Création des murs invisibles
    const createWalls = () => {
      const wallThickness = calcUtils.remToPx(2);
      return [
        // Sol
        Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight,
          window.innerWidth,
          wallThickness,
          { isStatic: true, render: { visible: false } }
        ),
        // Mur gauche
        Bodies.rectangle(
          0,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight,
          { isStatic: true, render: { visible: false } }
        ),
        // Mur droit
        Bodies.rectangle(
          window.innerWidth,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight,
          { isStatic: true, render: { visible: false } }
        ),
      ];
    };

    // Création d'une forme avec échelle
    const createScaledShape = (config, xPos, yPos) => {
      // Pour les cercles
      if (config.type === 'circle') {
        const scale =
          calcUtils.remToPx(calcUtils.pxToRem(config.dimensions.width)) /
          config.originalWidth;
        const scaledRadius = config.dimensions.radius * scale;

        return Bodies.circle(xPos, yPos, scaledRadius, {
          render: {
            ...config.style,
            lineWidth: 1,
          },
          restitution: 0.8,
          friction: 0.1,
          density: 0.001,
        });
      }

      // Pour les formes avec vertices
      const scale =
        calcUtils.remToPx(calcUtils.pxToRem(config.dimensions.width)) /
        config.originalWidth;
      const scaledVertices = config.vertices.map((vertex) => ({
        x: vertex.x * scale,
        y: vertex.y * scale,
      }));

      return Bodies.fromVertices(xPos, yPos, [scaledVertices], {
        render: {
          ...config.style,
          lineWidth: 1,
        },
        angle: calcUtils.degToRad(config.dimensions.rotation),
        restitution: 0.6,
        friction: 0.1,
        density: 0.001,
      });
    };

    // Création de toutes les formes
    const createShapes = () => {
      return [
        createScaledShape(
          SHAPES_CONFIG.shape1,
          calcUtils.widthPercent(20),
          -100
        ),
        createScaledShape(
          SHAPES_CONFIG.shape2,
          calcUtils.widthPercent(40),
          -200
        ),
        createScaledShape(
          SHAPES_CONFIG.shape3,
          calcUtils.widthPercent(60),
          -300
        ),
        createScaledShape(
          SHAPES_CONFIG.shape4,
          calcUtils.widthPercent(80),
          -400
        ),
      ];
    };

    // Initialisation de la scène
    const initScene = () => {
      const walls = createWalls();
      const shapes = createShapes();

      World.add(engine.world, [...walls, ...shapes]);

      // Ajout de l'interaction souris
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      // Démarrage de la simulation
      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      return { walls, shapes, runner };
    };

    // Gestion du redimensionnement
    const handleResize = (scene) => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;

      World.clear(engine.world);
      const newWalls = createWalls();
      const newShapes = createShapes();

      World.add(engine.world, [...newWalls, ...newShapes]);
    };

    // Initialisation
    const scene = initScene();
    window.addEventListener('resize', () => handleResize(scene));

    // Nettoyage
    return () => {
      window.removeEventListener('resize', () => handleResize(scene));
      Render.stop(render);
      Runner.stop(scene.runner);
      World.clear(engine.world);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    />
  );
};

export default AnimatedShapes;
