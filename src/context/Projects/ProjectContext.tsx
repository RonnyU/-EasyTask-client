import { createContext } from 'react';
import { IAlert, IProject, ITask } from '../../types/types';

type ProjectContextProps = {
  projects: IProject[];
  project: IProject;
  alert: IAlert;
  loading: boolean;
  modal: boolean;
  showAlert: (alertDefined: IAlert) => void;
  submitProject: (project: IProject) => void;
  submitTask: (project: ITask) => void;
  getProject: (id: string) => void;
  clearProjectState: () => void;
  openModal: () => void;
  deleteProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
);

export default ProjectContext;
