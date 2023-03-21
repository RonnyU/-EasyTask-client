import { ProjectForm } from '../../components';

const NewProject = () => {
  return (
    <>
      <h1 className='font-black text-4xl'>Create Project</h1>

      <div className='mt-10 flex justify-center'>
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProject;
