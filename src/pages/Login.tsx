import { AxiosError } from 'axios';
import { useState, useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { AlertType, ServerError } from '../types/types';
import axiosClient from '../utils/axiosClient';

const Login = () => {
  const [alert, setAlert] = useState<AlertType | undefined>(undefined);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

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
            id='email'
            ref={emailRef}
            placeholder='Type your email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
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
            id='password'
            ref={passwordRef}
            placeholder='Type your password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
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
