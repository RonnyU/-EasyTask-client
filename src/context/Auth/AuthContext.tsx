import { createContext } from 'react';
import { IUser } from '../../Interfaces/interfaces';

type AuthContextProps = {
  auth: IUser;
  loading: boolean;
  setStateAuth: (user: IUser) => void;
  resetAuthProviderStates: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
