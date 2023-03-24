import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProject, ITask, IUser } from '../../Interfaces/interfaces';
import { AlertType, Props, ServerError } from '../../types/types';
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
  collaborator: [],
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

const INIT_COLLABORATOR_STATE = {
  _id: '',
  name: '',
  email: '',
};

const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [alert, setAlert] = useState<AlertType>(INITIAL_ALERT_STATE);
  const [project, setProject] = useState<IProject>(INIT_PROJECT_STATE);
  const [task, setTask] = useState<ITask>(INIT_TASK_STATE);
  const [collaborator, setCollaborator] = useState<IUser>(
    INIT_COLLABORATOR_STATE
  );
  const [loading, setLoading] = useState(true);
  const [modalTask, setModalTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);

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
      const errMsg = (error as AxiosError).response?.data as ServerError;
      setAlert({
        msg: errMsg.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.delete(
        `/projects/${project._id}`,
        requestHeaders
      );

      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== project._id
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

  //---------------------------------------------------
  //---------------------*TASK*------------------------
  //---------------------------------------------------

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
        setModalTask(false);
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

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.delete(
        `/tasks/${task._id}`,
        requestHeaders
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      const taskUpdated = project.tasks.filter(
        (taskState) => taskState._id !== task._id
      );

      setProject((prev) => ({ ...prev, tasks: taskUpdated }));

      setTask(INIT_TASK_STATE);
      setModalDeleteTask(false);

      setTimeout(() => {
        setAlert(INITIAL_ALERT_STATE);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------------
  //---------------------*TASK*------------------------
  //---------------------------------------------------
  const submitCollaborator = async (email: string) => {
    setLoading(true);
    setCollaborator(INIT_COLLABORATOR_STATE);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.post(
        '/projects/collaborator',
        { email },
        requestHeaders
      );

      setCollaborator(data);
      setAlert(INITIAL_ALERT_STATE);
    } catch (error) {
      const errMsg = (error as AxiosError).response?.data as ServerError;
      setAlert({
        msg: errMsg.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const requestHeaders = RequestHeaderMaker(token);

      const { data } = await axiosClient.post(
        `/projects/collaborator/${project._id}`,
        { email: collaborator.email },
        requestHeaders
      );

      setCollaborator(INIT_COLLABORATOR_STATE);

      setAlert({ msg: data.msg, error: false });
    } catch (error) {
      const errMsg = (error as AxiosError).response?.data as ServerError;
      setAlert({
        msg: errMsg.msg,
        error: true,
      });
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
    setModalTask(true);
  };

  const handleDeleteTask = (task: ITask) => {
    setTask(task);
    setModalDeleteTask(true);
  };

  const openModalTask = () => {
    setModalTask(!modalTask);
  };

  const openModalDeleteTask = () => {
    setModalDeleteTask(!modalDeleteTask);
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
        modalTask,
        modalDeleteTask,
        collaborator,
        showAlert,
        submitProject,
        submitTask,
        deleteTask,
        getProjects,
        getProject,
        clearProjectState,
        clearTaskState,
        deleteProject,
        openModalTask,
        openModalDeleteTask,
        handleEdiTask,
        handleDeleteTask,
        submitCollaborator,
        addCollaborator,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
