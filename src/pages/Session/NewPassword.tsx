import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';
import { AlertType, ServerError } from '../../types/types';
import axios, { AxiosError } from 'axios';
import { Alert } from '../../components';
import { useForm } from '../../hooks';

interface FormData {
  password: string;
}

const INITIAL_STATE: FormData = {
  password: '',
};

const NewPassword = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { form, register, clearForm } = useForm<FormData>(INITIAL_STATE);

  const [alert, setAlert] = useState<AlertType | undefined>(undefined);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    let source = axios.CancelToken.source();
    const checkToken = async () => {
      try {
        const url = `/users/reset-password/${token}`;
        await axiosClient(url, { cancelToken: source.token });

        setIsTokenValid(true);
      } catch (error) {
        const errMsg = (error as AxiosError).response?.data as ServerError;

        setAlert({
          msg: errMsg?.msg,
          error: true,
        });
      }
    };

    checkToken();

    return () => {
      source.cancel('Cancelling in cleanup');
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password } = form;

    if (password.length < 6) {
      setAlert({
        msg: 'The password must have at least 6 characters',
        error: true,
      });
      return;
    }

    try {
      const url = `/users/reset-password/${token}`;

      const { data } = await axiosClient.post(url, {
        password,
      });

      setPasswordSaved(true);
      setAlert({
        msg: data.msg,
        error: false,
      });

      clearForm();
      timer = setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      const errMsg = (error as AxiosError).response?.data as ServerError;

      setAlert({
        msg: errMsg?.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reset your password to access to your{' '}
        <span className='text-slate-700'>projects</span>
      </h1>

      {alert?.msg && <Alert msg={alert.msg} error={alert.error} />}

      {isTokenValid && !passwordSaved && (
        <form
          className='my-10 bg-white shadow rounded-lg p-10'
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600  block text-xl font-bold'
              htmlFor='password'
            >
              New Password
            </label>
            <input
              type='password'
              placeholder='Type your new password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              {...register('password')}
            />
          </div>

          <input
            type='submit'
            value='Save New Password'
            className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded  hover:bg-sky-800 transition-colors'
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
