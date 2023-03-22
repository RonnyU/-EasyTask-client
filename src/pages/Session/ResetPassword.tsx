import { AxiosError } from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../components';
import { useForm } from '../../hooks';
import { AlertType, ServerError } from '../../types/types';
import axiosClient from '../../utils/axiosClient';

interface FormData {
  email: string;
}

const INITIAL_STATE: FormData = {
  email: '',
};

const ResetPassword = () => {
  const { form, register, clearForm } = useForm<FormData>(INITIAL_STATE);

  const [alert, setAlert] = useState<AlertType | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = form;

    if (!email || email.length < 6) {
      setAlert({
        msg: 'Email is required',
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post('/users/reset-password', {
        email,
      });

      clearForm();
      setAlert({
        msg: data.msg,
        error: false,
      });
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
        recover your <span className='text-slate-700'>account</span>
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

        <input
          type='submit'
          value='Send'
          className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >
          {'<--'} return to login page
        </Link>
      </nav>
    </>
  );
};

export default ResetPassword;
