import { createContext } from 'react';
import { IUser } from '../../types/types';

type AuthContextProps = {
  auth: IUser;
  loading: boolean;
  setStateAuth: (user: IUser) => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
