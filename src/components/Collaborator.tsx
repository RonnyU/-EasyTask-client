import { useProject } from '../hooks';
import { useEffect } from 'react';
import { PropsCollaborator } from '../types/types';

const Collaborator = ({ collaborator }: PropsCollaborator) => {
  const { handleDeleteCollaborator, showAlert } = useProject();
  const { name, email } = collaborator;

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div>
        <p>{name}</p>
        <p className='text-sm text-gray-700'>{email}</p>
      </div>

      <div className=''>
        <button
          type='button'
          className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          onClick={() => handleDeleteCollaborator(collaborator)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
