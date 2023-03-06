import { Link } from 'react-router-dom';

const NewPassword = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reset your password to access to your{' '}
        <span className='text-slate-700'>projects</span>
      </h1>
      <form className='my-10 bg-white shadow rounded-lg p-10'>
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
    </>
  );
};

export default NewPassword;
