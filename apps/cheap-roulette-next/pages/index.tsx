import React, { useCallback, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import { User } from '../types/user';
import { object, string } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { API_URL } from '../environments';

import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';

import { Delete } from '@material-ui/icons';

type FormType = {
  name: string;
};

const MAX_NAME_LENGTH = 12;

export function Index() {
  const { data: users } = useSWR<User[]>(`${API_URL}/users`);

  const schema = object().shape({
    name: string().required('名前を入力してください').max(MAX_NAME_LENGTH),
  });

  const { control, handleSubmit, reset, errors, formState } = useForm<FormType>(
    {
      resolver: yupResolver(schema),
      mode: 'onChange',
      defaultValues: {
        name: '',
      },
    }
  );

  const nameRef = useRef<HTMLInputElement | null>();

  const onSubmit = async ({ name }: FormType) => {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });

    await mutate(`${API_URL}/users`);

    reset();

    nameRef.current.focus();
  };

  const handleDelete = useCallback(
    (id) => async () => {
      await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      await mutate(`${API_URL}/users`);
    },
    []
  );

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth={'sm'}>
      <Box mt={5}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12}>
            <Controller
              control={control}
              as={
                <TextField
                  label={'Name'}
                  variant={'outlined'}
                  size={'small'}
                  disabled={formState.isSubmitting}
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                  required
                  fullWidth
                  inputRef={nameRef}
                />
              }
              name={'name'}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant={'contained'}
              color={'primary'}
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              Entry
            </Button>
          </Grid>
        </Grid>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText>{user.name}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleDelete(user.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Index;
