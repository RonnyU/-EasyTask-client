import { useState, useEffect, useRef, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';
import { IAlert, ServerError } from '../../types/types';
import axios, { AxiosError } from 'axios';
import { Alert } from '../../components';

const NewPassword = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  //todo add new form hook
  const [alert, setAlert] = useState<IAlert | undefined>(undefined);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const newPasswordRef = useRef<HTMLInputElement>(null);

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
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newPasswordRef.current?.value &&
      newPasswordRef.current?.value.length < 6
    ) {
      setAlert({
        msg: 'The password must have at least 6 characters',
        error: true,
      });
      return;
    }

    try {
      const url = `/users/reset-password/${token}`;

      const { data } = await axiosClient.post(url, {
        password: newPasswordRef.current?.value,
      });

      setPasswordSaved(true);
      setAlert({
        msg: data.msg,
        error: false,
      });
      //Todo make a hook for timeout
      setTimeout(() => navigate('/'), 3000);
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
              id='password'
              ref={newPasswordRef}
              placeholder='Type your new password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            />
          </div>

          <input
            type='submit'
            value='Save New Password'
            className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
