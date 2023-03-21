import { ChangeEvent, useState } from 'react';

export default function useForm<T>(initState: T) {
  const [form, setForm] = useState(initState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const defineForm = (initState: T) => {
    setForm(initState);
  };

  const register = (name: string, id?: string) => {
    let key = name as keyof typeof form;
    const value = form[key];
    id ??= name;

    return {
      name,
      id,
      value,
      onChange: (e: any) => handleChange(e),
    };
  };

  const clearForm = () => {
    setForm(initState);
  };
  return {
    form,
    clearForm,
    register,
    defineForm,
  };
}
