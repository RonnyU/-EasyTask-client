import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Alert from '../components/Alert';
import { AlertType, ServerError } from '../types/types';

const ConfirmAccount = () => {
  const params = useParams();
  const { id } = params;

  const [alert, setAlert] = useState<AlertType | undefined>(undefined);
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const accConfirmed = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/users/confirm/${id}`;
        const { data } = await axios(url, { cancelToken: source.token });

        setAlert({
          msg: data.msg,
          error: false,
        });

        setAccountConfirmed(true);
      } catch (error) {
        const errMsg = (error as AxiosError).response?.data as ServerError;

        setAlert({
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
