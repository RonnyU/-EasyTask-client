import { Alert, CollaboratorForm } from '../components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks';

const NewCollaborator = () => {
  const {
    getProject,
    project,
    loading,
    collaborator,
    addCollaborator,
    alert,
    showAlert,
  } = useProject();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getProject(id);
    }
    return () => showAlert({ msg: '', error: false });
  }, []);

  if (!project?._id) return <Alert msg={alert.msg} error={alert.error} />;

  return (
    <>
      <h1>Add Collaborator to project: {project.name}</h1>

      <div className='mt-10 flex justify-center'>
        <CollaboratorForm />
      </div>

      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        collaborator._id && (
          <div className='flex justify-center mt-10'>
            <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
              <h2 className='text-center mb-10 text-2xl font-bold'>Result:</h2>
              <div className='flex justify-between items-center'>
                <p>{collaborator.name}</p>
                <button
                  type='button'
                  className='bg-slate-500 px-5 py-2 rounded-lg font-bold text-sm text-white uppercase'
                  onClick={addCollaborator}
                >
                  Add to the project
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewCollaborator;
