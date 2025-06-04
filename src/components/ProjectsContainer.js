import { useEffect, useState } from 'react';
import { client } from '../lib/ sanityClient';

// Import component
import ProjectSmall from './ProjectSmall';
import ProjectLarge from './ProjectLarge';

const ProjectsContainer = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "project"] | order(_createdAt asc) {
          _id,
          title,
          description,
          link,
          isLarge,
          "imageDefault": imageDefault.asset->url,
          "imageHovered": imageHovered.asset->url
        }`
      )
      .then((data) => setProjects(data));
  }, []);

  if (!projects.length) return null;

  const [firstProject, ...otherProjects] = projects;

  return (
    <div className="projects">
      <div className="projects__section">
        <div className="row">
          <div className="cell-start-0 cell-end-12 cell-start-0-m cell-end-12-m">
            <ProjectLarge
              key={firstProject._id}
              title={firstProject.title}
              description={firstProject.description}
              link={firstProject.link}
              image={{
                default: firstProject.imageDefault,
                hovered: firstProject.imageHovered,
              }}
            />
          </div>

          {otherProjects.map((project, index) => (
            <div
              key={project._id}
              className={
                index % 2 === 0
                  ? 'cell-start-0 cell-end-6 cell-start-0-m cell-end-12-m'
                  : 'cell-start-6 cell-end-12 cell-start-0-m cell-end-12-m'
              }
            >
              <ProjectSmall
                title={project.title}
                description={project.description}
                link={project.link}
                image={{
                  default: project.imageDefault,
                  hovered: project.imageHovered,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContainer;
