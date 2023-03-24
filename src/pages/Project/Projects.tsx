import { ProjectPreview } from '../../components';
import { useProject } from '../../hooks';
import { useEffect } from 'react';

const Projects = () => {
  const { projects, getProjects } = useProject();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <h1 className='font-black text-4xl'>Projects</h1>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {projects.length ? (
          projects.map((project) => (
            <ProjectPreview project={project} key={project._id} />
          ))
        ) : (
          <p className='text-center text-gray-600 uppercase p-5'>
            There is no projects to display{' '}
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
