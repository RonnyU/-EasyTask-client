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

  const submitProject = async (project: IProject) => {
    if (project._id) {
      await ediProject(project);
    } else {
      await createProject(project);
    }
  };

  const ediProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.put(
        `/projects/${project._id}`,
        project,
        requestHeaders
      );

      const projectsUpdated = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );

      setProjects(projectsUpdated);

      setProject(INITIAL_STATE);

      setAlert({
        msg: 'Project Updated successfully',
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

  const createProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const newProject = {
        name: project.name,
        client: project.client,
        deadline: project.deadline,
        description: project.description,
      };

      const { data } = await axiosClient.post(
        '/projects',
        newProject,
        requestHeaders
      );

      setProjects((prev) => [...prev, data]);
      setProject(INITIAL_STATE);
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
      data.deadline = new Date(data.deadline).toLocaleDateString('en-CA');
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.delete(
        `/projects/${project._id}`,
        requestHeaders
      );

      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== id
      );

      setProjects(projectsUpdated);

      setProject(INITIAL_STATE);

      setAlert({
        msg: data.msg,
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

  const showAlert = (alertDefined: IAlert) => {
    setAlert(alertDefined);
    setTimeout(() => setAlert(INITIAL_ALERT_STATE), 5000);
  };

  const clearProjectState = () => {
    setProject(INITIAL_STATE);
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
        clearProjectState,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
