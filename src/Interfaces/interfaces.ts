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
