import React from 'react';

// Assets
import visualIdentity from '../svg/visual-identity.svg';
import visualInterface from '../svg/visual-interface.svg';
import visualMotion from '../svg/visual-motion.svg';
import visualIllustration from '../svg/visual-illustration.svg';
import identityAnimation from '../assets/lottie/animation-identity.json';
import lottie from 'lottie-web';

const Skills = () => {
  const skillsData = [
    {
      id: 1,
      title: 'Identity',
      description: 'Creating visual identities for meaningful impact.',
      icon: visualIdentity,
      isLottie: true,
    },
    {
      id: 2,
      title: 'Interface',
      description: 'Designing intuitive user experiences.',
      icon: visualInterface,
    },
    {
      id: 3,
      title: 'Motion',
      description: 'Animating ideas to enhance storytelling.',
      icon: visualMotion,
    },
    {
      id: 4,
      title: 'Illustration',
      description: 'Crafting custom visuals for every project.',
      icon: visualIllustration,
    },
  ];

  const identityRef = React.useRef(null);
  const animationInstance = React.useRef(null);
  const isPlayingRef = React.useRef(false);

  React.useEffect(() => {
    if (identityRef.current) {
      animationInstance.current = lottie.loadAnimation({
        container: identityRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: identityAnimation,
      });

      animationInstance.current.addEventListener('complete', () => {
        isPlayingRef.current = false;
      });
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.removeEventListener('complete');
        animationInstance.current.destroy();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animationInstance.current && !isPlayingRef.current) {
      isPlayingRef.current = true;
      animationInstance.current.goToAndPlay(0);
    }
  };

  const renderSkillIcon = (skill) => {
    if (skill.isLottie) {
      return (
        <div
          ref={identityRef}
          className="skill__icon"
          onMouseEnter={handleMouseEnter}
        />
      );
    }
    return (
      <div className="skill__icon">
        <img src={skill.icon} alt={skill.title} />
      </div>
    );
  };

  return (
    <div className="skills">
      <div className="row">
        <div className="cell-start-0 cell-end-12">
          <h2 className="text-h2">Skills</h2>
        </div>

        <div className="cell-start-0 cell-end-6">
          {skillsData.slice(0, 2).map((skill) => (
            <div key={skill.id} className="skill">
              {renderSkillIcon(skill)}
              <div className="skill__content">
                <h3 className="text-h3 color-white">{skill.title}</h3>
                <p className="text-h3 color-grey-light">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cell-start-6 cell-end-12">
          {skillsData.slice(2, 4).map((skill) => (
            <div key={skill.id} className="skill">
              {renderSkillIcon(skill)}
              <div className="skill__content">
                <h3 className="text-h3 color-white">{skill.title}</h3>
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
