import React, { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { User } from '../types/user';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers"

type FormType = {
  name: string;
};

export function Index() {
  const { data: users } = useSWR<User[]>('http://localhost:1323/users');

  const schema = object().shape({
    name: string().required().max(5),
  });

  const { register, handleSubmit, reset, errors } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ name }: FormType) => {
    await fetch('http://localhost:1323/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name }),
    });

    await mutate('http://localhost:1323/users')

    reset()
  };

  const handleDelete = useCallback((id) => async () => {
    await fetch(`http://localhost:1323/users/${id}`, {
      method: 'DELETE',
    });

    await mutate('http://localhost:1323/users')
  }, [])

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={'text'} name={'name'} ref={register} />
        {JSON.stringify(errors)}
        <button type={'submit'}>Entry</button>
      </form>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={handleDelete(user.id)}>x</button>
        </li>
      ))}
    </div>
  );
}

export default Index;
