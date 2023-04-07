import { createContext } from 'react';
import { IProject, ITask, IUser } from '../../Interfaces/interfaces';
import { AlertType, Collaborator, PropsCollaborator } from '../../types/types';

type ProjectContextProps = {
  projects: IProject[];
  project: IProject;
  task: ITask;
  alert: AlertType;
  loading: boolean;
  modalTask: boolean;
  modalDeleteTask: boolean;
  modalDeleteCollaborator: boolean;
  collaborator: IUser;
  searchBar: boolean;
  showAlert: (alertDefined: AlertType) => void;
  getProjects: () => void;
  getProject: (id: string) => void;
  submitProject: (project: IProject) => void;
  deleteProject: () => void;
  submitTask: (task: ITask) => void;
  deleteTask: () => void;
  handleEdiTask: (task: ITask) => void;
  handleDeleteTask: (task: ITask) => void;
  handleDeleteCollaborator: (collaborator: Collaborator) => void;
  clearProjectState: () => void;
  clearTaskState: () => void;
  openModalTask: () => void;
  openModalDeleteTask: () => void;
  openModalDeleteCollaborator: () => void;
  submitCollaborator: (email: string) => void;
  addCollaborator: () => void;
  deleteCollaborator: () => void;
  completeTask: (taskId: string) => void;
  handleSearchBar: () => void;
};

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
);

export default ProjectContext;
