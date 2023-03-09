import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        recover your <span className='text-slate-700'>account</span>
      </h1>
      <form className='my-10 bg-white shadow rounded-lg p-10'>
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
            placeholder='Type your email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>

        <input
          type='submit'
          value='Send'
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
          Don't have an account? Sign Up
        </Link>
      </nav>
    </>
  );
};

export default ResetPassword;
