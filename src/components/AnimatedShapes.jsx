import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const AnimatedShapes = () => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    // Position initiale plus haute pour un meilleur effet
    gsap.set(shapesRef.current, {
      y: -200,
      opacity: 1,
    });

    // Animation initiale avec physique plus réaliste
    shapesRef.current.forEach((shape) => {
      const randomX = Math.random() * 20 - 10; // Petit mouvement aléatoire en X

      gsap.to(shape, {
        y: window.innerHeight - shape.offsetHeight - 20,
        x: `+=${randomX}`,
        duration: 1.5,
        ease: 'bounce.out',
        rotation: 'random(-15, 15)', // Légère rotation aléatoire
        delay: Math.random() * 0.5,
      });
    });

    function setupDraggable() {
      shapesRef.current.forEach((shape) => {
        Draggable.create(shape, {
          type: 'x,y',
          bounds: containerRef.current,
          inertia: true,
          onDragEnd: function () {
            const velocity = this.getDirection();
            const speed = Math.sqrt(
              velocity.x * velocity.x + velocity.y * velocity.y
            );

            gsap.to(this.target, {
              y: window.innerHeight - this.target.offsetHeight - 20,
              rotation: velocity.x * 0.1, // Rotation basée sur la vitesse horizontale
              duration: 1 + speed * 0.001, // Durée basée sur la vitesse
              ease: 'bounce.out',
              onComplete: () => {
                // Petit effet de stabilisation
                gsap.to(this.target, {
                  rotation: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              },
            });
          },
          onDrag: function () {
            gsap.killTweensOf(this.target);
          },
        });
      });
    }

    setupDraggable();

    return () => {
      shapesRef.current.forEach((shape) => {
        if (shape._gsap) gsap.killTweensOf(shape);
      });
    };
  }, []);

  // ... reste du composant

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
        className="shape parallelogram"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="554"
          height="475"
          viewBox="0 0 554 475"
          fill="none"
        >
          <path
            d="M310.625 0L100.927 59.375L0.0341797 245.417L342.278 475L553.954 166.25L310.625 0Z"
            fill="#58BA64"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedShapes;
