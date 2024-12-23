import React, { useState } from 'react';

// Import d'images
import imageActu from '../images/thumb-actu.png';
import imageActuHovered from '../images/thumb-actu-hovered.png';
import imageNexity from '../images/thumb-nexity.png';
import imageNexityHovered from '../images/thumb-nexity-hovered.png';
import imageBonduelle from '../images/thumb-bonduelle.png';
import imageBonduelleHovered from '../images/thumb-bonduelle-hovered.png';
import imageDanone from '../images/thumb-danone.png';
import imageDanoneHovered from '../images/thumb-danone-hovered.png';
import imageElo from '../images/thumb-elo.png';
import imageEloHovered from '../images/thumb-elo-hovered.png';
import imageAhp from '../images/thumb-ahp.png';
import imageAhpHovered from '../images/thumb-ahp-hovered.png';
import imageSobrico from '../images/thumb-sobrico.png';
import imageSobricoHovered from '../images/thumb-sobrico-hovered.png';
import imageTasteFrance from '../images/thumb-taste-france.png';
import imageTasteFranceHovered from '../images/thumb-taste-france-hovered.png';
import imageBanque from '../images/thumb-banque.png';
import imageBanqueHovered from '../images/thumb-banque-hovered.png';
import imageSlate from '../images/thumb-slate.png';
import imageSlateHovered from '../images/thumb-slate-hovered.png';
import iconArrow from '../svg/arrow.svg';

// Import component
import ProjectSmall from './ProjectSmall';
import ProjectLarge from './ProjectLarge';

const ProjectsContainer = () => {
  const projectData = [
    {
      id: 0,
      title: 'Actu.fr - Olympics games',
      link: 'https://www.behance.net/gallery/205615475/Actufr-Olympics-games-event',
      image: {
        default: imageActu,
        hovered: imageActuHovered,
      },
    },
    {
      id: 1,
      title: 'Slate - Media',
      link: 'https://www.behance.net/gallery/192332371/Slatefr-Media-website',
      image: {
        default: imageSlate,
        hovered: imageSlateHovered,
      },
    },
    {
      id: 2,
      title: 'Banque de France - Corporate',
      link: 'https://www.behance.net/gallery/150653589/Banque-de-France-Corporate-website',
      image: {
        default: imageBanque,
        hovered: imageBanqueHovered,
      },
    },
    {
      id: 3,
      title: 'Taste France Magazine  - Media',
      link: 'https://www.behance.net/gallery/170954261/Taste-France-Magazine',
      image: {
        default: imageTasteFrance,
        hovered: imageTasteFranceHovered,
      },
    },
    {
      id: 4,
      title: 'Nexity - Corporate',
      link: 'https://www.behance.net/gallery/122497029/Nexity-Corporate-website-(Pitch)',
      image: {
        default: imageNexity,
        hovered: imageNexityHovered,
      },
    },
    {
      id: 5,
      title: 'Bonduelle - Corporate',
      link: 'https://www.behance.net/gallery/132516291/Bonduelle-Corporate-Website',
      image: {
        default: imageBonduelle,
        hovered: imageBonduelleHovered,
      },
    },
    {
      id: 6,
      title: 'Danone - Corporate',
      link: 'https://www.behance.net/gallery/124320911/Danone-Annual-report-2020',
      image: {
        default: imageDanone,
        hovered: imageDanoneHovered,
      },
    },
    {
      id: 7,
      title: 'Elo Group - Corporate',
      link: 'https://www.behance.net/gallery/131689655/Elo-Group-Corporate-Website',
      image: {
        default: imageElo,
        hovered: imageEloHovered,
      },
    },
    {
      id: 8,
      title: 'Ahp - Event',
      link: 'https://www.behance.net/gallery/98421997/American-Hospital-of-Paris-Event-website',
      image: {
        default: imageAhp,
        hovered: imageAhpHovered,
      },
    },
    {
      id: 9,
      title: 'So Brico - E-commerce',
      link: 'https://www.behance.net/gallery/122495107/Sobrico-E-commerce',
      image: {
        default: imageSobrico,
        hovered: imageSobricoHovered,
      },
    },
  ];

  return (
    <div className="projects">
      <div className="projects__section">
        <div className="row">
          <div className="cell-start-0 cell-end-12 cell-start-0-m cell-end-12-m">
            <ProjectLarge
              key={projectData[0].id}
              title={projectData[0].title}
              link={projectData[0].link}
              image={projectData[0].image}
            />
          </div>
          <div className="cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[1].id}
              title={projectData[1].title}
              link={projectData[1].link}
              image={projectData[1].image}
            />
          </div>
          <div className="cell-start-6 cell-end-12 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[2].id}
              title={projectData[2].title}
              link={projectData[2].link}
              image={projectData[2].image}
            />
          </div>
          <div className="cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[3].id}
              title={projectData[3].title}
              link={projectData[3].link}
              image={projectData[3].image}
            />
          </div>
          <div className="cell-start-6 cell-end-12 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[4].id}
              title={projectData[4].title}
              link={projectData[4].link}
              image={projectData[4].image}
            />
          </div>
          <div className="cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[5].id}
              title={projectData[5].title}
              link={projectData[5].link}
              image={projectData[5].image}
            />
          </div>
          <div className="cell-start-6 cell-end-12 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[6].id}
              title={projectData[6].title}
              link={projectData[6].link}
              image={projectData[6].image}
            />
          </div>
          <div className="cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[7].id}
              title={projectData[7].title}
              link={projectData[7].link}
              image={projectData[7].image}
            />
          </div>
          <div className="cell-start-6 cell-end-12 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[8].id}
              title={projectData[8].title}
              link={projectData[8].link}
              image={projectData[8].image}
            />
          </div>
          <div className="cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m">
            <ProjectSmall
              key={projectData[9].id}
              title={projectData[9].title}
              link={projectData[9].link}
              image={projectData[9].image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsContainer;
