import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { IAlert, ServerError } from '../../types/types';
import axiosClient from '../../utils/axiosClient';
import { Alert } from '../../components';
import { useForm } from '../../hooks';

interface FormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const INITIAL_STATE: FormData = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const SignUp = () => {
  const { form, register, clearForm } = useForm<FormData>(INITIAL_STATE);

  const [alert, setAlert] = useState<IAlert | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, repeatPassword } = form;

    if ([name, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: 'The passwords does not match',
        error: true,
      });
    }

    if (password !== undefined && password.length < 6) {
      setAlert({
        msg: 'The password must have 6 characters at least',
        error: true,
      });
    }

    setAlert(undefined);

    try {
      const { data } = await axiosClient.post('/users', {
        name,
        email,
        password,
      });

      setAlert({
        msg: data.msg,
        error: false,
      });

      clearForm();
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
        Sign In and manage your <span className='text-slate-700'>projects</span>
      </h1>

      {alert?.msg && <Alert msg={alert.msg} error={alert.error} />}

      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'
      >
        <div className='my-5'>
          <label
            className='uppercase text-gray-600  block text-xl font-bold'
            htmlFor='name'
          >
            Name
          </label>
          <input
            type='text'
            placeholder='Type your name'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            {...register('name')}
          />
        </div>

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

        <div className='my-5'>
          <label
            className='uppercase text-gray-600  block text-xl font-bold'
            htmlFor='repeatPassword'
          >
            Repeat Password
          </label>
          <input
            type='password'
            placeholder='Type your password again'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            {...register('repeatPassword')}
          />
        </div>

        <input
          type='submit'
          value='Sign Up'
          className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >
          Already have an account? Login
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

export default SignUp;
