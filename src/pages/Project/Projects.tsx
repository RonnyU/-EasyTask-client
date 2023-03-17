import ProjectPreview from '../../components/ProjectPreview';
import { useProject } from '../../hooks';

const Projects = () => {
  const { projects } = useProject();

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
