import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProject } from '../../hooks';
const Project = () => {
  const params = useParams();
  const { id } = params;
  const { getProject, project, loading } = useProject();

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, []);

  const { name } = project;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1 className='font-black text-4xl'>{name}</h1>
    </div>
  );
};

export default Project;
