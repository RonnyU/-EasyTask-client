import { FormEvent } from 'react';
import { useForm, useProject } from '../hooks';
import Alert from './Alert';
interface FormData {
  email: string;
}

const INITIAL_STATE: FormData = {
  email: '',
};

const CollaboratorForm = () => {
  const { register, form } = useForm<FormData>(INITIAL_STATE);
  const { alert, showAlert, submitCollaborator } = useProject();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email } = form;
    if (email === '') {
      showAlert({
        msg: 'Email is Required',
        error: false,
      });
      return;
    }

    submitCollaborator(email);
  };

  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {alert?.msg && <Alert msg={alert.msg} error={alert.error} />}

      <div className='mb-5'>
        <label
          htmlFor='email'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Collaborator Email
        </label>
        <input
          type='email'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Type the Collaborator Email to Search'
          {...register('email')}
        />
      </div>

      <input
        type='submit'
        value='Search'
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded hover:bg-sky-700 transition-colors'
      />
    </form>
  );
};

export default CollaboratorForm;
