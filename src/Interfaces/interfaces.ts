import { TaskWithProjectType } from '../types/types';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface IProject {
  _id?: string;
  name: string;
  description: string;
  deadline: string;
  client: string;
  createdby?: string;
  tasks: ITask[];
  collaborator: IUser[];
}

export interface ITask {
  _id?: string;
  name: string;
  description: string;
  status: boolean;
  priority: string;
  deadline: string;
  project?: string;
  completed?: Pick<IUser, 'name' | '_id'>;
}

export interface ITaskWithProject extends TaskWithProjectType {
  project: IProject;
}

export interface ServerToClientEvents {
  response: (person: any) => void;
  taskAdded: (task: ITask) => void;
  taskDeleted: (task: ITask) => void;
  taskUpdated: (task: ITaskWithProject) => void;
  taskCompleted: (task: ITaskWithProject) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  openProject: (id: string) => void;
  newTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  updateTask: (task: ITaskWithProject) => void;
  completeTask: (task: ITaskWithProject) => void;
}
