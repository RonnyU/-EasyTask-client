import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import axiosClient from '../../utils/axiosClient';
import { AlertType, ServerError } from '../../types/types';
import { Alert } from '../../components';
import { useProject } from '../../hooks';

const ConfirmAccount = () => {
  const params = useParams();
  const { id } = params;

  const { alert, showAlert } = useProject();
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const accConfirmed = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await axiosClient(url, { cancelToken: source.token });

        showAlert({
          msg: data.msg,
          error: false,
        });

        setAccountConfirmed(true);
      } catch (error) {
        const errMsg = (error as AxiosError).response?.data as ServerError;

        showAlert({
          msg: errMsg.msg,
          error: true,
        });
      }
    };

    accConfirmed();

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirm your account to manage your{' '}
        <span className='text-slate-700'>projects</span>
      </h1>

      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {alert?.msg && <Alert msg={alert.msg} error={alert.error} />}

        {accountConfirmed && (
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/'
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
