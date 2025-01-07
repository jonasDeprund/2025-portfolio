import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// Configuration des formes
const SHAPES_CONFIG = {
  shape1: {
    type: 'rectangle', // brique
    originalWidth: 400,
    dimensions: {
      width: 400,
      height: 130,
      rotation: 20,
    },
    style: {
      fillStyle: '#F8B6EF',
      strokeStyle: '#F8B6EF',
    },
  },
  shape2: {
    type: 'rectangle', // Nouveau type pour les rectangles arrondis
    originalWidth: 400,
    dimensions: {
      width: 400,
      height: 130,
      rotation: -40,
    },
    style: {
      fillStyle: '#7244E4',
      strokeStyle: '#7244E4',
    },
  },
  shape3: {
    type: 'rectangle', // Nouveau type pour les rectangles arrondis
    originalWidth: 200,
    dimensions: {
      width: 200,
      height: 200,
      rotation: 25,
    },
    style: {
      fillStyle: '#5166FF',
      strokeStyle: '#5166FF',
    },
  },
  shape4: {
    type: 'circle', // Ajout d'un type pour différencier le cercle
    originalWidth: 150,
    dimensions: {
      radius: 150, // Le rayon original du SVG
      width: 150,
      height: 150,
    },
    style: {
      fillStyle: '#FF773D',
      strokeStyle: '#FF773D',
    },
  },
  shape5: {
    type: 'circle',
    originalWidth: 150,
    dimensions: {
      radius: 150,
      width: 150,
      height: 150,
    },
    style: {
      fillStyle: '#FACA36',
      strokeStyle: '#FACA36',
    },
  },
  shape6: {
    type: 'triangle',
    originalWidth: 150,
    dimensions: {
      width: 200,
      height: 200,
      rotation: 20,
    },
    vertices: [
      { x: 75, y: 0 },
      { x: 0, y: 150 },
      { x: 150, y: 150 },
    ],
    style: {
      fillStyle: '#58BA64',
      strokeStyle: '#58BA64',
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
    const {
      Engine,
      Render,
      World,
      Bodies,
      Mouse,
      MouseConstraint,
      Runner,
      Events,
    } = Matter;

    // Ajout de l'écouteur de scroll
    const handleScroll = () => {
      if (sceneRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - scrollPosition / 250); // 500 est la distance de scroll pour faire disparaître complètement
        sceneRef.current.style.opacity = opacity;
      }
    };

    // Ajout de l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);

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
        pixelRatio: window.devicePixelRatio, // Ajoutez ceci
      },
    });

    // Création des murs
    const createWalls = () => {
      const wallThickness = calcUtils.remToPx(6);
      const extraSpace = wallThickness * 2;

      return [
        // Sol
        Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight + wallThickness / 2,
          window.innerWidth + extraSpace,
          wallThickness,
          {
            isStatic: true,
            friction: 1,
            restitution: 0.2,
            render: { visible: false },
          }
        ),
        // Mur gauche
        Bodies.rectangle(
          -wallThickness / 2,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight + extraSpace,
          {
            isStatic: true,
            friction: 1,
            restitution: 0.2,
            render: { visible: false },
          }
        ),
        // Mur droit
        Bodies.rectangle(
          window.innerWidth + wallThickness / 2,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight + extraSpace,
          {
            isStatic: true,
            friction: 1,
            restitution: 0.2,
            render: { visible: false },
          }
        ),
        // Mur du haut
        Bodies.rectangle(
          window.innerWidth / 2,
          -wallThickness / 2,
          window.innerWidth + extraSpace,
          wallThickness,
          {
            isStatic: true,
            friction: 1,
            restitution: 0.2,
            render: { visible: false },
          }
        ),
      ];
    };

    // Création des formes
    const createScaledShape = (config, xPos, yPos) => {
      if (config.type === 'circle') {
        const scale =
          calcUtils.remToPx(calcUtils.pxToRem(config.dimensions.width)) /
          config.originalWidth;
        const scaledRadius = config.dimensions.radius * scale * 0.5;

        return Bodies.circle(xPos, yPos, scaledRadius, {
          render: {
            ...config.style,
            lineWidth: 1,
          },
          restitution: 0.2, // Rebond des formes lors des collisions (min: 0 = pas de rebond, max: 1 = rebond parfait)
          friction: 1, // Friction avec les autres formes (min: 0 = glissant, max: 1 = rugueux)
          density: 0.6, // Densité/masse de la forme
          frictionAir: 0.1, // Friction avec l'air (ralentissement)
        });
      } else if (config.type === 'rectangle') {
        const scale =
          calcUtils.remToPx(calcUtils.pxToRem(config.dimensions.width)) /
          config.originalWidth;
        const scaledWidth = config.dimensions.width * scale;
        const scaledHeight = config.dimensions.height * scale;

        return Bodies.rectangle(xPos, yPos, scaledWidth, scaledHeight, {
          render: {
            ...config.style,
            lineWidth: 1,
            chamfer: {
              radius: config.dimensions.borderRadius,
            },
          },
          angle: calcUtils.degToRad(config.dimensions.rotation),
          restitution: 0.2, // Rebond des formes lors des collisions (min: 0 = pas de rebond, max: 1 = rebond parfait)
          friction: 1, // Friction avec les autres formes (min: 0 = glissant, max: 1 = rugueux)
          density: 0.6, // Densité/masse de la forme
          frictionAir: 0.1, // Friction avec l'air (ralentissement)
        });
      } else if (config.type === 'triangle') {
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
          restitution: 0.2,
          friction: 1,
          density: 0.6,
          frictionAir: 0.1,
        });
      } else {
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
          restitution: 0.2, // Rebond des formes lors des collisions (min: 0 = pas de rebond, max: 1 = rebond parfait)
          friction: 1, // Friction avec les autres formes (min: 0 = glissant, max: 1 = rugueux)
          density: 0.6, // Densité/masse de la forme
          frictionAir: 0.2, // Friction avec l'air (ralentissement)
        });
      }
    };

    const createShapes = () => {
      const startHeight = calcUtils.heightPercent(20);
      const shapesConfig = [
        { config: SHAPES_CONFIG.shape1, x: calcUtils.widthPercent(70) },
        { config: SHAPES_CONFIG.shape2, x: calcUtils.widthPercent(75) },
        { config: SHAPES_CONFIG.shape3, x: calcUtils.widthPercent(85) },
        { config: SHAPES_CONFIG.shape4, x: calcUtils.widthPercent(90) },
        { config: SHAPES_CONFIG.shape5, x: calcUtils.widthPercent(95) },
        { config: SHAPES_CONFIG.shape6, x: calcUtils.widthPercent(80) },
      ];

      let shapes = [];

      // Mélanger l'ordre des formes de façon aléatoire
      const shuffledShapes = [...shapesConfig].sort(() => Math.random() - 0.5);

      // Créer et ajouter chaque forme avec un délai
      shuffledShapes.forEach((shapeData, index) => {
        setTimeout(() => {
          const shape = createScaledShape(
            shapeData.config,
            shapeData.x,
            startHeight
          );
          shapes.push(shape);
          World.add(engine.world, shape);
        }, index * 200);
      });

      return shapes;
    };

    // Initialisation de la scène
    const initScene = () => {
      const walls = createWalls();
      const shapes = createShapes();

      World.add(engine.world, [...walls, ...shapes]);

      // Configuration de la souris
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      // Mise à jour de la position de la souris pour tenir compte des marges
      mouse.offset = { x: 0, y: 0 };

      // Gestion explicite du relâchement de la souris
      Events.on(mouseConstraint, 'mouseup', () => {
        mouseConstraint.body = null;
      });

      Events.on(mouseConstraint, 'mouseleave', () => {
        mouseConstraint.body = null;
      });

      // Désactiver la contrainte si la souris sort du canvas
      render.canvas.addEventListener('mouseleave', () => {
        mouseConstraint.body = null;
      });

      render.canvas.style.pointerEvents = 'auto';
      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

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
      World.add(engine.world, newWalls);

      // Recréer les formes avec délai
      createShapes();
    };

    const scene = initScene();
    window.addEventListener('resize', () => handleResize(scene));

    return () => {
      window.removeEventListener('resize', () => handleResize(scene));
      Render.stop(render);
      Runner.stop(scene.runner);
      World.clear(engine.world);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
      window.removeEventListener('scroll', handleScroll);
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
        right: 0,
        bottom: 0,
        zIndex: 1,
        touchAction: 'none',
        transform: 'translateZ(0)',
        transition: 'opacity 0.3s ease-out',
      }}
    />
  );
};

export default AnimatedShapes;
