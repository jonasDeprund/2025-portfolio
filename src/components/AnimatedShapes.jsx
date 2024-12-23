import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const AnimatedShapes = () => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    // Position initiale
    gsap.set(shapesRef.current, {
      y: -100,
      opacity: 1,
    });

    // Animation initiale de chute
    gsap.to(shapesRef.current, {
      y: '+=800',
      duration: 2,
      ease: 'bounce.out',
      stagger: {
        each: 0.2,
        from: 'random',
      },
      onComplete: setupDraggable,
    });

    // Configuration du Draggable
    function setupDraggable() {
      shapesRef.current.forEach((shape) => {
        Draggable.create(shape, {
          type: 'x,y',
          bounds: containerRef.current,
          inertia: true,
          onDragEnd: function () {
            // Quand on relâche la forme, elle tombe
            gsap.to(this.target, {
              y: window.innerHeight - this.target.offsetHeight - 20, // 20px du bas
              duration: 1,
              ease: 'bounce.out',
            });
          },
          onDrag: function () {
            // Annule toute animation en cours pendant le drag
            gsap.killTweensOf(this.target);
          },
        });
      });
    }

    // Nettoyage
    return () => {
      shapesRef.current.forEach((shape) => {
        if (shape._gsap) gsap.killTweensOf(shape);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="shapes-container">
      <div
        ref={(el) => (shapesRef.current[0] = el)}
        className="shape circle"
      ></div>
      <div
        ref={(el) => (shapesRef.current[1] = el)}
        className="shape rectangle"
      ></div>
      <div
        ref={(el) => (shapesRef.current[2] = el)}
        className="shape octagon"
      ></div>
    </div>
  );
};

export default AnimatedShapes;
