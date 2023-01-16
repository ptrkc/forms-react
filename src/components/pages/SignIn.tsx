import { Stack, Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { ApiError, apiRequest } from '../../utils/apiRequest';
import { FormInput } from '../FormInput';

interface LogInBody {
  cpf: string;
  password: string;
}

export function LogIn() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [errorCode, setErrorCode] = useState<null | number>(null);

  useEffect(() => {
    if (user) navigate('/questionarios');
  }, [user]);

  const methods = useForm({
    defaultValues: {
      cpf: '',
      password: '',
    },
  });
  const mutation = useMutation(
    async (data: LogInBody) =>
      await apiRequest<{ access_token: string }>('auth/login', {
        body: data,
        method: 'POST',
      }),
    {
      onSuccess: (data) => setUser(data.access_token),
      onError: (error: ApiError) => setErrorCode(error.code),
    }
  );

  const onSubmit: SubmitHandler<LogInBody> = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FormInput id="cpf" label="CPF (somente números)" required />
          <FormInput id="password" type="password" label="Senha" required />
          <Button type="submit" variant="contained">
            Entrar
          </Button>
          {errorCode && (
            <Typography color={'#ba000d'}>
              {errorCode === 401
                ? 'Combinação de usuário e senha incorreta.'
                : `Erro desconhecido (${errorCode})`}
            </Typography>
          )}
          <Link component={RouterLink} to="/signup">
            Não tem conta? Cadastre-se
          </Link>
        </Stack>
      </form>
    </FormProvider>
  );
}
