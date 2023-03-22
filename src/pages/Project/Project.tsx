import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProject } from '../../hooks';
import { ModalForm, Task } from '../../components';

const Project = () => {
  const params = useParams();
  const { id } = params;
  const { getProject, project, loading, openModal } = useProject();

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, []);

  const { name } = project;

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{name}</h1>
        <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
            />
          </svg>

          <Link to={`/projects/edit/${id}`} className='uppercase font-bold'>
            Edit
          </Link>
        </div>
      </div>
      <button
        type='button'
        className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center'
        onClick={openModal}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        New Task
      </button>
      <p className='font-bold text-xl mt-10'>Project Tasks</p>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task?._id} task={task} />)
        ) : (
          <p className='text-center my-5 p-10'>There is not tasks to display</p>
        )}
      </div>
      <ModalForm />
    </>
  );
};

export default Project;
