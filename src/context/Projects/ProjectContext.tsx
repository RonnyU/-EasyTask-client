import { createContext } from 'react';
import { IAlert, IProject } from '../../types/types';

type ProjectContextProps = {
  projects: IProject[];
  project: IProject;
  alert: IAlert;
  loading: boolean;
  showAlert: (alertDefined: IAlert) => void;
  submitProject: (project: IProject) => void;
  getProject: (id: string) => void;
  clearProjectState: () => void;
  deleteProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
);

export default ProjectContext;
