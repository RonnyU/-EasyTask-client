import { useState } from 'react';
import { IProject, Props } from '../../types/types';

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

const ProjectProvider = ({ children }: Props) => {
  const [project, setProject] = useState<IProject>(INITIAL_STATE);

  return (
    <ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
