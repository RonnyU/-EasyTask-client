import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, Props, ServerError } from '../../types/types';
import axiosClient from '../../utils/axiosClient';
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

  const navigate = useNavigate();
  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient('/users/profile', requestConfig);

      setAuth(data);
      navigate('/projects');
    } catch (error) {
      setAuth(INITIAL_STATE);
      const errMsg = (error as AxiosError).response?.data as ServerError;
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
