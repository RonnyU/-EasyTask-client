import { createContext } from 'react';
import { IProject, ITask } from '../../Interfaces/interfaces';
import { AlertType } from '../../types/types';

type ProjectContextProps = {
  projects: IProject[];
  project: IProject;
  task: ITask;
  alert: AlertType;
  loading: boolean;
  modal: boolean;
  showAlert: (alertDefined: AlertType) => void;
  submitProject: (project: IProject) => void;
  submitTask: (project: ITask) => void;
  handleEdiTask: (task: ITask) => void;
  getProject: (id: string) => void;
  clearProjectState: () => void;
  clearTaskState: () => void;
  openModal: () => void;
  deleteProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
);

export default ProjectContext;
