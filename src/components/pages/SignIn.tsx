import { Stack, Button, FormControl, Input, InputLabel } from '@mui/material';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { apiRequest } from '../../utils/apiRequest';

interface LogInBody {
  cpf: string;
  password: string;
}

export function LogIn() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      cpf: '',
      password: '',
    },
  });
  const mutation = useMutation(
    async (data: LogInBody) =>
      await apiRequest('auth/login', { body: data, method: 'POST' }),
    {
      onSuccess: ({ data }) => {
        setUser(data.access_token);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit: SubmitHandler<LogInBody> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel htmlFor="cpf">CPF</InputLabel>
              <Input {...field} />
            </FormControl>
          )}
        />
        <FormControl>
          <InputLabel htmlFor="password">Senha</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <Button type="submit">Entrar</Button>
      </Stack>
    </form>
  );
}
