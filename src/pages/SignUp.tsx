import { Link } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { AlertType, ServerError } from '../types/types';
import Alert from '../components/Alert';
import axios, { AxiosError } from 'axios';

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [alert, setAlert] = useState<AlertType | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;

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
      const url = import.meta.env.VITE_API_URL + '/api/users';

      const { data } = await axios.post(url, { name, email, password });

      setAlert({
        msg: data.msg,
        error: false,
      });

      console.log('name: ', nameRef.current?.value);
      formRef.current?.reset();
      console.log('name: ', nameRef.current?.value);
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
        ref={formRef}
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
            id='name'
            ref={nameRef}
            placeholder='Type your name'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
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

        <div className='my-5'>
          <label
            className='uppercase text-gray-600  block text-xl font-bold'
            htmlFor='repeat-password'
          >
            Repeat Password
          </label>
          <input
            type='password'
            id='repeat-password'
            ref={repeatPasswordRef}
            placeholder='Type your password again'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
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
