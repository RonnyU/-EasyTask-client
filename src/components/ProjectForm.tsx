import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useProject } from '../hooks';
import Alert from './Alert';

interface FormData {
  name: string;
  description: string;
  deadline: string;
  client: string;
}

const INITIAL_STATE: FormData = {
  name: '',
  description: '',
  deadline: new Date().toLocaleDateString('en-CA'),
  client: '',
};

const ProjectForm = () => {
  const { form, register, clearForm, defineForm } =
    useForm<FormData>(INITIAL_STATE);
  const { showAlert, alert, submitProject, project, clearProjectState } =
    useProject();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      defineForm(project);
    } else {
      clearProjectState();
    }
  }, [params]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, client, deadline, description } = form;
    if ([name, description, deadline, client].includes('')) {
      showAlert({
        msg: 'All fields are required',
        error: true,
      });

      return;
    }

    await submitProject({
      name,
      description,
      deadline,
      client,
      _id: project._id,
    });

    clearForm();
  };

  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {alert?.msg && <Alert msg={alert.msg} error={alert.error} />}
      <div className='mb-5'>
        <label
          htmlFor='name'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Project Name
        </label>
        <input
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Project Name'
          {...register('name')}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='name'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Description
        </label>
        <input
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Project Description'
          {...register('description')}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='name'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Date
        </label>
        <input
          type='date'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          {...register('deadline')}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='name'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Client Name
        </label>
        <input
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Client Name'
          {...register('client')}
        />
      </div>

      <input
        type='submit'
        value={project._id ? 'Edit Project' : 'Create Project'}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded hover:bg-sky-700 transition-colors'
      />
    </form>
  );
};

export default ProjectForm;
