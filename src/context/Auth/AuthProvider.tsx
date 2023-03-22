import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from '../../Interfaces/interfaces';
import { Props, ServerError } from '../../types/types';
import axiosClient, { RequestHeaderMaker } from '../../utils/axiosClient';
import AuthContext from './AuthContext';

const INITIAL_STATE = {
  _id: '',
  name: '',
  email: '',
  token: '',
};

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<IUser>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const requestConfig = RequestHeaderMaker(token);

    try {
      const { data } = await axiosClient('/users/profile', requestConfig);

      setAuth(data);
    } catch (error) {
      setAuth(INITIAL_STATE);
      const errMsg = (error as AxiosError).response?.data as ServerError;
      console.log(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const setStateAuth = (user: IUser) => {
    setAuth(user);
  };

  return (
    <AuthContext.Provider value={{ auth, setStateAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
