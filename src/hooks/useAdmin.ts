import useProject from './useProject';
import useAuth from './useAuth';

const useAdmin = () => {
  const { auth } = useAuth();
  const { project } = useProject();

  return project.createdby === auth._id;
};

export default useAdmin;
