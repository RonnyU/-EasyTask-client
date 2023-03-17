import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAlert, IProject, Props } from '../../types/types';
import axiosClient, { RequestHeaderMaker } from '../../utils/axiosClient';

import ProjectContext from './ProjectContext';

const INITIAL_STATE = {
  _id: '',
  name: '',
  description: '',
  deadline: '',
  client: '',
  createdby: '',
  partners: [],
};

const INITIAL_ALERT_STATE = {
  msg: '',
  error: false,
};

const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [alert, setAlert] = useState<IAlert>(INITIAL_ALERT_STATE);
  const [project, setProject] = useState<IProject>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient('/projects', requestHeaders);

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = (alertDefined: IAlert) => {
    setAlert(alertDefined);
    setTimeout(() => setAlert(INITIAL_ALERT_STATE), 5000);
  };

  const submitProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.post(
        '/projects',
        project,
        requestHeaders
      );

      setProjects((prev) => [...prev, data]);

      setAlert({
        msg: 'Project created successfully',
        error: false,
      });

      setTimeout(() => {
        setAlert(INITIAL_ALERT_STATE);
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient(`/projects/${id}`, requestHeaders);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        alert,
        loading,
        showAlert,
        submitProject,
        getProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
