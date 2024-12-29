import React from 'react';

// Assets
import visualIdentity from '../svg/visual-identity.svg';
import visualInterface from '../svg/visual-interface.svg';
import visualMotion from '../svg/visual-motion.svg';
import visualIllustration from '../svg/visual-illustration.svg';

const Skills = () => {
  const skillsData = [
    {
      id: 1,
      title: 'Identity',
      description: 'Creating visual identities for meaningful impact.',
      icon: 'visualIdentity',
    },
    {
      id: 2,
      title: 'Interface',
      description: 'Designing intuitive user experiences.',
      icon: 'visualInterface',
    },
    {
      id: 3,
      title: 'Motion',
      description: 'Animating ideas to enhance storytelling.',
      icon: 'visualMotion',
    },
    {
      id: 4,
      title: 'Illustration',
      description: 'Crafting custom visuals for every project.',
      icon: 'visualIllustration',
    },
  ];

  return (
    <div className="skills">
      <div className="row">
        <div className="cell-start-0 cell-end-12">
          <h2 className="text-h2">Skills</h2>
        </div>

        {skillsData.slice(0, 2).map((skill) => (
          <div
            key={skill.id}
            className="cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m"
          >
            <div className="skill">
              <div className="skill__icon">{skill.icon}</div>
              <div className="skill__content">
                <h3 className="text-h3">{skill.title}</h3>
                <p className="text-current">{skill.description}</p>
              </div>
            </div>
          </div>
        ))}

        {skillsData.slice(2, 4).map((skill) => (
          <div
            key={skill.id}
            className="cell-start-6 cell-end-12 cell-start-0-m cell-end-12-m"
          >
            <div className="skill">
              <div className="skill__icon">{skill.icon}</div>
              <div className="skill__content">
                <h3 className="text-h3">{skill.title}</h3>
                <p className="text-current">{skill.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
