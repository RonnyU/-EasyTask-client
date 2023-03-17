import { IProject } from '../types/types';
import { Link } from 'react-router-dom';

interface IPropsProject {
  project: IProject;
}

const ProjectPreview = ({ project }: IPropsProject) => {
  const { name, _id, client } = project;
  return (
    <div className='border-b p-5 flex'>
      <p className='flex-1'>
        {name}
        <small className='text-sm text-gray-500 uppercase'>
          {' - '}
          {client}
        </small>
      </p>
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
