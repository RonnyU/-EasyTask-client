import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

import { PropsProject } from '../types/types';

const ProjectPreview = ({ project }: PropsProject) => {
  const { auth } = useAuth();

  const { name, _id, client, createdby } = project;
  return (
    <div className='border-b p-5 flex justify-between'>
      <div className='flex items-center gap-2'>
        <p className='flex-1'>
          {name}
          <small className='text-sm text-gray-500 uppercase'>
            {' - '}
            {client}
          </small>
        </p>

        {auth._id !== createdby && (
          <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>
            Collaborator
          </p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
      >
        Watch Project
      </Link>
    </div>
  );
};

export default ProjectPreview;
