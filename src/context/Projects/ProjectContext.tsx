import { createContext } from 'react';
import { IUser } from '../../types/types';

type ProjectContextProps = {};

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
);

export default ProjectContext;
