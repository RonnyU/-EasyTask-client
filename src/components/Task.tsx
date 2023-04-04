import { useAdmin, useProject } from '../hooks';
import { PropsTasks } from '../types/types';
import { formatWithNameToGTM } from '../utils/dateFormater';

const Task = ({ task }: PropsTasks) => {
  const { name, description, deadline, priority, _id, status } = task;
  const { handleEdiTask, handleDeleteTask, completeTask } = useProject();

  const id = _id || '';

  const admin = useAdmin();

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div>
        <p className='mb-1 text-xl'>{name}</p>
        <p className='mb-1 text-sm text-gray-500 uppercase'>{description}</p>
        <p className='mb-1 text-lg'>{formatWithNameToGTM(deadline)}</p>
        <p className='mb-1 text-gray-600'>Priority: {priority}</p>
      </div>
      <div className='flex gap-2'>
        {admin && (
          <button
            className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
            onClick={() => handleEdiTask(task)}
          >
            Edit
          </button>
        )}
        <button
          className={`${
            status ? 'bg-sky-600' : 'bg-gray-600'
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completeTask(id)}
        >
          {status ? 'Complete' : 'Incomplete'}
        </button>
        {admin && (
          <button
            className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
            onClick={() => handleDeleteTask(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
