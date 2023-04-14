import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAdmin, useProject } from '../../hooks';
import {
  ModalFormTask,
  Task,
  ModalDeleteTask,
  Collaborator,
  ModalDeleteCollaborator,
} from '../../components';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ITask,
  ITaskWithProject,
  ServerToClientEvents,
} from '../../Interfaces/interfaces';
import PacmanLoader from 'react-spinners/PacmanLoader';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const Project = () => {
  const params = useParams();
  const { id } = params;
  const {
    getProject,
    project,
    loading,
    openModalTask,
    socketCreateTask,
    socketDeleteTask,
    socketUpdateTask,
    socketCompleteTask,
  } = useProject();
  const admin = useAdmin();

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, [id]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL);
    socket.emit('openProject', String(id));
  }, []);

  useEffect(() => {
    socket.on('taskAdded', (taskAdded) => {
      if (taskAdded.project === project._id) {
        socketCreateTask(taskAdded);
      }
    });

    socket.on('taskDeleted', (taskDeleted) => {
      if (taskDeleted.project === project._id) {
        socketDeleteTask(taskDeleted);
      }
    });

    socket.on('taskUpdated', (taskWithProjectUpdated: ITaskWithProject) => {
      if (taskWithProjectUpdated.project._id === project._id) {
        const taskUpdate: ITask = {
          _id: taskWithProjectUpdated._id,
          name: taskWithProjectUpdated.name,
          description: taskWithProjectUpdated.description,
          deadline: taskWithProjectUpdated.deadline,
          priority: taskWithProjectUpdated.priority,
          status: taskWithProjectUpdated.status,
          completed: taskWithProjectUpdated.completed,
        };
        socketUpdateTask(taskUpdate);
      }
    });

    socket.on('taskCompleted', (taskWithProjectCompleted: ITaskWithProject) => {
      if (taskWithProjectCompleted.project._id === project._id) {
        const taskUpdate: ITask = {
          _id: taskWithProjectCompleted._id,
          name: taskWithProjectCompleted.name,
          description: taskWithProjectCompleted.description,
          deadline: taskWithProjectCompleted.deadline,
          priority: taskWithProjectCompleted.priority,
          status: taskWithProjectCompleted.status,
          completed: taskWithProjectCompleted.completed,
        };
        socketCompleteTask(taskUpdate);
      }
    });
  });

  const { name } = project;

  if (loading) return <PacmanLoader color='#36d7b7' />;

  return (
    <>
      <div className='flex justify-between mb-5'>
        <h1 className='font-black text-4xl'>{name}</h1>
        {admin && (
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
        )}
      </div>
      {admin && (
        <button
          type='button'
          className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center'
          onClick={openModalTask}
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
      )}
      <p className='font-bold text-xl mt-10'>Project Tasks</p>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task?._id} task={task} />)
        ) : (
          <p className='text-center my-5 p-10'>There is not tasks to display</p>
        )}
      </div>
      {admin && (
        <>
          <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl'>Collaborator</p>
            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className='text-gray-400 uppercase font-bold hover:text-black'
            >
              ADD
            </Link>
          </div>
          <div className='bg-white shadow mt-10 rounded-lg'>
            {project.collaborator?.length ? (
              project.collaborator?.map((col) => (
                <Collaborator key={col._id} collaborator={col} />
              ))
            ) : (
              <p className='text-center my-5 p-10'>
                There is not tasks to display
              </p>
            )}
          </div>
        </>
      )}
      <ModalFormTask />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </>
  );
};

export default Project;
