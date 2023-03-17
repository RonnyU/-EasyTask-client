import { AxiosError } from 'axios';
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';
import { Alert } from '../../components';
import { useAuth, useForm } from '../../hooks';
import { IAlert, ServerError } from '../../types/types';

interface FormData {
  email: string;
  password: string;
}

const INITIAL_STATE: FormData = {
  email: '',
  password: '',
};

const Login = () => {
  const { form, register, clearForm } = useForm<FormData>(INITIAL_STATE);

  const [alert, setAlert] = useState<IAlert | undefined>(undefined);

  const { setStateAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = form;
    const { password } = form;

    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
    }

    setAlert(undefined);

    try {
      const { data } = await axiosClient.post('/users/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      setStateAuth(data);
      clearForm();
      navigate('/projects');
    } catch (error) {
      const errMsg = (error as AxiosError).response?.data as ServerError;

      setAlert({
        msg: errMsg.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Login to manage your <span className='text-slate-700'>projects</span>
      </h1>

      {alert?.msg && <Alert msg={alert.msg} error={alert.error} />}

      <form
        className='my-10 bg-white shadow rounded-lg p-10'
        onSubmit={handleSubmit}
      >
        <div className='my-5'>
          <label
            className='uppercase text-gray-600  block text-xl font-bold'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            placeholder='Type your email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            {...register('email')}
          />
        </div>

        <div className='my-5'>
          <label
            className='uppercase text-gray-600  block text-xl font-bold'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='Type your password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            {...register('password')}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/sign-up'
        >
          Don't have an account? Sign Up
        </Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/reset-password'
        >
          Forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Login;
