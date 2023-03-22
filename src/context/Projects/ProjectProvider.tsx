import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProject, ITask } from '../../Interfaces/interfaces';
import { AlertType, Props } from '../../types/types';
import axiosClient, { RequestHeaderMaker } from '../../utils/axiosClient';
import { formatToGTM } from '../../utils/dateFormater';
import ProjectContext from './ProjectContext';

const INIT_PROJECT_STATE = {
  _id: '',
  name: '',
  description: '',
  deadline: '',
  client: '',
  createdby: '',
  tasks: [],
  partners: [],
};

const INIT_TASK_STATE = {
  name: '',
  description: '',
  priority: '',
  deadline: '',
  status: false,
};

const INITIAL_ALERT_STATE = {
  msg: '',
  error: false,
};

const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [alert, setAlert] = useState<AlertType>(INITIAL_ALERT_STATE);
  const [project, setProject] = useState<IProject>(INIT_PROJECT_STATE);
  const [task, setTask] = useState<ITask>(INIT_TASK_STATE);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, []);

  // -------------------------------------------------
  // --------------------PROJECT----------------------
  //--------------------------------------------------

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

      setProject(INIT_PROJECT_STATE);

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
      setProject(INIT_PROJECT_STATE);
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
      data.deadline = formatToGTM(data.deadline);
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

      setProject(INIT_PROJECT_STATE);

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

  //--------------------------------------------------
  //---------------------*TASK*------------------------
  //--------------------------------------------------

  const submitTask = async (task: ITask) => {
    if (task._id) {
      await ediTask(task);
    } else {
      await createTask(task);
    }
  };

  const ediTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.put(
        `/tasks/${task._id}`,
        task,
        requestHeaders
      );

      const taskUpdated = project.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );

      setProject((prev) => ({ ...prev, tasks: taskUpdated }));

      setTask(INIT_TASK_STATE);

      setAlert({
        msg: 'Task Updated successfully',
        error: false,
      });

      setTimeout(() => {
        setAlert(INITIAL_ALERT_STATE);
        setModal(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const newTask: ITask = {
        name: task.name,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
        status: false,
        project: project._id,
      };

      const { data } = await axiosClient.post(
        '/tasks',
        newTask,
        requestHeaders
      );
      const projectUpdated = { ...project };
      projectUpdated.tasks = [...projectUpdated.tasks, data];

      setProject(projectUpdated);
      setTask(INIT_TASK_STATE);
      setAlert({
        msg: 'Task Created Successfully',
        error: false,
      });

      setTimeout(() => {
        setAlert(INITIAL_ALERT_STATE);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------------------------------------
  //---------------------*OTHERS*---------------------
  //--------------------------------------------------

  const showAlert = (alertDefined: AlertType) => {
    setAlert(alertDefined);
    setTimeout(() => setAlert(INITIAL_ALERT_STATE), 5000);
  };

  const handleEdiTask = (task: ITask) => {
    const taskToEdit = { ...task };
    taskToEdit.deadline = formatToGTM(task.deadline);
    setTask(taskToEdit);
    setModal(true);
  };

  const openModal = () => {
    setModal(!modal);
  };

  const clearProjectState = () => {
    setProject(INIT_PROJECT_STATE);
  };
  const clearTaskState = () => {
    setTask(INIT_TASK_STATE);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        task,
        alert,
        loading,
        modal,
        showAlert,
        submitProject,
        submitTask,
        getProject,
        clearProjectState,
        clearTaskState,
        deleteProject,
        openModal,
        handleEdiTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
