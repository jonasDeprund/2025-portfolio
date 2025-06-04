import React from 'react';

// Assets

import identityAnimation from '../assets/lottie/animation-identity.json';
import interfaceAnimation from '../assets/lottie/animation-interface.json';
import motionAnimation from '../assets/lottie/animation-motion.json';
import illustrationAnimation from '../assets/lottie/animation-illustration.json';
import lottie from 'lottie-web';
import visualIdentity from '../svg/visual-identity.svg';
import visualInterface from '../svg/visual-interface.svg';
import visualMotion from '../svg/visual-motion.svg';
import visualIllustration from '../svg/visual-illustration.svg';

const skillsData = [
  {
    id: 1,
    title: 'Identity',
    description: 'Creating visual identities for meaningful impact.',
    icon: visualIdentity,
    animation: identityAnimation,
  },
  {
    id: 2,
    title: 'Interface',
    description: 'Designing intuitive user experiences.',
    icon: visualInterface,
    animation: interfaceAnimation,
  },
  {
    id: 3,
    title: 'Motion',
    description: 'Animating ideas to enhance storytelling.',
    icon: visualMotion,
    animation: motionAnimation,
  },
  {
    id: 4,
    title: 'Illustration',
    description: 'Crafting custom visuals for every project.',
    icon: visualIllustration,
    animation: illustrationAnimation,
  },
];

const Skills = () => {
  const animationRefs = React.useRef({});
  const containerRefs = React.useRef({});
  const isPlayingRefs = React.useRef({});

  React.useEffect(() => {
    skillsData.forEach((skill) => {
      if (containerRefs.current[skill.id]) {
        const animation = lottie.loadAnimation({
          container: containerRefs.current[skill.id],
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: skill.animation,
        });

        animation.addEventListener('complete', () => {
          isPlayingRefs.current[skill.id] = false;
          if (containerRefs.current[skill.id]) {
            containerRefs.current[skill.id].style.opacity = '0';
          }
        });

        animationRefs.current[skill.id] = animation;
      }
    });

    return () => {
      Object.values(animationRefs.current).forEach((anim) => {
        if (anim) {
          anim.removeEventListener('complete');
          anim.destroy();
        }
      });
    };
  }, []);

  const handleMouseEnter = (skillId) => {
    const animation = animationRefs.current[skillId];
    const container = containerRefs.current[skillId];

    if (animation && !isPlayingRefs.current[skillId]) {
      isPlayingRefs.current[skillId] = true;
      container.style.opacity = '1';
      animation.goToAndPlay(0);
    }
  };

  const renderSkillIcon = (skill) => (
    <div className="skill__icon">
      <img src={skill.icon} alt={skill.title} className="skill__icon-static" />
      <div
        ref={(el) => (containerRefs.current[skill.id] = el)}
        className="skill__icon-animation"
      />
    </div>
  );

  return (
    <div className="skills">
      <div className="row">
        <div className="cell-start-0 cell-end-12">
          <h2 className="text-h2">Skills</h2>
        </div>

        <div className="cell-start-0 cell-end-6">
          {skillsData.slice(0, 2).map((skill) => (
            <div
              key={skill.id}
              className="skill"
              onMouseEnter={() => handleMouseEnter(skill.id)}
            >
              {renderSkillIcon(skill)}
              <div className="skill__content">
                <h3 className="text-current color-white">{skill.title}</h3>
                <p className="text-current color-grey-light">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cell-start-6 cell-end-12">
          {skillsData.slice(2, 4).map((skill) => (
            <div
              key={skill.id}
              className="skill"
              onMouseEnter={() => handleMouseEnter(skill.id)}
            >
              {renderSkillIcon(skill)}
              <div className="skill__content">
                <h3 className="text-current color-white">{skill.title}</h3>
                <p className="text-current color-grey-light">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
